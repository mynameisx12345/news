import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  sections = [
    {
      title: 'News',
      icon: 'news.png'
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
  ]
}
