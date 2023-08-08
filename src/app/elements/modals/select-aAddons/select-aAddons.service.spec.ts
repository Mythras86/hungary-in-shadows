import { TestBed } from '@angular/core/testing';

import { SelectAAddonService } from './select-aAddons.service';

describe('SelectAAddonService', () => {
  let service: SelectAAddonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAAddonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
