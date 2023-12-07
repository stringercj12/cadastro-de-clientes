import { Component, OnInit, inject } from '@angular/core';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss'],
})
export class ClientesListaComponent implements OnInit {
  title = 'cadastro-de-clientes';
  clientesService = inject(ClientesService);
  totalRenda = 0;
  clientes: Cliente[] = [];
  filtro: string = '';
  pageSize = 5;
  currentPage = 1;
  ordemSelecionada = 'asc';

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.clientes = [];
    this.totalRenda = 0;
    this.todosEstaoChecados();
    this.clientesService.listarClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes.map((cliente) => {
          cliente.selecionado = false;
          this.totalRenda = this.totalRenda + cliente.rendaMensal;
          return cliente;
        });
        this.getPaginatedElements();
      },
    });
  }

  getPaginatedElements(): Cliente[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.clientes.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  onSort(event: Event) {
    const order = (event.target as HTMLInputElement).value;
    this.ordemSelecionada = order;
    if (order === 'asc') {
      return this.clientes.sort()
    }
    else {
      return this.clientes.sort().reverse();
    }
  }

  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.clientes.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  selecionarTodos(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.clientes.forEach(cliente => cliente.selecionado = isChecked);
  }

  selecionarCliente(cliente: Cliente) {
    cliente.selecionado = !cliente.selecionado;
  }

  todosEstaoChecados(): boolean {
    return this.clientes.length > 0 ? this.clientes.every(cliente => cliente.selecionado) : false;
  }
  aoMenosUmChecado(): boolean {
    return this.clientes.some(cliente => cliente.selecionado);
  }

  removerSelecionados() {
    this.clientes.map(cliente => {
      if (cliente.selecionado) {
        this.clientesService.excluirCliente(cliente.id).subscribe({
          next: () => {
            this.listarClientes();
          },
          error: () => {
            alert(`Erro ao tentar excluir o cliente: ${cliente.nomeCliente}`);
          }
        });
      }
    });

  }
}