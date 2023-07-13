import { TestBed } from '@angular/core/testing';

import { SelectToolService } from './select-tools.service';

describe('SelectToolService', () => {
  let service: SelectToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
