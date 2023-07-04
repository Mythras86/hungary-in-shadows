import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideContentComponent } from './hide-content.component';

describe('HideContentComponent', () => {
  let component: HideContentComponent;
  let fixture: ComponentFixture<HideContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HideContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
