import { Component } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent {
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
  ];
}
