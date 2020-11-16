import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { ActivatedRoute } from "@angular/router";
import { AppUser } from "../models/app-user";
import { UserService } from "./user.service";
import { of as observableOf, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ErrorResult } from "../error/errorresult";
import { EncriptService } from "./encript.service";
import { UsuarieService } from "./usuarie.service";
import {environmentGestion} from '../environments/environment';
@Injectable()
export class AuthService {
	user$: Observable<firebase.User>;

	//agregar el manejo de subscripciones.
	constructor(
		private afAuth: AngularFireAuth,
		private route: ActivatedRoute,
		private userService: UserService,
		private encriptService: EncriptService,
		private usuarieService: UsuarieService
	) {
		this.user$ = afAuth.authState;
	}

	//al dar d ealta un usuario, grabar en gestion. y cuando se logea, buscar en gestion si corresponde, si logea, generar el jwt.
	loginWithGoogle(){

		let provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		firebase.auth().languageCode = 'es';
		provider.setCustomParameters({
			'login_hint': 'user@example.com'
		  });
		  
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential;
			// The signed-in user info.
			var user = result.user;
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
	login() {
		// store the queryParam to a local variable to get redirected after loggin in
		const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
		
		//localStorage.removeItem("cartId");

		localStorage.setItem("returnUrl", returnUrl);

		this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
		.then(result => {
			console.log(result)
		})
		.catch(ex => console.log(ex));
	}

	logout() {
		this.afAuth.auth.signOut();
	}

	//https://firebase.google.com/docs/auth/web/google-signin 
	//https://firebase.google.com/docs/auth/web/account-linking?hl=es
	
	loginWithEmailPass(email: string, password: string) : Promise<ErrorResult>{
		const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
		localStorage.setItem("returnUrl", returnUrl);
		
		let result = new Promise<ErrorResult>((resolve, reject) => {
			let resultData: ErrorResult = {code:'', status:'', message: ''};
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(result => {
				//this.user$ = result.user;
				this.encriptService.set('123456$#@$^@1ERF', password, true);
				if(environmentGestion){
					this.usuarieService.login(email).subscribe(r => {
						localStorage.removeItem("x123");
						localStorage.setItem(result.user.uid, r.token);
					});

					return result;
				}else {
					return result;
				}
				
			})
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				console.log(errorCode, errorMessage);
				resultData.code = errorCode;
				resultData.status = 'reject';
				resultData.message = errorMessage;
				reject(resultData);
			  });
	
			  firebase.auth().onAuthStateChanged(user => {
				next: user => {
					if (user) {
						this.user$ = user;
						resultData.code = '';
						resultData.status = 'ok';
						resultData.message = 'login correcto';
						resolve(resultData);
					} else {
						resultData.code = 'error';
						resultData.status = 'reject';
						resultData.message = 'Datos de ingreso no encontrados!.';
						reject(resultData);
					}
				}
				
			  });
		});
		return result;
		
	}

	get appUser$(): Observable<AppUser> {
		return this.user$.pipe(
			switchMap(user => {
				if (user) {
					return this.userService.get(user.uid);
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
