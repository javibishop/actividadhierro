import { Component, ViewChild } from '@angular/core';
import Usuarie from './models/usuarie';
import { UserNotificationService } from "./services/usernotigication.service";
//import { MatSidenav } from '@angular/material/mat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appUser: Usuarie;

  //@ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  
  constructor(private userNotificationService: UserNotificationService) {
    this.userNotificationService.usuarieLoged$.subscribe(usuarie => {
      this.appUser = usuarie;
    })
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  
  title = 'actividades';
}
