import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSelectComponent } from './skills-select.component';

describe('SkillsSelectComponent', () => {
  let component: SkillsSelectComponent;
  let fixture: ComponentFixture<SkillsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
