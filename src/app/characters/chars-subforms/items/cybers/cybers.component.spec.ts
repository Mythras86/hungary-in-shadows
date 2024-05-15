import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CybersComponent } from './cybers.component';

describe('CybersComponent', () => {
  let component: CybersComponent;
  let fixture: ComponentFixture<CybersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CybersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CybersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
