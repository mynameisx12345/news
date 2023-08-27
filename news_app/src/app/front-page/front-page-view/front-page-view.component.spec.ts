import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageViewComponent } from './front-page-view.component';

describe('FrontPageViewComponent', () => {
  let component: FrontPageViewComponent;
  let fixture: ComponentFixture<FrontPageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
