import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ViewNewsService } from 'src/app/view-news/view-news.service';
import { b64toBlob } from 'src/app/shared/util';
@Component({
  selector: 'app-my-news-list',
  templateUrl: './my-news-list.component.html',
  styleUrls: ['./my-news-list.component.sass']
})
export class MyNewsListComponent {
  @Input() news = [];
  @Output() onSelectNews = new EventEmitter;
  constructor(
    private readonly router: Router,
    private readonly viewNewsService: ViewNewsService
  ){}
  // news = [ 
  //   {
  //     title: '1This is news a b c d e title title title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '2This is news a b c d e title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '3This is news a b c d e',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '1This is news a b c d e title title title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '2This is news a b c d e title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '3This is news a b c d e',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '1This is news a b c d e title title title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '2This is news a b c d e title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '3This is news a b c d e',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  //   {
  //     title: '4This is news a b c d e titletitle title titletitle title title title title titletitletitle  title  title title title',
  //     image: '../../../assets/icons/news.png',
  //     description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
  //     link: '/news/selected-news'
  //   },
  // ];

  openNews(news:any){
    this.viewNewsService.setCurrentNews(news);
    this.onSelectNews.emit();
  }
}
