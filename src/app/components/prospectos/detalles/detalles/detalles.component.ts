import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Prospecto } from 'src/app/modelo/prospecto';
import { ProspectoService } from '../../../../services/prospecto.service';
import { ArchivosService } from '../../../../services/archivos.service';
import { Archivos } from 'src/app/modelo/archivos';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  public prospecto: Prospecto = new Prospecto();
  response: any;
  arrayArchivos!: Archivos[];

  constructor(
    private prospectoService: ProspectoService,
    private archivoService: ArchivosService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void { 
    this.getProspectoById();
   }

  getProspectoById(): void{
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];
      this.getFileByIdProspecto(id);
      this.prospectoService.getProspectoById(id).subscribe(
        (prospecto) =>  
        this.prospecto = prospecto,
        )
    });
  }

  getFileByIdProspecto(idProspecto: number): void{
    this.archivoService.getFileById(idProspecto).subscribe(
      data => { 
        this.arrayArchivos = data;
    });
  }
}
