import { TestBed } from '@angular/core/testing';

import { NewplayerService } from './newplayer.service';

describe('NewplayerService', () => {
  let service: NewplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
