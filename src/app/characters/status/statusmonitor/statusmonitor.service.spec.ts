import { TestBed } from '@angular/core/testing';

import { StatusmonitorService } from './statusmonitor.service';

describe('StatusmonitorService', () => {
  let service: StatusmonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusmonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
