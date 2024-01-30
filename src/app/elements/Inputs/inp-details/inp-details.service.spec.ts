import { TestBed } from '@angular/core/testing';
import { InpDetailsService } from './inp-details.service';


describe('InputModalService', () => {
  let service: InpDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InpDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
