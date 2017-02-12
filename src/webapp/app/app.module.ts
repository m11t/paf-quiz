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
import { AnswerService } from './answer/answer.service';
import { CategoryService } from './category/category.service';
import { MessageService } from './misc/message.service';
import { QuestionService } from './question/question.service';
import { ResultService } from './result/result.service';
import { UserService } from './user/user.service';

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
    AnswerService,
    CategoryService,
    MessageService,
    QuestionService,
    ResultService,
    UserService
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