import { TestBed } from '@angular/core/testing';

import { ItemSelectService } from './item-select.service';

describe('ItemSelectService', () => {
  let service: ItemSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
