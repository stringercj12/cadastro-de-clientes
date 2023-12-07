import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'filtrarCliente',
  standalone: true
})
export class FiltrarClientePipe implements PipeTransform {

  transform(clientes: Cliente[], value: string): Cliente[] {
    if (!value || !clientes) {
      return clientes;
    }

    const valorNormalizado = this.normalizarTexto(value);

    const resultado = clientes.filter(cliente => {
      const clienteBuscado = `${formatDate(cliente.dataNascimento, 'dd/MM/yyyy', 'pt-BR')} ${this.normalizarTexto(`${cliente.nomeCliente} ${cliente.cpf}`)}`;

      return clienteBuscado.includes(valorNormalizado);
    });

    return resultado;
  }

  normalizarTexto(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

}
