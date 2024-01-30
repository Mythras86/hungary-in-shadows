import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpDetailsComponent } from './inp-details.component';

describe('InpDetailsComponent', () => {
  let component: InpDetailsComponent;
  let fixture: ComponentFixture<InpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
