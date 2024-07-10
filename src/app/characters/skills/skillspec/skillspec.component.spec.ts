import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillspecComponent } from './skillspec.component';

describe('SkillspecComponent', () => {
  let component: SkillspecComponent;
  let fixture: ComponentFixture<SkillspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillspecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
