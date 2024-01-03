import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldKarmaComponent } from './field-karma.component';

describe('FieldKarmaComponent', () => {
  let component: FieldKarmaComponent;
  let fixture: ComponentFixture<FieldKarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldKarmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldKarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
