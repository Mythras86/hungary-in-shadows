import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelcontrolComponent } from './levelcontrol.component';

describe('LevelcontrolComponent', () => {
  let component: LevelcontrolComponent;
  let fixture: ComponentFixture<LevelcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelcontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
