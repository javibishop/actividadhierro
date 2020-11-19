import { Injectable } from "@angular/core";
import { CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserNotificationService } from './usernotigication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private auth: UserNotificationService, private router: Router) {}

	canActivate(route, state: RouterStateSnapshot) {
		if(this.auth.usuarieLoged$.value !== null){
			return true;
		}else{
			this.router.navigate(["/login"], {
				queryParams: { returnUrl: state.url }
			});
			return false;
		}
	}
}
