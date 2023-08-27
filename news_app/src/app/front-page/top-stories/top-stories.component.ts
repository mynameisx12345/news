import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.sass']
})
export class TopStoriesComponent {
  constructor(
    private readonly router: Router,
  ){}
  mainStories = [
    {
      title: '1This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '2This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '3This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
    {
      title: '4This is news a b c d e',
      image: '../../../assets/icons/news.png',
      description: 'This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e This is news a b c d e',
    },
  ]

  openNews(){
    this.router.navigate(['/news/selected-news'])
  }
}
