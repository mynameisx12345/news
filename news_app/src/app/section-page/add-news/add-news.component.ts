import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError, of } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { LovService } from 'src/app/shared/services/lov.service';
import { ViewNewsService } from 'src/app/view-news/view-news.service';
import { b64toBlob } from 'src/app/shared/util';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.sass']
})
export class AddNewsComponent implements OnInit{
  @Output() setCurrentNews = new EventEmitter;
  @Output() onSave = new EventEmitter;
  @Input() isNew = true;
  @ViewChild('file') file: any;
  fileToUpload: File | null = null;
  departments$ = this.lovService.departments$;
  newsFg: FormGroup;
  currentUser: any;
  newsId: any = '';
  filename = '';
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
          let image = news.image
          if(image && !(image instanceof Blob)){
            let img2 = image.changingThisBreaksApplicationSecurity.replace('data:image/jpg;base64,','')
             image = b64toBlob(img2);
            this.filename = 'news-image'
             
          }
          
          this.newsFg.patchValue({...news, image: image});
          this.newsId = news.id;
        })
      ).subscribe();
    } else {
      this.newsFg.reset({
        title: '',
        content: '',
        image: null,
        department:null
      });
    }
  }

  handleFileInput(files: any) {
    const file = files.target.files;
    this.fileToUpload = file.item(0);
    this.newsFg.patchValue({image: this.fileToUpload});
    this.filename = this.fileToUpload.name;
  }

  preview(){
    this.setCurrentNews.emit({...this.newsFg.value, id: this.newsId});
  }

  saveNews(publish=''){
    const formData: any = new FormData();
    formData.append('title', this.newsFg.get('title').value);
    formData.append('content', this.newsFg.get('content').value);
    formData.append('department_id', this.newsFg.get('department').value);
    formData.append('image', this.newsFg.get('image').value);
    formData.append('author', this.currentUser.id);
    formData.append('id', this.newsId);
    formData.append('date_published', publish);
    this.viewNewsService.saveNews(formData).pipe(
      tap((res:any)=>{
        let message = !!publish ? 'Publish' : 'Save';
        this.snackbar.open(`${message}  Succesfully`,'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-accent']
        })
        this.newsId = res.newsId;
        this.viewNewsService.setCurrentNews({...this.newsFg.value, id: res.newsId});
  
        this.onSave.emit();
      }),
      catchError((error)=>{
        console.log('error pub', error)
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
