import { TestBed } from '@angular/core/testing';

import { SortMeService } from './sort-me.service';

describe('SortMeService', () => {
  let service: SortMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
