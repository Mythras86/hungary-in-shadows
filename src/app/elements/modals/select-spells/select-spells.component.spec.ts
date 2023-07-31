import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSpellsComponent } from './select-spells.component';

describe('SelectSpellsComponent', () => {
  let component: SelectSpellsComponent;
  let fixture: ComponentFixture<SelectSpellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSpellsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSpellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
