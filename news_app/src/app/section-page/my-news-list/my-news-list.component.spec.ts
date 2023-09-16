import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewsListComponent } from './my-news-list.component';

describe('MyNewsListComponent', () => {
  let component: MyNewsListComponent;
  let fixture: ComponentFixture<MyNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNewsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
