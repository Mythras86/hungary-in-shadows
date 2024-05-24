import { TestBed } from '@angular/core/testing';

import { SkillsSelectService } from './skills-select.service';

describe('SkillsSelectService', () => {
  let service: SkillsSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
