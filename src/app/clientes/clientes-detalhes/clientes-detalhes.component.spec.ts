import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDetalhesComponent } from './clientes-detalhes.component';

describe('ClientesDetalhesComponent', () => {
  let component: ClientesDetalhesComponent;
  let fixture: ComponentFixture<ClientesDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
