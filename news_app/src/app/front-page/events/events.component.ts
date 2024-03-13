import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { tap,take } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit{
  constructor(
    private readonly adminService: AdminService
  ){}
  events = [];

  ngOnInit(): void {
    this.adminService.getExams('Event').pipe(
      tap((events)=>{
        this.events =  events.map((event)=>{
          return {
            description: event.description,
            dtScheduled: moment(event.dtScheduled).format('MMM DD, YYYY')
          }
        })
      }),
      take(1)
    ).subscribe();
  }
}
