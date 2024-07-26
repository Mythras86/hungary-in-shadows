import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialFieldComponent } from './special-field.component';

describe('SpecialFieldComponent', () => {
  let component: SpecialFieldComponent;
  let fixture: ComponentFixture<SpecialFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
