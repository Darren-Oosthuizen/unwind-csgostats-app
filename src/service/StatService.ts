import fs from "fs";
import {DemoFile, Player, TeamNumber} from "demofile";
import debug from "debug";
import {GamePlayer} from "../model/GamePlayer";
import {Game} from "../model/Game";
import GameApi from "./GameApi";
import {GameTeam} from "../model/GameTeam";
import {Round} from "../model/Round";
import {Kill} from "../model/Kill";
import {Damage} from "../model/Damage";
import {Flashbang} from "../model/Flashbang";

const log: debug.IDebugger = debug('app:stat-service');


export class StatService {
    private demo: DemoFile;

    constructor() {
        log('Created new instance of StatService');
    }

    static async getStats(path: string, gameName: string) {
        fs.readFile(path, (err, buffer) => {

            // Initiate DemoFile
            const demo = new DemoFile();

            // Instantiate Game Object
            const game = new Game(gameName);
            let roundNo = 0;
            let roundNoMatchStats = 0;

            // Building up list of players
            demo.entities.on("create", e => {
                // We're only interested in player entities being created.
                if (!(e.entity instanceof Player)) {
                    return;
                }

                if (e.entity.steamId !== 'BOT') {
                    const player = new GamePlayer(e.entity.name, e.entity.steamId, e.entity.userId);
                    if (game.players.find(p => p.steamid === player.steamid) === undefined) {
                        game.players.push(player);
                    } else {
                        const updatePlayer = game.players.find(p => p.steamid === player.steamid);
                        updatePlayer.name = e.entity.name;
                    }
                }
            });

            demo.on("start", () => {
                game.map = demo.header.mapName;
            });

            demo.gameEvents.on("round_announce_match_start", e => {
                const json = JSON.stringify(game);
                game.rounds = [];
                // Re-setting player kills/deaths/assists for match start
                game.players.forEach((player, index) => {
                    player.reset();
                })
                game.rounds.push(new Round(demo.gameRules.roundsPlayed));
            });

            demo.gameEvents.on("round_start", e => {
                if (!demo.gameRules.isWarmup) {
                    roundNo = demo.gameRules.roundsPlayed;
                    roundNoMatchStats = demo.gameRules.roundsPlayed % 30;
                    const players: GamePlayer[] = [];
                    demo.entities.players.forEach((player) => {
                        if (player !== undefined && player !== null) {
                            let p = game.players.find(member => member.steamid === player.steamId);
                            if (p === null || p === undefined) {
                                p = new GamePlayer(player.name, player.steamId, player.userId);
                            }
                            players.push(p);
                        }
                    });
                    game.players = players;
                    game.rounds.push(new Round(roundNo));
                }
            });

            demo.gameEvents.on("round_end", e => {
                const players: GamePlayer[] = [];
                demo.entities.players.forEach((player) => {
                    if (player !== undefined && player !== null) {
                        let p = game.players.find(member => member.steamid === player.steamId);
                        if (p === null || p === undefined) {
                            p = new GamePlayer(player.name, player.steamId, player.userId);
                        }
                        p.kills = player.kills;
                        p.deaths = player.deaths;
                        p.assists = player.assists
                        p.mvp = player.mvps;
                        p.team = player.team ? player.team.teamName : 'unnassigned';
                        const stats = player.matchStats;
                        let damage = 0;
                        let killReward = 0;
                        let headshotKills = 0;
                        stats.forEach((r) => {
                            damage = damage + r.damage;
                            killReward = killReward + r.killReward;
                            headshotKills = headshotKills + r.headShotKills;
                        });
                        p.damage = damage;
                        p.killReward = killReward;
                        p.headshots = headshotKills;
                        players.push(p);
                    }
                });
                game.players = players;

                const round = game.rounds.find(r => r.roundNo === roundNo);
                if (round !== undefined) {
                    round.winner = e.winner;
                    round.reason = e.reason;
                    round.playerCount = e.player_count;
                }
            });

            // On Match Deaths find out who killed who and who assisted, increment counters.
            demo.gameEvents.on("player_death", (e: any) => {

                // Initialize Kill
                const kill = new Kill();

                // Get Killer Information and add kills to his tally
                const attackerEntity = demo.entities.getByUserId(e.attacker);
                const victimEntity = demo.entities.getByUserId(e.userid);
                const assisterEntity = demo.entities.getByUserId(e.assister);
                let killer;
                let victim;
                let assister;
                if (attackerEntity) {
                    killer = game.players.find(p => p.steamid === attackerEntity.steamId);
                }
                if (victimEntity) {
                    victim = game.players.find(p => p.steamid === victimEntity.steamId);
                }
                if (assisterEntity) {
                    assister = game.players.find(p => p.steamid === assisterEntity.steamId);
                }

                kill.penetrated = e.penetrated;
                kill.throughSmoke = e.thrusmoke;
                kill.attackerBlind = e.attackerblind;
                kill.noscope = e.noscope;
                kill.gun = e.weapon;
                kill.headshot = e.headshot;
                kill.killerSteamId  = "";
                kill.killedSteamId  = "";
                kill.killer  = "";
                kill.killed  = "";

                if (killer !== undefined) {
                    if (e.attackerblind) {
                        killer.killsWhileFlashed = killer.killsWhileFlashed + 1;
                    }
                    if (e.penetrated) {
                        killer.wallbangKills = killer.wallbangKills + 1;
                    }
                    if (e.thrusmoke) {
                        killer.smokeKills = killer.smokeKills + 1;
                    }
                    if (e.noscope) {
                        killer.noScopeKills = killer.noScopeKills + 1;
                    }

                    if (victim !== undefined) {
                        kill.friendly = attackerEntity.isFriendly(victimEntity);
                        if (attackerEntity.isFriendly(victimEntity)) {
                            victim.teamKills = victim.teamKills + 1;
                        }

                        kill.killerSteamId = killer.steamid;
                        kill.killerTeamName = attackerEntity.team.teamName;
                        kill.killer = killer.name;
                        kill.killedSteamId = victim.steamid;
                        kill.killedTeamName = victimEntity.team.teamName;
                        kill.killed = victim.name;
                        kill.time = victimEntity.matchStats[roundNoMatchStats].liveTime;
                    }
                }

                if (victim !== undefined) {
                    kill.killedSteamId = victim.steamid;
                    kill.killedTeamName = victimEntity.team.teamName;
                    kill.killed = victim.name;
                    kill.time = victimEntity.matchStats[roundNoMatchStats].liveTime;
                }

                if (assister !== undefined) {
                    kill.assisterSteamId = assister.steamid;
                    kill.flashAssist = e.assistedflash;
                    kill.assisterName = assister.name;
                    kill.assisterTeamName = assisterEntity.team.teamName;
                    kill.assisted = true;
                    if (e.assistedflash) {
                        assister.flashAssists = assister.flashAssists + 1;
                    }
                } else {
                    kill.assisted = false;
                }

                const round = game.rounds.find(r => r.roundNo === roundNo);
                if (round !== undefined) {
                    round.kills.push(kill);
                }

            });

            demo.gameEvents.on("player_hurt", (e: any) => {
                // Get attacker information and add damage to his tally
                const attackerEntity = demo.entities.getByUserId(e.attacker);
                const victimEntity = demo.entities.getByUserId(e.userid);
                let killer;
                let victim;

                const damage = new Damage();
                if (attackerEntity) {
                    killer = game.players.find(p => p.steamid === attackerEntity.steamId);
                }
                if (victimEntity) {
                    victim = game.players.find(p => p.steamid === victimEntity.steamId);
                }

                damage.weapon = e.weapon;
                damage.damage = e.dmg_health;
                damage.attackerSteamId = attackerEntity ? attackerEntity.steamId : '';
                damage.victimSteamId = victimEntity ? victimEntity.steamId : '';
                damage.friendly = attackerEntity ? attackerEntity.isFriendly(victimEntity) : false;
                damage.hitgroup = e.hitgroup;
                const round = game.rounds.find(r => r.roundNo === roundNo);
                if (round !== undefined) {
                    round.damage.push(damage);
                }
            });

            demo.gameEvents.on("player_team", (e: any) => {
                // if (roundNo >= 0) {
                //     if (!e.isbot) {
                //         const playerName = demo.entities.getByUserId(e.userid) ? demo.entities.getByUserId(e.userid).name : "unnamed";
                //         if (playerName !== 'unnamed') {
                //             const player = game.players.find(p => p.name === playerName);
                //             if (player.team === undefined) {
                //                 player.team = e.team;
                //             }
                //         }
                //     }
                // }
            });

            demo.gameEvents.on("player_blind", (e: any) => {
                // Get attacker information and add flash information to his tally
                const attackerEntity = demo.entities.getByUserId(e.attacker);
                const victimEntity = demo.entities.getByUserId(e.userid);
                let killer;
                let victim;
                if (attackerEntity) {
                    killer = game.players.find(p => p.steamid === attackerEntity.steamId);
                }
                if (victimEntity) {
                    victim = game.players.find(p => p.steamid === victimEntity.steamId);
                }

                const flash = new Flashbang();
                flash.attackerSteamId = attackerEntity.steamId;
                flash.victimSteamId = victimEntity.steamId;
                flash.duration = e.blind_duration;
                flash.friendly = attackerEntity.isFriendly(victimEntity);

                const round = game.rounds.find(r => r.roundNo === roundNo);
                if (round !== undefined) {
                    round.flashbangs.push(flash);
                }
            });

            demo.gameEvents.on("bomb_planted", (e: any) => {
                const planterEntity = demo.entities.getByUserId(e.userid);

                let planter;
                if (planterEntity) {
                    planter = game.players.find(p => p.steamid === planterEntity.steamId);
                    if (planter !== undefined) {
                        planter.bombsPlanted = planter.bombsPlanted + 1;
                    }
                }
            });

            demo.gameEvents.on("bomb_defused", (e: any) => {
                const defuserEntity = demo.entities.getByUserId(e.userid);

                let defuser;
                if (defuserEntity) {
                    defuser = game.players.find(p => p.steamid === defuserEntity.steamId);
                    if (defuser !== undefined) {
                        defuser.bombsDefused = defuser.bombsDefused + 1;
                    }
                }
            });

            demo.gameEvents.on("round_mvp", (e: any) => {
                // Get mvp information and add to tally
                const mvpName = demo.entities.getByUserId(e.userid) ? demo.entities.getByUserId(e.userid).name : "unnamed";
                if (mvpName !== 'unnamed') {
                    const mvpEntity = game.players.find(p => p.name === mvpName);
                    if (mvpEntity !== undefined) {
                        mvpEntity.mvp = mvpEntity.mvp + 1;
                    }
                }
            });

            demo.gameEvents.on("endmatch_mapvote_selecting_map", (e: any) => {
                const teams = demo.teams;

                const cts = teams[TeamNumber.CounterTerrorists];
                const ts = teams[TeamNumber.Terrorists];

                game.tscore = ts.score;
                game.ctscore = cts.score;

                const tName = ts.clanName === '' ? "Terrorists" : ts.clanName;
                const ctName = cts.clanName === '' ? "Counter-Terrorists" : cts.clanName;

                let tResult = 0;
                let ctResult = 0;
                if (ts.score > cts.score) {
                    tResult = 1;
                    ctResult = 1;
                } else if (ts.score < cts.score) {
                    ctResult = 1;
                    tResult = -1;
                }

                game.team1 = new GameTeam(ts.scoreFirstHalf, ts.scoreSecondHalf, ts.score, tName, tResult);
                game.team2 = new GameTeam(cts.scoreFirstHalf, cts.scoreSecondHalf, cts.score, ctName, ctResult);
                game.spectators = new GameTeam(0, 0, 0, "Spectators/Coaches", 0);

                log("=======SCORE========");
                game.players.forEach((player, i) => {
                    if (player.team === undefined) {
                        player.team = "Spectator";
                        game.spectators.players.push(player);
                    } else if (player.team.toString() === 'TERRORIST') {
                        player.team = "Terrorists";
                        game.team1.players.push(player);
                    } else if (player.team.toString() === 'CT') {
                        player.team = "Counter-Terrorists";
                        game.team2.players.push(player);
                    } else {
                        player.team = "Spectator";
                        game.spectators.players.push(player);
                    }
                })

                // Print scoreboard
                log(game.toString());

                // Send game object to backend for saving.
                const json = JSON.stringify(game);
                GameApi.createGame(game);
                demo.cancel();
            });

            demo.gameEvents.on("player_falldamage", (e: any) => {
                const attackerEntity = demo.entities.getByUserId(e.userid);
                let killer: GamePlayer;
                if (attackerEntity) {
                    killer = game.players.find(p => p.steamid === attackerEntity.steamId);
                }

                if (killer !== undefined) {
                    killer.fallDamage = killer.fallDamage + e.damage;
                }

            });

            demo.on("end", (e: any) => {
                if (e.error) {
                    log("Error during parsing:", e.error);
                    process.exitCode = 1;
                }

                const teams = demo.teams;

                const cts = teams[TeamNumber.CounterTerrorists];
                const ts = teams[TeamNumber.Terrorists];

                game.tscore = ts.score;
                game.ctscore = cts.score;

                const tName = ts.clanName === '' ? "Terrorists" : ts.clanName;
                const ctName = cts.clanName === '' ? "Counter-Terrorists" : cts.clanName;

                let tResult = 0;
                let ctResult = 0;
                if (ts.score > cts.score) {
                    tResult = 1;
                    ctResult = 1;
                } else if (ts.score < cts.score) {
                    ctResult = 1;
                    tResult = -1;
                }

                game.team1 = new GameTeam(ts.scoreFirstHalf, ts.scoreSecondHalf, ts.score, tName, tResult);
                game.team2 = new GameTeam(cts.scoreFirstHalf, cts.scoreSecondHalf, cts.score, ctName, ctResult);
                game.spectators = new GameTeam(0, 0, 0, "Spectators/Coaches", 0);

                log("=======SCORE========");
                game.players.forEach((player, i) => {
                    if (player.team === undefined) {
                        player.team = "Spectator";
                        game.spectators.players.push(player);
                    } else if (player.team.toString() === 'TERRORIST') {
                        player.team = "Terrorists";
                        game.team1.players.push(player);
                    } else if (player.team.toString() === 'CT') {
                        player.team = "Counter-Terrorists";
                        game.team2.players.push(player);
                    } else {
                        player.team = "Spectator";
                        game.spectators.players.push(player);
                    }
                })

                // Print scoreboard
                log(game.toString());

                // Send game object to backend for saving.
                const json = JSON.stringify(game);
                GameApi.createGame(game);

            });

            demo.parse(buffer);
        });
    };
}

export default new StatService();
