import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({providedIn: 'root'})
export class PacienteService {
  pacientes!: Paciente[];
  nuevaPaciente = new Paciente(0,new Date,"","","","","");
  url: string = "http://localhost:3000/pacientes";

  constructor(public http: HttpClient) { }

  getAllPacientes( ):Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.url);


  }

  getPacientebyId(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(this.url+"/"+id); //"http://localhost:3000/pacientes/+3"
  }

  addPaciente(paciente: Paciente):Observable<any>{
    return this.http.post(this.url,paciente);
  }

  updatePaciente(id: number,paciente: Paciente):Observable<any>{
    console.log("SERVICIO");
    console.log("-------"+id+"-----"+paciente.titulo);
    return this.http.put(this.url + "/" + paciente.id, paciente);
  }

  deletePaciente(id: number):Observable<any>{
    return this.http.delete(this.url + "/"  + id);
  }
}
