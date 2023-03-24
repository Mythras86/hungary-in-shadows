import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharResourcesComponent } from './resources.component';

describe('CharResourcesComponent', () => {
  let component: CharResourcesComponent;
  let fixture: ComponentFixture<CharResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
