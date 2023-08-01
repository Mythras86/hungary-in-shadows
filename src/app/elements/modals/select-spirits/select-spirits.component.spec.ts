import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSpiritsComponent } from './select-spirits.component';

describe('SelectSpiritsComponent', () => {
  let component: SelectSpiritsComponent;
  let fixture: ComponentFixture<SelectSpiritsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSpiritsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSpiritsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
