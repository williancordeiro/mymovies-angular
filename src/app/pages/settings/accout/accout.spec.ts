import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accout } from './accout';

describe('Accout', () => {
  let component: Accout;
  let fixture: ComponentFixture<Accout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accout],
    }).compileComponents();

    fixture = TestBed.createComponent(Accout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
