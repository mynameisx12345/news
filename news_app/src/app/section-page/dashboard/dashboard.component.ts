import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { ViewNewsService } from 'src/app/view-news/view-news.service';
import { tap, switchMap, BehaviorSubject,withLatestFrom,filter } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit{
  mode: 'view' | 'edit' | 'dashboard' = 'dashboard';
  isNew = true;
  currentUser: any;
  myNews: any;
  loadMyNews$ = new BehaviorSubject(false);
  myNews$ = this.loadMyNews$.pipe(
    filter(load=>load),
    withLatestFrom(this.userService.currentUser$),
    switchMap(([load,user])=>this.viewNewsService.getNews(user['id'])),
    tap((news)=>{
      this.loadMyNews$.next(false);
    })
  )
  
  // this.userService.currentUser$.pipe(
   
  //   switchMap((user:any)=> this.viewNewsService.getNews(user.id).pipe(
  //     tap((news)=>{
  //       console.log('mynews', news);
  //     })
  //   ))
  // );
  constructor(
    private readonly viewNewsService: ViewNewsService,
    private readonly userService:UserService
  ){}

  ngOnInit(): void {
    this.userService.currentUser$.pipe(
      tap((user)=>{
        this.currentUser = user;
      }),
    );

    this.loadMyNews$.next(true);
  }

  addNew(){
    this.mode = 'edit';
    this.isNew = true;
  }

  preview(){
    this.mode = 'view';
  }

  edit(){
    this.mode = "edit";
    this.isNew = false;
  }

  setCurrentNews(news){

    this.viewNewsService.setCurrentNews(news);
    this.mode = 'view';
  };

  saveNews(){
    this.loadMyNews$.next(true);
  }

  selectNews(){
    this.mode = 'view';
  }

}
