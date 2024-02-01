import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTokeComponent } from './field-toke.component';

describe('FieldTokeComponent', () => {
  let component: FieldTokeComponent;
  let fixture: ComponentFixture<FieldTokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTokeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldTokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
