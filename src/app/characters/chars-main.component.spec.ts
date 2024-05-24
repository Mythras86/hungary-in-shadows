import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsMainComponent } from './chars-main.component';

describe('CreateCharComponent', () => {
  let component: CharsMainComponent;
  let fixture: ComponentFixture<CharsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
