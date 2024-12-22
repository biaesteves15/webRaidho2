import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorarFuncionariosComponent } from './monitorar-funcionarios.component';

describe('MonitorarFuncionariosComponent', () => {
  let component: MonitorarFuncionariosComponent;
  let fixture: ComponentFixture<MonitorarFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorarFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorarFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
