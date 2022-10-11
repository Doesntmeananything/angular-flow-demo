import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { EditorModule } from './editor/editor.module';

@NgModule({
  declarations: [AppComponent, BackgroundComponent],
  imports: [BrowserModule, EditorModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
