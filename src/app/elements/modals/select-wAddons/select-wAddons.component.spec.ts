import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectWAddonsComponent } from './select-wAddons.component';

describe('SelectWeaponsComponent', () => {
  let component: SelectWAddonsComponent;
  let fixture: ComponentFixture<SelectWAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWAddonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectWAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
