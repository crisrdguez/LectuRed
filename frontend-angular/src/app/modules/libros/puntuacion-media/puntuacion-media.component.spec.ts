import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionMediaComponent } from './puntuacion-media.component';

describe('PuntuacionMediaComponent', () => {
  let component: PuntuacionMediaComponent;
  let fixture: ComponentFixture<PuntuacionMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntuacionMediaComponent]
    });
    fixture = TestBed.createComponent(PuntuacionMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
