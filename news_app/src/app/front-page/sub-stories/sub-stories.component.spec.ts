import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoriesComponent } from './sub-stories.component';

describe('SubStoriesComponent', () => {
  let component: SubStoriesComponent;
  let fixture: ComponentFixture<SubStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
