import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancioneslistfComponent } from './cancioneslistf.component';

describe('CancioneslistfComponent', () => {
  let component: CancioneslistfComponent;
  let fixture: ComponentFixture<CancioneslistfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancioneslistfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancioneslistfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
