import { TestBed } from '@angular/core/testing';

import { SelectCyberService } from './select-cybers.service';

describe('SelectCyberService', () => {
  let service: SelectCyberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectCyberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
