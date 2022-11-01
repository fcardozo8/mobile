import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../service/paciente.service';
import { Paciente } from 'src/app/models/paciente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page  implements OnInit{

  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService, private router: Router,public alertController: AlertController) {
    pacienteService.getAllPacientes().subscribe((resp: Paciente[])=>{
      this.pacientes = resp;
    });
    console.log(this.pacientes);
  }

  ngOnInit(): void {
    this.pacienteService.getPacientebyId(4).subscribe((Paciente)=>(this.pacientes));
  }
  agregarPaciente(nombre:string, edad:string, obraSocial:string, sexo:string,dni:string){
    console.log("Agregar");
    let PacienteA= new Paciente(Paciente.utlimo_id,new Date(),nombre,obraSocial,sexo,edad,dni)
    this.pacienteService.addPaciente(PacienteA).subscribe((Paciente)=>this.pacientes.push(Paciente))
    }
  
  eliminarPaciente(id:number){
  console.log(id);
      const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong> text </strong> !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
          
        }, {
          text: 'Okay',
          role: 'Okay',
          handler: (blah) => {
            console.log('Confirm Okay');
          }
        }
        

      ]
      
      
    }).then((resp)=>{
    if (resp.isConnected){
      this.pacienteService.deletePaciente(id).subscribe(()=>{
        this.pacienteService.getAllPacientes().subscribe((resp: Paciente[])=>{
          this.pacientes = resp;
        })
      })
    }
  })
  
  }
  modificarPaciente(id: number, titulox: string, obraSocial2:string,sexo:string,edad_string,dni:string){
      let elementIndex = this.pacientes.findIndex((obj => obj.id == id));
      console.log(elementIndex);
      this.pacientes[elementIndex].titulo = titulox;
      this.pacientes[elementIndex].obraSocial=obraSocial2;
    }
  
  async prepararModificar(id:number , titulo: string, obraSocial:string, sexo:string,edad:string,dni:string){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Obra Social',
      inputs: [
        {
          name: 'result',
          type: 'radio',
          label: 'APOS',
          value: 'APOS',
          checked: true
        },
        {
          name: 'result',
          type: 'radio',
          label: 'SANCOR',
          value: 'SANCOR'
        },
        {
          name: 'result',
          type: 'radio',
          label: 'No Tiene O.S.',
          value: 'No Tiene O.S.'
        }
      ],
      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          
          text: 'Ok',
          handler: (value) => {  
            

              this.modificarPaciente(id,titulo,value,sexo,edad,dni);
              obraSocial=value
              let PacienteM2= new Paciente(id,new Date(),titulo,obraSocial,sexo,edad,dni)
              this.pacienteService.updatePaciente(id,PacienteM2).subscribe(()=>{
              } )
            console.log('Confirm Ok');
            this.modificar2(id,titulo,obraSocial,sexo,edad,dni);
            
          }
        }
      ]
      
    });
    await alert.present();
  }
    /*    
      
  */
    
  async modificar2(id:number , titulo: string, obraSocial:string,sexo:string,edad:string,dni:string){
    const alert = await this.alertController.create({
      header: "Nombre y Apellido",
      message: "Introduce el nombre del paciente",
      inputs:[
        {
          name: 'result',
          type: 'text',
          placeholder:'Titulo',
        }  
      ],   
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "cancel-t-button",
          handler: () => {},
        },
        {
          text: "Editar",
          role: "ok",
          cssClass: "add-t-button",
          handler: (placeholder) => {
            this.modificarPaciente(id,placeholder.result,obraSocial,sexo,edad,dni);
            titulo=placeholder.result
            let PacienteM= new Paciente(id,new Date(),titulo,obraSocial,sexo,edad,dni)
            this.pacienteService.updatePaciente(id,PacienteM).subscribe(()=>{
            } )
          }
        },
      ],
    });

    await alert.present();
  }
}
