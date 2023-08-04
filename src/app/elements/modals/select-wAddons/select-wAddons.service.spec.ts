import { TestBed } from '@angular/core/testing';

import { SelectWAddonService } from './select-wAddons.service';

describe('SelectWAddonService', () => {
  let service: SelectWAddonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectWAddonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
