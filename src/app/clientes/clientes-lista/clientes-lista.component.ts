import { Component, OnInit, inject } from '@angular/core';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss']
})
export class ClientesListaComponent implements OnInit {
  title = 'cadastro-de-clientes';
  clientesService = inject(ClientesService);
  totalRenda = 0;
  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.clientesService.listarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientes.map((cliente) => {
          this.totalRenda = this.totalRenda + cliente.rendaMensal;
        })
      }
    });
  }
}
