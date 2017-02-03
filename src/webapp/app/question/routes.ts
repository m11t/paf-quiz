import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionComponent } from './main.component';
import { QuestionFormComponent } from './form.component';
import { QuestionOverviewComponent } from './overview.component';

const questionRoutes: Routes = [
    { 
        path: '', 
        component: QuestionComponent,
        children: [
            { path: 'list', component: QuestionOverviewComponent},
            { path: 'new' , component: QuestionFormComponent},
            { path: ''    , redirectTo: 'list', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(questionRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class QuestionRoutingModule {}