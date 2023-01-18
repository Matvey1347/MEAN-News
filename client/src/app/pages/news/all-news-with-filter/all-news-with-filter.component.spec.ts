import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsWithFilterComponent } from './all-news-with-filter.component';

describe('AllNewsWithFilterComponent', () => {
  let component: AllNewsWithFilterComponent;
  let fixture: ComponentFixture<AllNewsWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllNewsWithFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNewsWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
