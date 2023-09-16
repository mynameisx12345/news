import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.sass']
})
export class SectionAComponent implements OnInit {
  sectionName$ = this.route.queryParams.pipe(
    map((query:any)=>query.section)
  )
  constructor(
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {
  }
}
