import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';
import { map,tap, switchMap, BehaviorSubject, filter, take, combineLatest, withLatestFrom } from 'rxjs';
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
  isAdmin = false;
  isJournalist = false;
  userId = '';

  currentDepartment = null;
  departments = null;
  journalistDept = null;
  loadLovService$ = new BehaviorSubject(false);
  departments$ =  this.lovService.departments$.pipe(
    tap(dept=>{
      console.log('dept', dept)
    })
  )

  journalistDept$ = combineLatest(this.userService.currentUser$, this.lovService.departments$).pipe(
    map(([user, departments])=>{
      if(departments?.length > 0){
        return  departments.filter(dept=>dept.id == user['department'] || dept.name ==='SEA BREEZE');
      } else {
        return [];
      }
     
    })
  )
  
loadCurrentUser$ = new BehaviorSubject(false);

currentUserNameA$ =this.loadCurrentUser$.pipe(
  filter(load=>load),
  withLatestFrom(this.currentUser$),
  map(([load,user])=>{
    if(user!== null){
      this.userId = user['id'];

      return `${user['firstname']} ${user['middlename'] ? user['middlename'] :''} ${user['lastname']} ${user['suffix'] ? user['suffix'] : ''}`;
    } else {
      return '';
    }
   
  }),
  tap(()=>{
    this.loadCurrentUser$.next(false);
  })
)

isAdmin$ = this.userService.currentUser$.pipe(
  map((user)=>{
    if(user){
      return user['userType']=== '3';
    } else {
      return false;
    }
  })
);

isJournalist$ =this.userService.currentUser$.pipe(
  map((user)=>{
    if(user){
      return user['userType']=== '2';
    } else {
      return false;
    }
    
  })
);

  currentUserName$ = this.currentUser$.pipe(
    //take(1),
    tap((user:any)=>{
      console.log('users', user)
      if(user!== null){
        this.userId = user.id;
        if(user.userType === '3'){
          this.isAdmin = true
        } else if(user.userType==='2'){
          console.log('userser',user)
          this.isJournalist = true;
         
        }
      }
      
    }),
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
    this.router.navigate(['/auth/login']);
  }

  setLovs(){
    this.lovService.getDepartments().pipe(
      tap((departments)=>{
        this.departments = departments

      }),
      switchMap((departments)=>{
        return this.userService.currentDepartment$.pipe(
  
          tap((curDept)=>{
            this.currentDepartment = this.departments.find(dept=>dept.id === curDept)?.name;
           
          })
        )
      })
    ).subscribe();
  }

  openUserList(){
    this.router.navigate(['/admin/user-list']);
  }

  openProfile(){
    this.router.navigateByUrl(`/auth/register?id=${this.userId}`);
  }

  switchDepartment(dept){
    this.currentDepartment = dept.name;
    this.userService.setCurrentDepartment(dept.id);
  }

  gotoFrontPage(){
    this.userService.isLogged$.subscribe((res)=>{
      if(res){
        this.router.navigate(['/front-page']);
      }
    })
  }

  openFeaturedSettings(){
    this.router.navigate(['/admin/featured'])
  }

  openExam(){
    this.router.navigate(['/admin/exam-schedule'])
  }

}
