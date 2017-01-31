import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';

import { RoutingModule } from './routing.module';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './misc/404.component';
import { QuestionOverviewComponent } from './question/overview.component';
import { QuestionFormComponent } from './question/form.component';

import { UserService } from './user/user.service';
import { MessageService } from './misc/message.service';

/**
 * Application Module
 * 
 * @export
 * @class AppModule
 */
@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule,
    JsonpModule,
    ClarityModule.forChild(),
    RoutingModule
  ],
  providers: [
    UserService,
    MessageService
  ],
  declarations: [ 
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    QuestionOverviewComponent,
    QuestionFormComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }