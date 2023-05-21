import { TestBed } from '@angular/core/testing';

import { LevelcontrolService } from './levelcontrol.service';

describe('LevelcontrolService', () => {
  let service: LevelcontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelcontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
