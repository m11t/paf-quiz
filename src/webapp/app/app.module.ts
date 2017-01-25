import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    JsonpModule,
    ClarityModule.forChild() 
  ],
  declarations: [ 
    AppComponent,
    LoginComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }