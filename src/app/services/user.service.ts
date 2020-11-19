import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase,AngularFireList } from  '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";
import Usuarie from '../models/usuarie';
@Injectable({
	providedIn: 'root'
  })
export class UserService {
	private dbPath = '/usuaries';
	usuariesRef: AngularFireList<any> = null;
	constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
		this.usuariesRef = db.list(this.dbPath);
	}
//, private usuarieService: UsuarieService, private encriptService: EncriptService
	//https://firebase.google.com/docs/reference/admin/node/admin.auth?hl=es-419
	
	save(user: Usuarie) {
		return this.usuariesRef.push(user);
	}

	// get the uid of the user to extract if he is admin
	getByEmail(email: string): Observable<any> {
		return this.db.list("/usuaries", ref => ref.orderByChild("email").equalTo(email)).valueChanges();
	}

	getUsers() {
		return this.db
			.list("/usuaries")
			.snapshotChanges()
			.pipe(
				map(action => {
					return action.map((item: any) => {
						const key = item.payload.key;
						const data = { key, ...item.payload.val() as Usuarie [] };
						return data;
					});
				})
			);
	}

		// update a product
	update(uid, user) {
		// if(user.isAdmin){
		// 	admin.auth(admin.app()).setCustomUserClaims(uid, {admin: true}).then(() => {
		// 		// The new custom claims will propagate to the user's ID token the
		// 		// next time a new one is issued.
		// 	  });
		// }
		
		
		return this.db.object("/users/" + uid).update(user);
	}
}
