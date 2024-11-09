import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAsignaturasComponent } from './crud-asignaturas.component';

describe('CrudAsignaturasComponent', () => {
  let component: CrudAsignaturasComponent;
  let fixture: ComponentFixture<CrudAsignaturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAsignaturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudAsignaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
