import { TestBed } from '@angular/core/testing';

import { SelectWeaponService } from './select-weapons.service';

describe('SelectWeaponService', () => {
  let service: SelectWeaponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectWeaponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
