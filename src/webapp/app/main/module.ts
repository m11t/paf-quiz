import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { QuestionModule } from './../question/module';
import { MainRoutingModule } from './routes';

import { MainComponent } from './main.component';
import { HomeComponent } from './home.component';
import { QuizComponent } from './quiz.component';
import { StatComponent } from './stat.component';
import { RestrictedAreaGuard } from './../user/restricted-area.guard';

/**
 * Module for the main application page with its layout, navigation and content area
 * 
 * @export
 * @class MainModule
 */
@NgModule({
    imports: [
        CommonModule,
        ClarityModule.forChild(),
        MainRoutingModule
    ],
    declarations: [ 
        MainComponent,
        HomeComponent,
        QuizComponent,
        StatComponent
    ],
    exports: [
        MainComponent,
        HomeComponent,
        QuizComponent,
        StatComponent
    ]
})
export class MainModule { }