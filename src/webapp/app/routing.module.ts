import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './misc/404.component';
import { QuestionOverviewComponent } from './question/overview.component';
import { QuestionFormComponent } from './question/form.component';

/**
 * Application Routes
 */
const appRoutes: Routes = [
    { path: 'questions'   , component : QuestionOverviewComponent },
//    { path: 'hero/:id'     , component : HeroDetailComponent },
    { path: 'question/new', component : QuestionFormComponent     },
    { path: ''             , redirectTo: '/questions'             , pathMatch: 'full' },
    { path: '**'           , component : PageNotFoundComponent }
]

/**
 * Routing Module for navigation inside the application
 * 
 * @export
 * @class RoutingModule
 */
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {}