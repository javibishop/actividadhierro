import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  loginWithGoogle(){
    this.auth.loginWithGoogle();
    
	}
}
