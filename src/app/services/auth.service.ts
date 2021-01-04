import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { of as observableOf, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UserService } from "./user.service";
import { UserNotificationService } from "./usernotigication.service";

@Injectable({
	providedIn: 'root'
  })
export class AuthService {
	user$: Observable<firebase.User>;

	//agregar el manejo de subscripciones.
	constructor(
		private angularFireAuth: AngularFireAuth,
		private route: Router,
		private userService: UserService,
		private userNotificationService: UserNotificationService
		
	) {
		this.user$ = angularFireAuth.authState;
	}

	//al dar d ealta un usuario, grabar en gestion. y cuando se logea, buscar en gestion si corresponde, si logea, generar el jwt.
	loginWithGoogle(){

		let provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		firebase.auth().languageCode = 'es';
		provider.setCustomParameters({
			'login_hint': 'user@example.com'
		  });
		  
		firebase.auth().signInWithPopup(provider).then((result) => {
			// // This gives you a Google Access Token. You can use it to access the Google API.
			// var token = result.credential;
			// // The signed-in user info.
			var user = result.user;
			this.CheckUserData(user);
		//	return { displayName: user.displayName,  email: user.email}
			
			// ...
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...

			//the identity provider configuration is disabled -> habilitar en la consola la autenticacion
		  });
	}
	
	CheckUserData(user) {
		this.userService.getByEmail(user.email).subscribe(r => {
			if(r && r.length === 1){
				this.userNotificationService.usuarieLoged$.next(r[0]);
				//let data = {user: r[0], vencimiento: new Date().ad}
				localStorage.setItem('user', JSON.stringify(r[0]));
				this.route.navigate(["/actividad"]);
			}else{
				const userData = {
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL
				}
				this.userNotificationService.usuarieLoged$.next(userData);
				this.userService.save(userData);
				this.route.navigate(["/actividad"]);
			}
		})
	}

	logout() {
		this.userNotificationService.usuarieLoged$.next(null);
		//this.angularFireAuth.auth.signOut();
	}

	//https://firebase.google.com/docs/auth/web/google-signin 
	//https://firebase.google.com/docs/auth/web/account-linking?hl=es
	
	get appUser$(): Observable<any> {
		return this.user$.pipe(
			switchMap(user => {
				if (user) {
					return this.userService.getByEmail(user.email);
				}

				return observableOf(null);
			})
		);
	}

	get appUserId$(): Observable<string> {
		return this.user$.pipe(
			switchMap(user => {
				return observableOf(user.uid);
			})
		);
	}
}
