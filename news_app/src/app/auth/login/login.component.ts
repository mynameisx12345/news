import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginFg:any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ){}
 
  ngOnInit(): void {
    this.loginFg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    this.userService.setCurrentUser({
      ...this.loginFg.value,
      firstname: 'Juan',
      middlename: 'Alas',
      lastname: 'De la Cruz'
    });

    this.userService.isLogged$.next(true);

    this.router.navigate(['/front-page'])
  }
}
