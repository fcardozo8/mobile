import { Component, OnInit } from '@angular/core';
import { TareaService } from '../service/tarea.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})


export class Tab4Page {
  formulario: FormGroup;

  constructor(private tareaService: TareaService,
 private router: Router, formBuilder: FormBuilder) {
    /*this.form = new FormGroup({
     id: new FormControl(0),
   titulo : new FormControl(""),
   fecha : new FormControl(new Date())
 })*/

 this.formulario = formBuilder.group<Tarea>({
   id:0,
   titulo : '',
   fecha:new Date(),
   obraSocial:''

 });
 console.log(this.formulario);
 this.formulario.get('titulo')?.addValidators([Validators.required, Validators.minLength(4), Validators.maxLength(40)]);

 this.formulario.get('fecha')?.addValidators([Validators.required]);

 this.formulario.get('obraSocial')?.addValidators(Validators.required);
 }

ngOnInit(): void {
}

show(producto: Tarea){
 this.formulario.patchValue(producto);
}

formSubmit(){
 if (this.formulario.valid){
   this.tareaService.addTarea(this.formulario.value).subscribe(()=>{
     this.router.navigate(['home']);
   });
 }else{
 }
}
}
