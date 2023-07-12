import { TestBed } from '@angular/core/testing';

import { SelectArtifactService } from './select-artifacts.service';

describe('SelectArtifactService', () => {
  let service: SelectArtifactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectArtifactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
