import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab8Page } from './tab8.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab8PageRoutingModule } from './tab8-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab8PageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [Tab8Page]
})
export class Tab8PageModule {}
