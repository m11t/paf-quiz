import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { QuestionComponent } from './main.component';
import { QuestionOverviewComponent } from './overview.component';
import { QuestionFormComponent } from './form.component';
import { QuestionRoutingModule } from './routes';
import { RestrictedAreaGuard } from './../user/restricted-area.guard';

/**
 * Module for the question feature
 * 
 * @export
 * @class QuestionModule
 */
@NgModule({
    imports: [ 
        FormsModule,
        ClarityModule.forChild(),
        QuestionRoutingModule
    ],
    declarations: [ 
        QuestionComponent,
        QuestionOverviewComponent,
        QuestionFormComponent
    ],
    providers: [
        RestrictedAreaGuard
    ],
    exports: [
        QuestionComponent,
        QuestionOverviewComponent,
        QuestionFormComponent
    ]    
})
export class QuestionModule { }