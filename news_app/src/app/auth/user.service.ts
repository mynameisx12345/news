import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap, catchError, of, switchMap, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { LovService } from '../shared/services/lov.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {


  apiUrl = environment.apiUrl;
  private currentUser: any = new BehaviorSubject(null);
  currentUser$ = this.currentUser.asObservable();

  isLogged$ = new BehaviorSubject(false);

  private currentDepartment = new BehaviorSubject(null);
  currentDepartment$ = this.currentDepartment.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly lovService: LovService
  ) { 
    if(sessionStorage.getItem('user')){
      let currentuser: User = JSON.parse(sessionStorage.getItem('user') as string);
   
      if(currentuser){
        this.setCurrentUser(currentuser);
        this.isLogged$.next(true);
      } 
    }
    
  }

  setCurrentDepartment(data){
    this.currentDepartment.next(data);
  }

  setCurrentUser(data:User | null){
    this.currentUser.next(data);
    if(data !== null){
      this.setCurrentDepartment(data.department);
    }
    
    sessionStorage.setItem('user',JSON.stringify(data));
  }

  login(email:string, password:string){
    const params = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/users/login`, params).pipe(
      tap((resp:any)=>{
        if(resp !== 'Access Denied'){
          const [user] = resp;
          console.log('user',user)
          const currentUser: User = {
            ...params,
            firstname: user.first_name,
            middlename: user.middle_name,
            lastname: user.last_name,
            suffix: user.suffix,
            department: user.department_id,
            id: user.id,
            userType: user.user_type,
            idNumber: user.id_number,
            exam: user.exam
          };
          this.setCurrentUser(currentUser);
          
          
          this.isLogged$.next(true);
        } else {

        }
        
      }), 
      filter(resp=> resp !== 'Access Denied'),
      switchMap((resp)=>{

        return this.lovService.getDepartments()
      }),
      map((resp)=>{
        return true;
      })
    )
    
  }

  logout(){
    sessionStorage.setItem('user', '');
    this.setCurrentUser(null);
    this.setCurrentDepartment(null);
    this.isLogged$.next(false);
    this.lovService.setDepartments([]);
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
  department: string,
  userType: string,
  idNumber: string,
  exam: string
}


