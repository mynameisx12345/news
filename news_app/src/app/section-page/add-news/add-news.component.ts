import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError, of } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { LovService } from 'src/app/shared/services/lov.service';
import { ViewNewsService } from 'src/app/view-news/view-news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.sass']
})
export class AddNewsComponent implements OnInit{
  @Output() setCurrentNews = new EventEmitter;
  @Output() onSave = new EventEmitter;
  @Input() isNew = true;
  fileToUpload: File | null = null;
  departments$ = this.lovService.departments$;
  newsFg: FormGroup;
  currentUser: any;
  constructor(
    private readonly lovService: LovService,
    private readonly fb: FormBuilder,
    private readonly viewNewsService: ViewNewsService,
    private readonly userService: UserService,
    private readonly snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.newsFg = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      department: [null, Validators.required]
    });

    this.userService.currentUser$.pipe(
      tap(user=>{
        this.currentUser = user;
      })
    ).subscribe();

    if(!this.isNew){
      this.viewNewsService.currentNews$.pipe(
        tap(news=>{
          this.newsFg.patchValue(news);
        })
      ).subscribe();
    };
  }

  handleFileInput(files: any) {
    const file = files.target.files;
    this.fileToUpload = file.item(0);
    this.newsFg.patchValue({image: this.fileToUpload});
  }

  preview(){
    this.setCurrentNews.emit(this.newsFg.value);
  }

  saveNews(){
    console.log('user', this.currentUser);
    const formData: any = new FormData();
    formData.append('title', this.newsFg.get('title').value);
    formData.append('content', this.newsFg.get('content').value);
    formData.append('department_id', this.newsFg.get('department').value);
    formData.append('image', this.newsFg.get('image').value);
    formData.append('author', this.currentUser.id);
    this.viewNewsService.saveNews(formData).pipe(
      tap((res)=>{
        this.snackbar.open('Save Successfully','',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-accent']
        })

        this.onSave.emit();
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
}
