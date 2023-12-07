import { Component, OnInit, inject } from '@angular/core';
import { ClientesService } from './shared/services/clientes.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Cliente } from './shared/interfaces/cliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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
