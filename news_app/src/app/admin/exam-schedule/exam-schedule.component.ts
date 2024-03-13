import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { tap, BehaviorSubject, filter, switchMap, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.sass']
})
export class ExamScheduleComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>;
  columns = [
    'id',
    'description',
    'dtScheduled',
    'type',
    'action'
  ];

  loadExams$ = new BehaviorSubject(false);

  getExams$ = this.loadExams$.pipe(
    filter(load=>load),
    switchMap(()=>this.adminService.getExams()),
    tap((exams:any)=>{
      console.log('exams', exams)
      this.dataSource.data = exams;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
    tap(()=>{
      this.loadExams$.next(false);
    })
  );

  addFg: FormGroup;
  @ViewChild('addDialog') addDialog;
  currentDialog:any;

  constructor(
    private readonly adminService: AdminService,
    private readonly snackbar: MatSnackBar,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getExams$.subscribe();
    setTimeout(()=>{
      this.loadExams$.next(true);
    }, 1000)

    this.addFg = this.fb.group({
      description: ['', Validators.required],
      dtScheduled: ['', Validators.required],
      type: ['', Validators.required]
    })

  }

  deleteExam(id){
    this.adminService.deleteExam(id).pipe(
      tap(()=>{
        this.snackbar.open('Exam Deleted','',{
          duration: 2000,
          verticalPosition: 'top'
        });

        this.loadExams$.next(true);
      }),
      take(1)
    ).subscribe();
  }

  openAddDialog(){
    this.addFg.patchValue({
      description: null,
      dtScheduled:null,
      type: null
    })
    this.currentDialog = this.dialog.open(this.addDialog,{
      width:'30%'
    })
  }

  addExam(){
    let data = {
      'description': this.addFg.get('description').value,
      'dt_scheduled': moment(this.addFg.get('dtScheduled').value).format('YYYY-MM-DD'),
      'type': this.addFg.get('type').value
    };
    this.adminService.addExam(data).pipe(
      tap(()=>{
        this.snackbar.open('Exam Added','',{
          duration: 2000,
          verticalPosition: 'top'
        });

        this.loadExams$.next(true);
        this.currentDialog.close();
      }),
      take(1)
    ).subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
