import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../models/paciente';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']
})


export class Tab7Page {
  formulario: FormGroup;

  constructor(private pacienteService: PacienteService,
 private router: Router, formBuilder: FormBuilder) {
    /*this.form = new FormGroup({
     id: new FormControl(0),
   titulo : new FormControl(""),
   fecha : new FormControl(new Date())
 })*/

 this.formulario = formBuilder.group<Paciente>({
   id:0,
   titulo : '',
   fecha:new Date(),
   obraSocial:'',
   sexo:'',
   edad:'',
   dni:''

 });
 console.log(this.formulario);
 this.formulario.get('titulo')?.addValidators([Validators.required, Validators.minLength(7), Validators.maxLength(70)]);

 this.formulario.get('fecha')?.addValidators([Validators.required]);

 this.formulario.get('obraSocial')?.addValidators(Validators.required);
 }

ngOnInit(): void {
}

show(producto: Paciente){
 this.formulario.patchValue(producto);
}

formSubmit(){
 if (this.formulario.valid){
   this.pacienteService.addPaciente(this.formulario.value).subscribe(()=>{
     this.router.navigate(['home']);
   });
 }else{
 }
}
}
