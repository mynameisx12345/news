import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject,tap, map } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class LovService {

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
  ) { }
  
  apiUrl = environment.apiUrl;
  private departments = new BehaviorSubject<any>(null);
  departments$ = this.departments.asObservable();

  setDepartments(departments:any){
    this.departments.next(departments);
  }

  getDepartments(){
    return this.http.get(`${this.apiUrl}/lov/departments`).pipe(
      tap((resp:any)=>{
        this.setDepartments(resp);
      })
    )
  }

  getTemplate(){
    return this.http.get(`${this.apiUrl}/lov/template`).pipe(
      map((res:any)=>{
        if(res.length>0){
          const [questionnaire] = res;
          return questionnaire.file;
        } else {
          return null;
        }
        
      })
    );
  }
}
