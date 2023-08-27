import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  developers = [
    'Jamaica Marie V. Casimero',
    'Daisy D. Sumugat',
    'Christine M. De La Cruz',
    'Eric T. Mendoza'
  ];

  appDesc = ' This application is developed to speed up communication and information sharing within the school of the University of Antique TLMC';
}
