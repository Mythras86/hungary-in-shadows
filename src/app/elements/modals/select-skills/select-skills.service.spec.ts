import { TestBed } from '@angular/core/testing';

import { SelectSkillsService } from './select-skills.service';

describe('SelectSkillsService', () => {
  let service: SelectSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
