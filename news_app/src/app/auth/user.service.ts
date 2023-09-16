import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


interface User {
  id: string,
  email: string,
  password: string,
  firstname: string,
  middlename: string,
  lastname: string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {


  private currentUser = new BehaviorSubject({});
  currentUser$ = this.currentUser.asObservable();

  isLogged$ = new BehaviorSubject(false);

  constructor() { }

  setCurrentUser(data:User){
    this.currentUser.next(data);
  }
}


