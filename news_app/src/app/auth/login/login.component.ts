import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs'
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
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.userService.isLogged$.subscribe((logged)=>{
      if(logged){
        this.router.navigate(['/front-page']);
      }
    })
    
    this.loginFg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

   
  }

  login(){
    let {email,password} = this.loginFg.value
    this.userService.login(email,password).pipe(
      tap(()=>{
        this.router.navigate(['/front-page'])
      }),
      catchError((error)=>{
        this.snackbar.open(error.error,'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-toolbar','mat-warn']
        })
        return of(error)
      })
    ).subscribe();
  //   this.userService.setCurrentUser({
  //     ...this.loginFg.value,
  //     firstname: 'Juan',
  //     middlename: 'Alas',
  //     lastname: 'De la Cruz'
  //   });

  //   this.userService.isLogged$.next(true);

    
  }

  register(){
    this.router.navigate(['/auth/register']);
  }
}
