import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ViewNewsService } from 'src/app/view-news/view-news.service';
import { BehaviorSubject, switchMap, tap, catchError, of } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-featured-settings',
  templateUrl: './featured-settings.component.html',
  styleUrls: ['./featured-settings.component.sass']
})
export class FeaturedSettingsComponent implements OnInit {

  constructor(
    private readonly viewNewsService: ViewNewsService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly snackbar: MatSnackBar
  ){}
  
  todo = [];

  done = [];
  
  ngOnInit(): void {
    this.userService.currentDepartment$.pipe(
      switchMap((department)=>{
        return this.viewNewsService.getNews('',department,'yes','');
      }),
      tap((news)=>{
        this.todo = news
      })
    ).subscribe();
    //this.viewNewsService.getNews('','1','','');
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  save(){
    console.log('feautred', this.done)
    let department = '';
    let news = [];
    if(this.done.length > 0){
      department = this.done[1].department_id;
      news = this.done.map(feat=>{
        return {
          id: feat.id,
          department_id: feat.department_id
        }
      })
    }
    let featured = {
      department: department,
      news: news
    }
    this.adminService.saveFeatured(featured).pipe(
      tap((res)=>{
        this.snackbar.open('Save Successfully','',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-accent']
        })
      }),
      catchError((error)=>{
        this.snackbar.open(error.error,'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-accent']
        })
        return of(error)
      })
    ).subscribe();
  }


}
