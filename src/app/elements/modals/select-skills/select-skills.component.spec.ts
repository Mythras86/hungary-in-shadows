import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSkillsComponent } from './select-skills.component';

describe('SelectSkillsComponent', () => {
  let component: SelectSkillsComponent;
  let fixture: ComponentFixture<SelectSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSkillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
