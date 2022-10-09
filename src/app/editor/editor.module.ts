import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReteModule } from 'rete-angular-render-plugin';

import { EditorComponent } from './editor.component';
import { NumberNgControl } from './controls/num.component';

@NgModule({
  declarations: [EditorComponent, NumberNgControl],
  imports: [CommonModule, ReteModule],
  exports: [EditorComponent, ReteModule],
})
export class EditorModule {}
