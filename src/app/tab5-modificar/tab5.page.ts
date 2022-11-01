import { Component, OnInit } from '@angular/core';
import { TareaService } from '../service/tarea.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from 'src/app/models/tarea';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  formulario: FormGroup;
  id: any;

  constructor(
    private service: TareaService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formulario = formBuilder.group<Tarea>({
      id:0,
      titulo : '',
      fecha:new Date(),
      obraSocial:'', 

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
      this.service.getTareabyId(id).subscribe((tarea: Tarea)=>{
        console.log('--------------'+tarea.fecha.toLocaleDateString);
        this.formulario.patchValue(tarea);
      });
    });
  }

  updateTarea(){
    console.log('-------'+this.id+'-----'+ this.formulario);
		this.service.updateTarea(this.id,this.formulario.value).subscribe(()=>{
      this.router.navigate(['/tabs/tab1']);
    });
	}

}
