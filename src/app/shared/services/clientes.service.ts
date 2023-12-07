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

  listarClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.api}/clientes`).pipe();
  }

  buscarClientePorId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.api}/clientes/${id}`).pipe();
  }
}
