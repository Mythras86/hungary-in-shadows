import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectArmorsComponent } from './select-armors.component';

describe('SelectArmorsComponent', () => {
  let component: SelectArmorsComponent;
  let fixture: ComponentFixture<SelectArmorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectArmorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectArmorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
