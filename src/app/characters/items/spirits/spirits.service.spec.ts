import { TestBed } from '@angular/core/testing';

import { SpiritsService } from './spirits.service';

describe('SpiritsService', () => {
  let service: SpiritsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiritsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
