import { TestBed } from '@angular/core/testing';

import { SectionHeadService } from './section-head.service';

describe('SectionHeadService', () => {
  let service: SectionHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
