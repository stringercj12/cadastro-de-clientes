import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-clientes-detalhes',
  templateUrl: './clientes-detalhes.component.html',
  styleUrls: ['./clientes-detalhes.component.scss']
})
export class ClientesDetalhesComponent implements OnInit {
  cliente!: Cliente;

  constructor(private clienteService: ClientesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.clienteService.buscarClientePorId(param['id']).subscribe(response => {
        this.cliente = response;
      });
    })
  }
}
