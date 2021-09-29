import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginOrPaidComponent } from './begin-or-paid.component';

describe('BeginOrPaidComponent', () => {
  let component: BeginOrPaidComponent;
  let fixture: ComponentFixture<BeginOrPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginOrPaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginOrPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
