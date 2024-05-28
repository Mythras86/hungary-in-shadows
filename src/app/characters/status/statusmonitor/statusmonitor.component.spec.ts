import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusmonitorComponent } from './statusmonitor.component';

describe('StatusmonitorComponent', () => {
  let component: StatusmonitorComponent;
  let fixture: ComponentFixture<StatusmonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusmonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusmonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
