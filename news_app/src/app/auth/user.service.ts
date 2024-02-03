import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  apiUrl = environment.apiUrl;
  private currentUser: any = new BehaviorSubject(null);
  currentUser$ = this.currentUser.asObservable();

  isLogged$ = new BehaviorSubject(false);

  constructor(
    private readonly http: HttpClient
  ) { 
    if(sessionStorage.getItem('user')){
      let currentuser: User = JSON.parse(sessionStorage.getItem('user') as string);
   
      if(currentuser){
        this.setCurrentUser(currentuser);
        this.isLogged$.next(true);
      } 
    }
    
  }

  setCurrentUser(data:User | null){
    this.currentUser.next(data);
  }

  login(email:string, password:string){
    const params = {
      email: email,
      password: password
    };
    console.log('teng123', params)
    return this.http.post(`${this.apiUrl}/users/login`, params).pipe(
      tap((resp:any)=>{
        console.log('teng1234', resp)
        if(resp !== 'Access Denied'){
          const [user] = resp;
          console.log('user',user)
          const currentUser: User = {
            ...params,
            firstname: user.first_name,
            middlename: user.middle_name,
            lastname: user.last_name,
            suffix: user.suffix,
            department: user.department,
            id: user.id
          };
          this.setCurrentUser(currentUser);
          sessionStorage.setItem('user',JSON.stringify(currentUser));
          this.isLogged$.next(true);
        } else {

        }
        
      }),
      map((resp)=>{
        return true;
      })
    )
    
  }

  logout(){
    sessionStorage.setItem('user', '');
    this.setCurrentUser(null);
    this.isLogged$.next(false);
  }

  register(data:any){
    return this.http.post(`${this.apiUrl}/users/register`,data);
  }
}

interface User {
  id: string,
  email: string,
  password: string,
  firstname: string,
  middlename: string,
  lastname: string,
  suffix: string,
  department: string
}


