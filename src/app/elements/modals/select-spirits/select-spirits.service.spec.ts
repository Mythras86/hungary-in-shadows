import { TestBed } from '@angular/core/testing';

import { SelectSpiritsService } from './select-spirits.service';

describe('SelectSpiritsService', () => {
  let service: SelectSpiritsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectSpiritsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
