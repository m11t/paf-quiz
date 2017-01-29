import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { QuestionOverviewComponent } from './question/overview.component';

import { UserService } from './user/user.service';
import { MessageService } from './misc/message.service';

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
    LoginComponent,
    QuestionOverviewComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }