import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {StatsService} from "../../services/stats.service";
import {Game} from "../../models/Game";

@Component({
    selector: 'app-match-upload',
    templateUrl: './match-upload.component.html',
    styleUrls: ['./match-upload.component.css']
})
export class MatchUploadComponent implements OnInit {

    constructor(private statsService: StatsService, private zone: NgZone) {
    }

    ngOnInit(): void {
    }

    @ViewChild('fileInput') fileInput!: ElementRef;
    fileAttr = 'Choose File';

    uploadFileEvt(imgFile: any) {
        if (imgFile.target.files && imgFile.target.files[0]) {
            this.fileAttr = '';
            Array.from(imgFile.target.files).forEach((file: any) => {
                this.fileAttr += file.name + ' - ';
            });
            // HTML5 FileReader API
            const reader = new FileReader();
            reader.onload = (e: any) => {
                // StatsService.getStats(e.target.result, "Game Name");
                this.statsService.getStats(reader.result as ArrayBuffer, "Game");
            };
            reader.readAsArrayBuffer(imgFile.target.files[0]);
            // Reset if duplicate image uploaded again
            this.fileInput.nativeElement.value = '';
        } else {
            this.fileAttr = 'Choose File';
        }
    }

}
