import { Component, OnInit } from '@angular/core';
import { FrontPageService } from '../front-page.service';
import { tap, BehaviorSubject,filter, switchMap, withLatestFrom } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-stories',
  templateUrl: './sub-stories.component.html',
  styleUrls: ['./sub-stories.component.sass']
})
export class SubStoriesComponent implements OnInit{
  loadTrending$ = new BehaviorSubject(false);
  trending$ = this.loadTrending$.pipe(
    filter(load=>load),
    withLatestFrom(this.userService.currentDepartment$),
    switchMap(([load, department])=>
    {
      return this.frontPageService.getTrending(department);
    }),
    tap((trending)=>{
      console.log('trending', trending)
      this.loadTrending$.next(false);
    })
  )

  trendingA$ = this.userService.currentDepartment$.pipe(
    switchMap((department)=>
    {
      return this.frontPageService.getTrending(department);
    }),
    tap((trending)=>{
      console.log('trending', trending)
      this.loadTrending$.next(false);
    })
  )
  constructor(
    private readonly frontPageService: FrontPageService,
    private readonly userService: UserService,
    private readonly router: Router
  ){}
  news = [ 
    {
      title: '1This is news a b c d e title title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '2This is news a b c d e title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '3This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '5This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '6This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
  ];

  ngOnInit(): void {
    this.loadTrending$.next(true);

    this.userService.currentDepartment$.pipe(
      tap((department)=>{
        this.loadTrending$.next(true);
      })
    ).subscribe();
  }

  openNews(news){
    this.router.navigateByUrl(`/news/selected-news?id=${news.id}`)
  }

 
}
