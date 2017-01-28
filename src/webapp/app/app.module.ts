import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';

import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    JsonpModule,
    ClarityModule.forChild() 
  ],
  providers: [
    UserService,
    MessageService
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