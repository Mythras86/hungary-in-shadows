import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModifyComponent } from './button-edit.component';

describe('ButtonModifyComponent', () => {
  let component: ButtonModifyComponent;
  let fixture: ComponentFixture<ButtonModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
