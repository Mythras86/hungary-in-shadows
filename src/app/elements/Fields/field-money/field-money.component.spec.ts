import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMoneyComponent } from './field-money.component';

describe('FieldMoneyComponent', () => {
  let component: FieldMoneyComponent;
  let fixture: ComponentFixture<FieldMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
