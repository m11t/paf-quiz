import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { WrapperComponent } from './wrapper.component';
import { PageNotFoundComponent } from './misc/404.component';
import { QuestionOverviewComponent } from './question/overview.component';
import { QuestionFormComponent } from './question/form.component';

import { RestrictedAreaGuard } from './user/restricted-area.guard';

/**
 * Application Routes
 */
const appRoutes: Routes = [
    { path: ''            , component : WrapperComponent, canActivate: [RestrictedAreaGuard] },
    { path: 'login'       , component : LoginComponent },
//    { path: 'questions'   , component : QuestionOverviewComponent },
//    { path: 'hero/:id'     , component : HeroDetailComponent },
//    { path: 'question/new', component : QuestionFormComponent     },
//    { path: ''             , redirectTo: '/questions'             , pathMatch: 'full', canActivate: [RestrictedAreaGuard]},
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