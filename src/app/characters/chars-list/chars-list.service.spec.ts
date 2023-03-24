import { TestBed } from '@angular/core/testing';

import { CharsListService } from './chars-list.service';

describe('CharsListService', () => {
  let service: CharsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
