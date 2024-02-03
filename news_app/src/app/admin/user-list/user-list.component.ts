import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { tap,catchError, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/auth/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { b64toBlob } from 'src/app/shared/util';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    'idNumber',
    'email',
    'firstname',
    'middlename',
    'lastname',
    'suffix',
    'departmentName',
    'userTypeName',
    'exam',
    'isApproved',
    'action'
  ]
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly snackbar: MatSnackBar
  ){}

  dataSource = new MatTableDataSource<any>;

  ngOnInit(): void {
    setTimeout(()=>{
      this.adminService.getUsers().pipe(
        tap(users=>{
          this.dataSource.data = users;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      ).subscribe();
    }, 1000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveUser(element){
    const formData: any = new FormData();
    formData.append('email', element.email);
    formData.append('password', element.password);
    formData.append('id_number', element.idNumber);
    formData.append('first_name', element.firstname);
    formData.append('middle_name', element.middlename);
    formData.append('last_name', element.lastname);
    formData.append('suffix', element.suffix);
    formData.append('department_id', element.department);
    formData.append('is_approved', 1);
    formData.append('user_type', element.userType);
    formData.append('exam', b64toBlob(element.exam));
    formData.append('id', element.id);
    formData.append('password', element.password);
    this.userService.register(formData).pipe(
      tap((resp)=>{
        this.snackbar.open(`User is Approved`,'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-accent']
        });
        element.isApproved = 'Yes';
      }),
      catchError((error)=>{
        this.snackbar.open(error.error.message,'',{
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['mat-warn']
        })
        return of(error);
      })
    ).subscribe();
  }
}
