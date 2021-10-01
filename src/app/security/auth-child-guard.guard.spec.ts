import { TestBed } from '@angular/core/testing';

import { AuthChildGuardGuard } from './auth-child-guard.guard';

describe('AuthChildGuardGuard', () => {
  let guard: AuthChildGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthChildGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
