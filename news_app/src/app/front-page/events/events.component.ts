import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent {
  events = [
    {
      title: 'Event A',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
    {
      title: 'Event B',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
    {
      title: 'Event C',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
    {
      title: 'Event D',
      schedule: 'Oct. 3, 2023 (Tue)'
    },
  ]
}
