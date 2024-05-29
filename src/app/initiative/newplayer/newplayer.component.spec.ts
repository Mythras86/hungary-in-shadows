import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewplayerComponent } from './newplayer.component';

describe('NewplayerComponent', () => {
  let component: NewplayerComponent;
  let fixture: ComponentFixture<NewplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
