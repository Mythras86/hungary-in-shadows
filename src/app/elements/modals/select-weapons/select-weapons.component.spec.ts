import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectWeaponsComponent } from './select-weapons.component';

describe('SelectWeaponsComponent', () => {
  let component: SelectWeaponsComponent;
  let fixture: ComponentFixture<SelectWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWeaponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
