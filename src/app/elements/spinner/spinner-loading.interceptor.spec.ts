import { TestBed } from '@angular/core/testing';

import { SpinnerLoadingInterceptor } from './spinner-loading.interceptor';

describe('SpinnerLoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpinnerLoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpinnerLoadingInterceptor = TestBed.inject(SpinnerLoadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
