import { TestBed } from '@angular/core/testing';

import { ExplosivesService } from './explosives.service';

describe('ExplosivesService', () => {
  let service: ExplosivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplosivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
