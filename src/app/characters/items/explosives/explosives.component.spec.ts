import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplosivesComponent } from './explosives.component';

describe('ExplosivesComponent', () => {
  let component: ExplosivesComponent;
  let fixture: ComponentFixture<ExplosivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplosivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplosivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
