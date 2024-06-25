import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSkillSpecComponent } from './select-skill-spec.component';

describe('SelectSkillSpecComponent', () => {
  let component: SelectSkillSpecComponent;
  let fixture: ComponentFixture<SelectSkillSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSkillSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSkillSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
