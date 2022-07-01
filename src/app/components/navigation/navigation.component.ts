import {Component, OnInit, ViewChild} from '@angular/core';
import {faLaughWink, faTachometerAlt, faUser, faUsers, faBars, faAngleLeft, faCrosshairs} from '@fortawesome/free-solid-svg-icons';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    faLaughWink = faLaughWink;
    faTachometerAlt = faTachometerAlt;
    faUser = faUser;
    faUsers = faUsers;
    faBars = faBars;
    faAngleLeft = faAngleLeft;
    faCrosshairs = faCrosshairs;
    booleanTrue = true;

    @ViewChild(MatSidenav)
    sideNav!: MatSidenav;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleSideNav() {
        this.sideNav.toggle();
    }

}
