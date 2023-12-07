import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = environment.api;

  constructor(private httpClient: HttpClient) { }

  listarClientes(page = 1): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.api}/clientes?_page${page}`).pipe();
  }

  buscarClientePorId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.api}/clientes/${id}`).pipe();
  }

  cadastrarCliente(form: object) {
    return this.httpClient.post(`${this.api}/clientes`, form).pipe();
  }

  atualizarCliente(form: object, id: number) {
    return this.httpClient.put(`${this.api}/clientes/${id}`, form).pipe();
  }

  excluirCliente(id: number) {
    return this.httpClient.delete(`${this.api}/clientes/${id}`).pipe();
  }
}
