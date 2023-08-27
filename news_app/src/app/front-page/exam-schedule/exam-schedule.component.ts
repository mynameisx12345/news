import { Component } from '@angular/core';

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.sass']
})
export class ExamScheduleComponent {
  exams = [
    {
      title: 'Mid-term Exam',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
    {
      title: 'Final Exam',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
    {
      title: 'Mid-term Exam',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
    {
      title: 'Final Exam',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
  ]
}
