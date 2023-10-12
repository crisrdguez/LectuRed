import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroActividadComponent } from './libro-actividad.component';

describe('LibroActividadComponent', () => {
  let component: LibroActividadComponent;
  let fixture: ComponentFixture<LibroActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroActividadComponent]
    });
    fixture = TestBed.createComponent(LibroActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
