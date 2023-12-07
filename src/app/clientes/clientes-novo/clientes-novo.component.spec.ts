import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesNovoComponent } from './clientes-novo.component';

describe('ClientesNovoComponent', () => {
  let component: ClientesNovoComponent;
  let fixture: ComponentFixture<ClientesNovoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesNovoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
