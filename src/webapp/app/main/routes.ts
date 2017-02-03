import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { RestrictedAreaGuard } from './../user/restricted-area.guard';
import { QuestionModule } from './../question/module';

const mainRoutes: Routes = [
    { 
        path: '', 
        component: MainComponent,
        canActivate: [RestrictedAreaGuard],
        children: [
            { path: 'question', loadChildren: () => QuestionModule }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {}