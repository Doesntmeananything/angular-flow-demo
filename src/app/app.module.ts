import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { EditorModule } from './editor/editor.module';

@NgModule({
  declarations: [AppComponent, BackgroundComponent],
  imports: [BrowserModule, EditorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
