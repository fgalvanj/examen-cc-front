import { Component, OnInit } from '@angular/core';
import { Prospecto } from 'src/app/modelo/prospecto';
import { ProspectoService } from '../../../../services/prospecto.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  prospectos!: Prospecto[];

  constructor(private prospectoService: ProspectoService) { }

  ngOnInit() {
    this.prospectoService.getProspectos().subscribe(
      prospectos => this.prospectos = prospectos
    );
  }

}
