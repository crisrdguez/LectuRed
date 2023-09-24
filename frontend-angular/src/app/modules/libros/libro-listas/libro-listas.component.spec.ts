import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroListasComponent } from './libro-listas.component';

describe('LibroListasComponent', () => {
  let component: LibroListasComponent;
  let fixture: ComponentFixture<LibroListasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibroListasComponent]
    });
    fixture = TestBed.createComponent(LibroListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
