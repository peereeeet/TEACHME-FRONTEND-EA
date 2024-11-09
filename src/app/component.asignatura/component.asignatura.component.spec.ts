import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAsignaturaComponent } from './component.asignatura.component';

describe('ComponentAsignaturaComponent', () => {
  let component: ComponentAsignaturaComponent;
  let fixture: ComponentFixture<ComponentAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAsignaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
