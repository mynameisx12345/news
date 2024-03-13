import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTengComponent } from './table-teng.component';

describe('TableTengComponent', () => {
  let component: TableTengComponent;
  let fixture: ComponentFixture<TableTengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTengComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
