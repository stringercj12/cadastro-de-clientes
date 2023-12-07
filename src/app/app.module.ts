import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ClientesNovoComponent } from './clientes/clientes-novo/clientes-novo.component';
import { ClientesDetalhesComponent } from './clientes/clientes-detalhes/clientes-detalhes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesListaComponent,
    ClientesNovoComponent,
    ClientesDetalhesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
