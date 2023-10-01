import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCategoriasComponent } from './libro-categorias.component';

describe('LibroCategoriasComponent', () => {
  let component: LibroCategoriasComponent;
  let fixture: ComponentFixture<LibroCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroCategoriasComponent]
    });
    fixture = TestBed.createComponent(LibroCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
