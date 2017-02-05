import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';

import { AppRoutingModule } from './app.routes';
import { MainModule } from './main/module';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './misc/404.component';

import { RestrictedAreaGuard } from './user/restricted-area.guard';
import { UserService } from './user/user.service';
import { QuestionService } from './question/question.service';
import { CategoryService } from './question/category.service';
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
    MainModule,
    AppRoutingModule
  ],
  providers: [
    RestrictedAreaGuard,
    UserService,
    QuestionService,
    CategoryService,
    MessageService
  ],
  declarations: [ 
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }