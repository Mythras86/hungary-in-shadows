import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicsComponent } from './magics.component';

describe('MagicsComponent', () => {
  let component: MagicsComponent;
  let fixture: ComponentFixture<MagicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
