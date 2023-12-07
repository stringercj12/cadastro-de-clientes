import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ClientesNovoComponent } from './clientes/clientes-novo/clientes-novo.component';
import { ClientesDetalhesComponent } from './clientes/clientes-detalhes/clientes-detalhes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-de-clientes',
    pathMatch: 'full'
  },
  {
    path: 'lista-de-clientes',
    component: ClientesListaComponent
  },
  {
    path: 'novo-cliente',
    component: ClientesNovoComponent
  },
  {
    path: 'novo-cliente/:id',
    component: ClientesNovoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
