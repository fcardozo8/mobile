import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(private modalctrl: ModalController) { }

  ngOnInit() {
  }

  async abrirModal() {
    const modal = await this.modalctrl.create({
      component: ModalInfoPage,
      cssClass: 'my-custom-modal-css',
      componentProps:{
        nombre: 'Franquito',
        pais: 'Argentina'
      }
    
    });
    await modal.present();
   }

   
  
}
