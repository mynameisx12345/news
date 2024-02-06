import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { LovService } from '../shared/services/lov.service';
import { USER_TYPE } from '../shared/constants/lov';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl;
  departments: any;
  constructor(
    private readonly http: HttpClient,
    private readonly lovService: LovService
  ) { 
    this.lovService.departments$.pipe(
      tap((departments)=>{
        this.departments = departments;
      })
    ).subscribe();
  }

  getUsers(){
    return this.http.get(`${this.apiUrl}/users/list`).pipe(
      map((users:any)=>{
        return users.map((user:any)=>{

          let department = this.departments.find(dep=>dep.id === user.department_id).name;
          let userType = USER_TYPE.find(type=>type.id == user.user_type).name;

          return {
            id: user.id,
            idNumber: user.id_number,
            email: user.email,
            firstname: user.first_name,
            middlename: user.middle_name,
            lastname: user.last_name,
            suffix: user.suffix,
            department: user.department_id,
            departmentName: department,
            userType: user.user_type,
            userTypeName: userType,
            isApproved: user.is_approved == 1 ? 'Yes' : 'No',
            exam: user.exam,
            password: user.password
          }
        })
      })
    )
  }

  saveFeatured(data){
    return this.http.post(`${this.apiUrl}/news/featured`,data);
  }

  
}

