import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prospecto } from '../modelo/prospecto';

@Injectable()
export class ProspectoService {
  private url: string = 'http://localhost:8081';

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getProspectos(): Observable<Prospecto[]> {
    return this.http.get<Prospecto[]>(this.url + '/prospectos');
  }

  getProspectoById(id: number): Observable<Prospecto>{
    return this.http.get<Prospecto>(this.url + '/prospecto/' + id);
  }

  addProspectos(prospecto: Prospecto): Observable<Prospecto>{
    return this.http.post<Prospecto>(this.url + '/prospecto/add', prospecto, {headers: this.httpHeader});
  }

  updateProspecto(prospecto: Prospecto){
    return this.http.put(this.url + '/prospecto/update', prospecto, {headers: this.httpHeader});
  }
}
