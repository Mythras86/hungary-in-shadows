import { TestBed } from '@angular/core/testing';

import { SelectArmorService } from './select-armor.service';

describe('SelectArmorService', () => {
  let service: SelectArmorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectArmorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
