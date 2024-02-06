import { Component, OnInit } from '@angular/core';
import { FrontPageService } from '../front-page.service';
import { UserService } from 'src/app/auth/user.service';
import { switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-front-page-view',
  templateUrl: './front-page-view.component.html',
  styleUrls: ['./front-page-view.component.sass']
})
export class FrontPageViewComponent implements OnInit{
  featured =[{title: '', content: '',image:''}];
  constructor(
    private readonly fontpageService: FrontPageService,
    private readonly userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.currentDepartment$.pipe(
      switchMap((dept)=>{
        return this.fontpageService.getFeatured(dept)
      }),
      tap((featured)=>{
        if(featured.length> 0){
          this.featured = featured
        }
        
      })
    ).subscribe();
  }
  
}
