import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-stories',
  templateUrl: './sub-stories.component.html',
  styleUrls: ['./sub-stories.component.sass']
})
export class SubStoriesComponent {
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
}
