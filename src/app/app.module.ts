import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { ListadoComponent } from './components/prospectos/listado/listado/listado.component';
import { ProspectoService } from './services/prospecto.service';
import { CapturaComponent } from './components/prospectos/captura/captura/captura.component';
import { DetallesComponent } from './components/prospectos/detalles/detalles/detalles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArchivosService } from './services/archivos.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListadoComponent,
    CapturaComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [
    ProspectoService,
    ArchivosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
