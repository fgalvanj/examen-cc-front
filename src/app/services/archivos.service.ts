import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Archivos } from '../modelo/archivos';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  private urlArchivos: String = "http://localhost:8081";

  constructor(private http: HttpClient) { }

  uploadArchivos(file: File, id){
    const formData: FormData = new FormData();
    formData.append('files', file);
    formData.append('id', id);

    return this.http.post(`${this.urlArchivos}/upload`, formData);
    
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get(`${this.urlArchivos}/files`);
  }

  getFileById(idProspecto: number): Observable<Archivos[]>{
    return this.http.get<Archivos[]>(this.urlArchivos + '/archivo-prospecto/' + idProspecto)
  }

}
