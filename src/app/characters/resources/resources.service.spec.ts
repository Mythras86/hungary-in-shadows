import { TestBed } from '@angular/core/testing';

import {ResourcesService } from './resources.service';

describe('CharResourcesService', () => {
  let service:ResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
