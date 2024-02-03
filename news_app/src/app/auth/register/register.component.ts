import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LovService } from 'src/app/shared/services/lov.service';
import { catchError, map, tap, of } from 'rxjs';
//import * as FileSaver from 'file-saver';
import { saveAs  } from 'file-saver';
import { b64toBlob, downloadPdf } from '../../shared/util';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TYPE } from 'src/app/shared/constants/lov';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerFg: any;
  department$ = this.lovService.departments$;
  userTypes = USER_TYPE;
  currentUser$ = this.userService.currentUser$;

  questionnaire: any;
  fileToUpload: File | null = null;
  userId: any = '';
  isNew = true;
  origExam = null;
  
  constructor(
    private readonly fb: FormBuilder,
    private readonly lovService: LovService,
    private readonly userService: UserService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param)=>{
      if(param.hasOwnProperty('id')){
        this.userId = param['id'];
        this.isNew=false;
      }
    })
    this.registerFg = this.fb.group({
      userType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      firstname: ['',Validators.required],
      middlename: [''],
      lastname: ['', Validators.required],
      suffix: [''],
      department: ['', Validators.required],
      idNumber: ['', Validators.required],
      exam: ['']
    });

    if(!this.isNew){
      this.currentUser$.pipe(
        tap((user:any)=>{
          this.origExam = user.exam;
          let newUser = JSON.parse(JSON.stringify(user));
          newUser.exam = b64toBlob(newUser.exam)
          this.registerFg.patchValue(newUser);
          
        })
      ).subscribe();
      
    }

    this.registerFg.get('userType').valueChanges.subscribe((value:any)=>{
      if(value==2){
        this.registerFg.controls['exam'].setValidators(Validators.required);
      } else {
        this.registerFg.controls['exam'].clearValidators();
      }
      this.registerFg.controls['exam'].updateValueAndValidity();
    })

    this.lovService.getTemplate().pipe(
      tap((res)=>{
        this.questionnaire = res;
      })
    ).subscribe();
    
    
  
  }

  downloadQuestionnaire(){
    downloadPdf(this.questionnaire,'exam.pdf')
  }

  register(){
    const formData: any = new FormData();
    formData.append('email', this.registerFg.get('email').value);
    formData.append('password', this.registerFg.get('password').value);
    formData.append('id_number', this.registerFg.get('idNumber').value);
    formData.append('first_name', this.registerFg.get('firstname').value);
    formData.append('middle_name', this.registerFg.get('middlename').value);
    formData.append('last_name', this.registerFg.get('lastname').value);
    formData.append('suffix', this.registerFg.get('suffix').value);
    formData.append('department_id', this.registerFg.get('department').value);
    formData.append('is_approved', this.isNew ? 0 : 1 );
    formData.append('user_type', this.registerFg.get('userType').value);
    formData.append('exam', this.registerFg.get('exam').value);
    formData.append('id', this.userId);
    this.userService.register(formData).pipe(
      tap((resp)=>{
        this.snackbar.open('Save Successfully','',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-accent']
        })
        if(this.isNew){
          this.router.navigate(['/auth/login']);
        } else {
          let newCurrentUser = JSON.parse(JSON.stringify(this.registerFg.value));
          newCurrentUser.exam = this.origExam;
          this.userService.setCurrentUser(newCurrentUser);
        }
        
      }),
      catchError((error)=>{
        this.snackbar.open(error.error.message,'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-warn']
        })
        return of(error);
      })
    ).subscribe();
  }

  handleFileInput(files: any) {
    const file = files.target.files;
    this.fileToUpload = file.item(0);
    this.registerFg.patchValue({exam: this.fileToUpload});
  }
  
}
