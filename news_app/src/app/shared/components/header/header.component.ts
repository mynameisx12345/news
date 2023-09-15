import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  constructor(
    private readonly router: Router
  ){}
  sections = [
    {
      title: 'News',
      icon: 'news.png',
      link: '/front-page'
    },
    {
      title: 'Entertainment',
      icon: 'popcorn.png'
    },
    {
      title: 'Sports',
      icon: 'ball.png'
    },
    {
      title: 'Gaming',
      icon: 'joystick.png'
    },
    {
      title: 'Money',
      icon: 'money.png'
    },
    {
      title: 'Lifestyle',
      icon: 'yoga.png'
    },
    {
      title: 'Health & Fitness',
      icon: 'dumbbell.png'
    },
    {
      title: 'Food & Drink',
      icon: 'wine.png'
    },
    {
      title: 'Travel',
      icon: 'airplane.png'
    },
    {
      title: 'Shopping',
      icon: 'cart.png'
    }
  ];

  goToLink(link:any){
    this.router.navigate([`${link}`]);
  }

  goToLogin(){
    this.router.navigate(['/auth/login'])
  }
}
