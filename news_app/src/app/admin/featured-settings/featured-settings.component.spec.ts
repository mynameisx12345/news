import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedSettingsComponent } from './featured-settings.component';

describe('FeaturedSettingsComponent', () => {
  let component: FeaturedSettingsComponent;
  let fixture: ComponentFixture<FeaturedSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
