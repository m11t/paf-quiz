import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home.component';
import { RestrictedAreaGuard } from './../user/restricted-area.guard';
import { QuestionModule } from './../question/module';

const mainRoutes: Routes = [
    { 
        path: '', 
        component: MainComponent,
        canActivate: [RestrictedAreaGuard],
        children: [
            { path: 'home'    , component: HomeComponent },
            { path: 'question', loadChildren: () => QuestionModule },
            { path: ''        , redirectTo: 'home', pathMatch: 'full' }
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