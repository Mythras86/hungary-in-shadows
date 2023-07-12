import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectArtifactsComponent } from './select-artifacts.component';

describe('SelectArtifactsComponent', () => {
  let component: SelectArtifactsComponent;
  let fixture: ComponentFixture<SelectArtifactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectArtifactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
