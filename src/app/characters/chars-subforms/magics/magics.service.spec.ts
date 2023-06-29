import { TestBed } from '@angular/core/testing';

import { MagicsService } from './magics.service';

describe('MagicsService', () => {
  let service: MagicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
