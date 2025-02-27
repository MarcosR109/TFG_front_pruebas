import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasdragdropComponent } from './pruebasdragdrop.component';

describe('PruebasdragdropComponent', () => {
  let component: PruebasdragdropComponent;
  let fixture: ComponentFixture<PruebasdragdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebasdragdropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebasdragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
