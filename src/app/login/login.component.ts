import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showRegisterForm:boolean = true;
	showLogInData:boolean = false;
	constructor(private auth: AuthService,  private router: Router, private activatedRoute: ActivatedRoute) {}
	data :any = {};

  ngOnInit(){
    
  }
	register() {
		const returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl") || "/";
		if(returnUrl){
			localStorage.setItem("returnUrl", returnUrl);
		}
		
		this.router.navigate(["/registrar"]);
	}
	
	loginwithdata(){
		this.showLogInData = true;
		this.showRegisterForm = false;
	}

	loginWithGoogle(){
		this.auth.loginWithGoogle();
  }
  
}

