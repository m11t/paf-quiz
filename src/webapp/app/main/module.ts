import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { QuestionModule } from './../question/module';
import { MainRoutingModule } from './routes';

import { MainComponent } from './main.component';
import { RestrictedAreaGuard } from './../user/restricted-area.guard';

/**
 * Module for the main application page with its layout, navigation and content area
 * 
 * @export
 * @class MainModule
 */
@NgModule({
    imports: [
        ClarityModule.forChild(),
        MainRoutingModule
    ],
    declarations: [ 
        MainComponent
    ],
    exports: [
        MainComponent
    ]
})
export class MainModule { }