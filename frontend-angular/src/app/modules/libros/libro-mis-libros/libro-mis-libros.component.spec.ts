import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroMisLibrosComponent } from './libro-mis-libros.component';

describe('LibroMisLibrosComponent', () => {
  let component: LibroMisLibrosComponent;
  let fixture: ComponentFixture<LibroMisLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroMisLibrosComponent]
    });
    fixture = TestBed.createComponent(LibroMisLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
