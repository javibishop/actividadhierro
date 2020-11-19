import { Component } from '@angular/core';
import Usuarie from './models/usuarie';
import { UserNotificationService } from "./services/usernotigication.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appUser: Usuarie;
  constructor(private userNotificationService: UserNotificationService) {
    this.userNotificationService.usuarieLoged$.subscribe(usuarie => {
      this.appUser = usuarie;
    })
  }
  
  title = 'actividades';
}
