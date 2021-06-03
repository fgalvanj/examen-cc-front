import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './components/prospectos/listado/listado/listado.component';
import { DetallesComponent } from './components/prospectos/detalles/detalles/detalles.component';
import { CapturaComponent } from './components/prospectos/captura/captura/captura.component';

const routes: Routes = [
  { path: '', component: ListadoComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: 'captura', component: CapturaComponent },
  { path: 'evaluar/:id', component: CapturaComponent },
  { path: '**', component: ListadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
