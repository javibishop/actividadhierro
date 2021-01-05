import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Usuarie from '../models/usuarie';
@Injectable({
    providedIn: 'root'
  })

export class UserNotificationService {
    public usuarieLoged$ = new BehaviorSubject<Usuarie>(null);

    constructor(){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user !== null){
        this.usuarieLoged$.next(user);
      }
    }
}

