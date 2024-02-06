import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { LovService } from 'src/app/shared/services/lov.service';
import { ViewNewsService } from 'src/app/view-news/view-news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit{

  constructor(
    private readonly router: Router,
    private readonly viewNewsService: ViewNewsService,
    private readonly lovService: LovService,
    private readonly userService: UserService
  ){}
  news = [ 
    {
      title: '1This is news a b c d e title title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '2This is news a b c d e title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '3This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '1This is news a b c d e title title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '2This is news a b c d e title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '3This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '1This is news a b c d e title title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '2This is news a b c d e title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '3This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
    {
      title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
      link: '/news/selected-news'
    },
  ];

  openNews(news:any){
    this.viewNewsService.setCurrentNews(news);
    this.router.navigateByUrl(`/news/selected-news?id=${news.id}`);
  } 

  loadNews$ = new BehaviorSubject(false);
  // getNews$ = this.loadNews$.pipe(
  //   filter(load=>load),
  //   withLatestFrom(this.userService.currentDepartment$),
  //   map(([load,curDept])=>{
  //     return curDept;
  //   }),
  //   switchMap((curDept)=>this.viewNewsService.getNews('',curDept)),
  //   tap((news)=>{
  //     this.loadNews$.next(false);
  //   })
  // );

  getNews$ = this.userService.currentDepartment$.pipe(
    tap(curDept=>{
      console.log('curDept', curDept);
    }),
    switchMap((curDept)=>this.viewNewsService.getNews('',curDept,'yes'))
  );

  ngOnInit(): void {
    this.loadNews$.next(true);
  }
  
}
