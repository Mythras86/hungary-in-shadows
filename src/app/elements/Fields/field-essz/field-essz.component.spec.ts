import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldEsszComponent } from './field-essz.component';

describe('FieldEsszComponent', () => {
  let component: FieldEsszComponent;
  let fixture: ComponentFixture<FieldEsszComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldEsszComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldEsszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
