import { TestBed } from '@angular/core/testing';

import { ViewNewsService } from './view-news.service';

describe('ViewNewsService', () => {
  let service: ViewNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
