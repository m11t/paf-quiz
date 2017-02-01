import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WrapperComponent } from './wrapper.component';
import { QuestionOverviewComponent } from './question/overview.component';
import { QuestionFormComponent } from './question/form.component';

import { RestrictedAreaGuard } from './user/restricted-area.guard';

const wrapperRoutes: Routes = [
    { 
        path: '', 
        component: WrapperComponent,
        canActivate: [RestrictedAreaGuard],
        children: [
            { path: ''         , redirectTo: "/questions", pathMatch: 'full' },
            { path: 'questions', component: QuestionOverviewComponent },
            { path: 'question' , component: QuestionFormComponent }
        ]
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(wrapperRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WrapperRoutingModule { }