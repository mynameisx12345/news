import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { map } from 'rxjs';
import { LovService } from '../../services/lov.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit{
  constructor(
    private readonly router: Router,
    public userService: UserService,
    public lovService: LovService
  ){}
  sections = [
    {
      title: 'News',
      icon: 'news.png',
      link: '/front-page'
    },
    {
      title: 'Entertainment',
      icon: 'popcorn.png',
      link: '/section/section-a?section=Entertainment'
    },
    {
      title: 'Sports',
      icon: 'ball.png',
      link: '/section/section-a?section=Sports'
    },
    {
      title: 'Gaming',
      icon: 'joystick.png',
      link: '/section/section-a?section=Gaming'
    },
    {
      title: 'Money',
      icon: 'money.png',
      link: '/section/section-a?section=Money'
    },
    {
      title: 'Lifestyle',
      icon: 'yoga.png',
      link: '/section/section-a?section=Lifestyle'
    },
    {
      title: 'Health & Fitness',
      icon: 'dumbbell.png',
      link: '/section/section-a?section=Health%20%26%20Fitness'
    },
    {
      title: 'Food & Drink',
      icon: 'wine.png',
      link: '/section/section-a?section=Food%20%26%20Drink'
    },
    {
      title: 'Travel',
      icon: 'airplane.png',
      link: '/section/section-a?section=Travel'
    },
    {
      title: 'Shopping',
      icon: 'cart.png',
      link: '/section/section-a?section=Shopping'
    }
  ];

  isLogged$ = this.userService.isLogged$;
  currentUser$ = this.userService.currentUser$;

  currentUserName$ = this.currentUser$.pipe(
    map((user:any)=>{
      if(user !== null){
        return `${user.firstname} ${user.middlename ? user.middlename :''} ${user.lastname} ${user.suffix ? user.suffix : ''}`;
      } else {
        return '';
      }
     
    })
  )

  goToLink(link:any){
    this.router.navigateByUrl(`${link}`);
  }

  goToLogin(){
    this.router.navigate(['/auth/login'])
  }

  ngOnInit(): void {
    this.setLovs();
  }

  openDashboard(){
    this.router.navigate(['/section/dashboard'])
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/front-page']);
  }

  setLovs(){
    this.lovService.getDepartments().subscribe();
  }
}
