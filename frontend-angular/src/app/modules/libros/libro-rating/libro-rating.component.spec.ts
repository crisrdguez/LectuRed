import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroRatingComponent } from './libro-rating.component';

describe('LibroRatingComponent', () => {
  let component: LibroRatingComponent;
  let fixture: ComponentFixture<LibroRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroRatingComponent]
    });
    fixture = TestBed.createComponent(LibroRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
