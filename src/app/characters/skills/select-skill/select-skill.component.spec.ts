import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSkillComponent } from './select-skill.component';

describe('SelectSkillComponent', () => {
  let component: SelectSkillComponent;
  let fixture: ComponentFixture<SelectSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSkillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
