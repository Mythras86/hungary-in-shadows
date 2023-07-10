import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCybersComponent } from './select-cybers.component';

describe('SelectCybersComponent', () => {
  let component: SelectCybersComponent;
  let fixture: ComponentFixture<SelectCybersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCybersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCybersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
