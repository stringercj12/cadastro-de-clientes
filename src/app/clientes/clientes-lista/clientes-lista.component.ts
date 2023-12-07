import { Component, OnInit, inject } from '@angular/core';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.scss'],
})
export class ClientesListaComponent implements OnInit {
  title = 'cadastro-de-clientes';
  clientesService = inject(ClientesService);
  modalService = inject(ModalService);
  totalRenda = 0;
  clientes: Cliente[] = [];
  filtro: string = '';
  itensPorPagina = 4;
  pagina = 1;
  ordemSelecionada = 'asc';
  totalDePagina = 1;
  message: any;

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.clientes = [];
    this.totalRenda = 0;
    this.todosEstaoChecados();
    this.clientesService.listarClientes(this.pagina).subscribe({
      next: (clientes) => {
        this.clientes = clientes.map((cliente) => {
          cliente.selecionado = false;
          this.totalRenda = this.totalRenda + cliente.rendaMensal;
          return cliente;
        });
        this.getPaginatedElements();
        this.onSort();
      },
    });
  }

  getPaginatedElements() {
    const startIndex = (this.pagina - 1) * this.itensPorPagina;
    const endIndex = startIndex + this.itensPorPagina;
    this.totalDePagina = this.itensPorPagina ? Math.ceil(this.clientes.length / this.itensPorPagina) : 1;
    return this.clientes.slice(startIndex, endIndex);
  }


  mudarPagina(type: string) {
    if (type == 'prev') {
      this.pagina = this.pagina == 1 ? 1 : this.pagina - 1;
    } else {
      this.pagina = this.pagina + 1;
    }
    this.listarClientes();
  }

  onSort() {
    if (this.ordemSelecionada === 'desc') {
      return this.clientes.sort((a, b) => b.nomeCliente.localeCompare(a.nomeCliente));
    } else {
      return this.clientes.sort((a, b) => a.nomeCliente.localeCompare(b.nomeCliente));
    }
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
            // this.router.navigate(['/lista-de-clientes']);
            this.modalService.openModal();
            this.modalService.success = true;
            this.modalService.text = 'Cliente excluído com sucesso!'
          },
          error: () => {
            this.modalService.openModal();
            this.modalService.success = false;
            this.modalService.text = 'Erro ao excluir cliente!'
          }
        });
      }
    });

  }
}