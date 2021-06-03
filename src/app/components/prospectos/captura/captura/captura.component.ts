import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Prospecto } from 'src/app/modelo/prospecto';
import { ProspectoService } from '../../../../services/prospecto.service';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Archivos } from 'src/app/modelo/archivos';
import { ArchivosService } from '../../../../services/archivos.service';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./captura.component.css']
})
export class CapturaComponent implements OnInit {
  titulo: String = "Agregar prospecto";
  prospecto: Prospecto = new Prospecto();
  files: Archivos = new Archivos();
  id!: number;
  situacion!: boolean;
  evaluacion!: boolean;
  selectedValue!: String;
  form: FormGroup;
  estatus: any = ['Enviado', 'Autorizado', 'Rechazado'];
  private archivoSeleccionado!: File;


  constructor(
    private prospectoService: ProspectoService,
    private archivoService: ArchivosService,
    private router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern('[a-z, A-Z, À-ÿ, \u00f1\u00d1]*')]],
        apellidoPaterno: ['', [Validators.required, Validators.pattern('[a-z, A-Z, À-ÿ, \u00E0-\u00FC]*')]],
        apellidoMaterno: ['', Validators.pattern('[a-z, A-Z, À-ÿ, \u00E0-\u00FC]*')],
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        colonia: ['', Validators.required],
        codigoPostal: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('[0-9]*')]],
        telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]],
        rfc: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(10), Validators.pattern('[0-9, a-z, A-Z ]*')]],
        situacion: [''],
        observaciones: [''],
        documento: ['']
      });
    }

  ngOnInit(): void { 
    this._route.params.forEach((params: Params) =>{
      this.id = params['id'];
      if(this.id != null){

        this.form.get('nombre')?.disable();
        this.form.get('apellidoPaterno')?.disable();
        this.form.get('apellidoMaterno')?.disable();
        this.form.get('calle')?.disable();
        this.form.get('numero')?.disable();
        this.form.get('colonia')?.disable();
        this.form.get('codigoPostal')?.disable();
        this.form.get('telefono')?.disable();
        this.form.get('rfc')?.disable();
        this.form.get('observaciones')?.disable();
        this.form.get('documentos')?.disable();


        this.prospectoService.getProspectoById(this.id).subscribe(
          data => {
            this.titulo = 'Evaluar Prospecto';
            this.situacion = !this.situacion;
            this.form.patchValue({
              id: data.id,
              nombre: data.nombre,
              apellidoPaterno: data.apellidoPaterno,
              apellidoMaterno: data.apellidoMaterno,
              calle: data.calle,
              numero: data.numero,
              colonia: data.colonia,
              codigoPostal: data.codigoPostal,
              telefono: data.telefono,
              rfc: data.rfc,
              situacion: data.situacion,
              observaciones: data.observaciones
            })
          }
        )
      }else{
        this.form = this.fb.group({
          nombre: ['', [Validators.required, Validators.pattern('[a-z, A-Z, À-ÿ, \u00f1\u00d1]*')]],
          apellidoPaterno: ['', [Validators.required, Validators.pattern('[a-z, A-Z, À-ÿ, \u00E0-\u00FC]*')]],
          apellidoMaterno: ['', Validators.pattern('[a-z, A-Z, À-ÿ, \u00E0-\u00FC]*')],
          calle: ['', Validators.required],
          numero: ['', Validators.required],
          colonia: ['', Validators.required],
          codigoPostal: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('[0-9]*')]],
          telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]],
          rfc: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(10), Validators.pattern('[0-9, a-z, A-Z ]*')]],
          situacion: [''],
          observaciones: [''],
          documento: ['', Validators.required]
        })
        this.evaluacion = !this.evaluacion;
        this.prospecto.situacion = "Enviado";
      }
    })

  }



  get documentos(): FormArray {
    return this.form.get('documentos') as FormArray;
  }

  addDocs(){
    const doc = this.fb.group({
      documento: new FormControl('')
    });

    this.documentos.push(doc);
  }

  deleteDocumentos(index: number){
    this.documentos.removeAt(index);
  }



  saveProspecto(): void {

    const pros: any = {
      nombre: this.form.get('nombre')?.value,
      apellidoPaterno: this.form.get('apellidoPaterno')?.value,
      apellidoMaterno: this.form.get('apellidoMaterno')?.value,
      calle: this.form.get('calle')?.value,
      numero: this.form.get('numero')?.value,
      colonia: this.form.get('colonia')?.value,
      codigoPostal: this.form.get('codigoPostal')?.value,
      telefono: this.form.get('telefono')?.value,
      rfc: this.form.get('rfc')?.value,
      situacion: this.form.get('situacion')?.value,
      observaciones: this.form.get('observaciones')?.value,
      id: null
    }

    if(this.id != null){
      pros.id = this.id;
      this.prospectoService.updateProspecto(pros).subscribe(
        prospecto => {
          this.router.navigate(['/detalles/', this.id])
          Swal.fire('Prospecto evaluado con éxito.', ' ', 'success')
        }, error => {
          this.router.navigate(['/detalles/', this.id])
          Swal.fire('Ha ocurrido un error.', ' ', 'error')
        })
    }else{
      pros.situacion = 'Enviado';
      this.prospectoService.addProspectos(pros).subscribe(
        prospecto => {
          console.log(prospecto.id);
          this.archivoService.uploadArchivos(this.archivoSeleccionado , prospecto.id).subscribe(
            response => {
              console.log(this.archivoSeleccionado);
              this.router.navigate(['/'])
              Swal.fire('Prospecto creado con éxito.', ' ', 'success')
            }
          )
        }
      )
    }
  }

  openAlert() {
    Swal.fire({
      icon:'warning',
      title: '¿Está seguro que desea salir?',
      text: 'Al salir, todos los cambios que no hayan sido guardados se perderán.',
      showDenyButton: true,
      confirmButtonText: `Salir de todos modos.`,
      confirmButtonColor: '#3085d6',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/'])
      } 
    })
  }

  changeSituacion(){
    if(this.id != null){
      if(this.form.get('situacion')?.value === 'Rechazado'){
        this.form.get('observaciones')?.enable();
      }else{
        this.form.get('observaciones')?.disable();
      }
    }
  }


  seleccionarArchivo(event){
    this.archivoSeleccionado = event.target.files[0];
    console.log(this.archivoSeleccionado);
  }
  
}
