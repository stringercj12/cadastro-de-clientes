
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/components/header/header.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { ClientesNovoComponent } from './clientes/clientes-novo/clientes-novo.component';
import { ClientesDetalhesComponent } from './clientes/clientes-detalhes/clientes-detalhes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyMaskDirective } from './shared/directives/currency-mask.directive';
import { CpfMaskDirective } from './shared/directives/cpf-mask.directive';
import { FiltrarClientePipe } from './shared/pipes/filtrar-cliente.pipe';
import { ModalAlertaComponent } from './shared/components/modal-alerta/modal-alerta.component';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesListaComponent,
    ClientesNovoComponent,
    ClientesDetalhesComponent,
    CurrencyMaskDirective,
    CpfMaskDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FiltrarClientePipe,
    ModalAlertaComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
