import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStoreComponent } from './details-store.component';

describe('DetailsStoreComponent', () => {
  let component: DetailsStoreComponent;
  let fixture: ComponentFixture<DetailsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
