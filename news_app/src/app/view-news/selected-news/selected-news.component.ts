import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewNewsService } from '../view-news.service';
import { tap, take, BehaviorSubject, filter, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-selected-news',
  templateUrl: './selected-news.component.html',
  styleUrls: ['./selected-news.component.sass']
})
export class SelectedNewsComponent implements OnInit{
  @Output() onEdit = new EventEmitter;
  content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  title = '';
  comments:any[] = [];
  imgSrc: any;

  searchMode = false;
  author = '';
  newsId = null;
  currentUser = null;

  loadComments$ = new BehaviorSubject(false);
  comments$ = this.loadComments$.pipe(
    filter(load=>load),
    switchMap(()=> this.viewNewsService.getComments(this.newsId)),
    tap(()=>{
      this.loadComments$.next(false);
    })
  )
  constructor(
    private readonly viewNewsService: ViewNewsService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ){}

  ngOnInit(): void {
    this.viewNewsService.currentNews$.pipe(
      tap(news=>{
        let image = news?.image instanceof Blob ? URL.createObjectURL(news.image) : news?.image;
        this.content = news?.content;
        this.title = news?.title;
        this.imgSrc =image;
        this.author = `${news?.first_name} ${news?.middle_name} ${news?.last_name} ${news?.suffix}`
      })
    ).subscribe();

    this.route.queryParams.subscribe((param)=>{
      console.log('param', param)
      if(param.hasOwnProperty('id')){
        this.newsId = param['id'];
        this.searchMode = true;
        this.viewNewsService.getNews('','','',param['id']).pipe(
          take(1),
          tap(news=>{
            if(news.length > 0){
              let [show] = news;
              this.viewNewsService.setCurrentNews(show);
              this.loadComments$.next(true);
            }
            
          })
        ).subscribe();
      } 
    })

   
    this.userService.currentUser$.pipe(
      tap((user)=>{
        console.log('currentuser', user)
        this.currentUser = user
      }),
      take(1)
    ).subscribe();

    
  }

  addComment(comment:any){
    let data = {
      id: "",
      message: comment,
      user_id: this.currentUser?.id,
      news_id: this.newsId,
      isRead: true,
      originalMessage: comment,
      user: `${this.currentUser?.firstname} ${this.currentUser?.middlename} ${this.currentUser?.lastname} ${this.currentUser?.suffix}`,
      dtModified: moment().format('MMM DD, YYYY')
    };
    this.viewNewsService.addComment(data).pipe(
      tap((res)=>{
       // this.comments.push(data)
       this.loadComments$.next(true);
      }),
      take(1)
    ).subscribe();
    
  }

  editComment(comment){
    this.viewNewsService.addComment(comment).pipe(
      tap((res)=>{
        comment.originalMessage = comment.message
        this.loadComments$.next(true);
      }),
      take(1)
    ).subscribe();
  }

  deleteComment(comment){
    console.log('comment', comment);
    this.viewNewsService.deleteComment(comment).pipe(
      tap(()=>{
        this.loadComments$.next(true);
      }),
      take(1)
    ).subscribe();
  }



  edit(){
    this.onEdit.emit();
  }
}
