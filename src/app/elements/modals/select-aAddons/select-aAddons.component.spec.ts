import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAAddonsComponent } from './select-aAddons.component';

describe('SelectWeaponsComponent', () => {
  let component: SelectAAddonsComponent;
  let fixture: ComponentFixture<SelectAAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAAddonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
