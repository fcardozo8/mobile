import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss']
})
export class Tab8Page {

  formulario: FormGroup;
  id: any;

  constructor(
    private service: PacienteService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
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
    this.formulario.get('id')?.addValidators(Validators.required);
    this.formulario.get('titulo')?.addValidators(Validators.required);
    this.formulario.get('fecha')?.addValidators([Validators.required]);

    this.formulario.get('obraSocial')?.addValidators(Validators.required);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any)=>{
      const id = params.id;
      this.service.getPacientebyId(id).subscribe((paciente: Paciente)=>{
        console.log('--------------'+paciente.fecha.toLocaleDateString);
        this.formulario.patchValue(paciente);
      });
    });
  }

  updatePaciente(){
    console.log('-------'+this.id+'-----'+ this.formulario);
		this.service.updatePaciente(this.id,this.formulario.value).subscribe(()=>{
      this.router.navigate(['/tabs/tab1']);
    });
	}

}
