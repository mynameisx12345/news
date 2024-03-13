import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { tap,take } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.sass']
})
export class ExamScheduleComponent implements OnInit{

  constructor(
    private readonly adminService: AdminService
  ){}
  exams = [];

  ngOnInit(): void {
    this.adminService.getExams('Exam').pipe(
      tap((exams)=>{
        this.exams =  exams.map((exam)=>{
          return {
            description: exam.description,
            dtScheduled: moment(exam.dtScheduled).format('MMM DD, YYYY')
          }
        })
      }),
      take(1)
    ).subscribe();
  }

  
}
