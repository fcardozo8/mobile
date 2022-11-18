import { Component, OnInit } from '@angular/core';
import { TareaService } from '../service/tarea.service';
import { Tarea } from 'src/app/models/tarea';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit{

  tareas: Tarea[] = [];

  constructor(private tareaService: TareaService, private router: Router,public alertController: AlertController) {
    tareaService.getAllTareas().subscribe((resp: Tarea[])=>{
      this.tareas = resp;
    });
    console.log(this.tareas);
  }

  ngOnInit(): void {
    this.tareaService.getTareabyId(4).subscribe((Tarea)=>(this.tareas));
  }
  agregarTarea(nombre:string, edad:string, obraSocial:string, sexo:string, dni:string){
    console.log("Agregar");
    let TareaA= new Tarea(Tarea.utlimo_id,new Date(),nombre,obraSocial)
    this.tareaService.addTarea(TareaA).subscribe((Tarea)=>this.tareas.push(Tarea))
    }
  
  eliminarTarea(id:number){
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
      this.tareaService.deleteTarea(id).subscribe(()=>{
        this.tareaService.getAllTareas().subscribe((resp: Tarea[])=>{
          this.tareas = resp;
        })
      })
    }
  })
  
  }
  modificarTarea(id: number, titulox: string, obraSocial2:string){
      let elementIndex = this.tareas.findIndex((obj => obj.id == id));
      console.log(elementIndex);
      this.tareas[elementIndex].titulo = titulox;
      this.tareas[elementIndex].obraSocial=obraSocial2;
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
            

              this.modificarTarea(id,titulo,value);
              obraSocial=value
              let TareaM2= new Tarea(id,new Date(),titulo,obraSocial)
              this.tareaService.updateTarea(id,TareaM2).subscribe(()=>{
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
    
  async modificar2(id:number , titulo: string, obraSocial:string,dni:string,sexo:string,edad:string){
    const alert = await this.alertController.create({
      header: "Nombre y Apellido",
      message: "Introduce el nombre del tarea",
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
            this.modificarTarea(id,placeholder.result,obraSocial);
            titulo=placeholder.result
            let TareaM= new Tarea(id,new Date(),titulo,obraSocial)
            this.tareaService.updateTarea(id,TareaM).subscribe(()=>{
            } )
          }
        },
      ],
    });

    await alert.present();
  }
}
