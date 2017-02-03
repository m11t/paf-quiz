import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from './misc/404.component';
import { MainComponent } from './main/main.component';
import { QuestionComponent } from './question/main.component';
import { QuestionFormComponent } from './question/form.component';
import { QuestionOverviewComponent } from './question/overview.component';

import { RestrictedAreaGuard } from './user/restricted-area.guard';

/**
 * Application Routes
 */
const appRoutes: Routes = [
    { path: 'login', component : LoginComponent },
    { path: '**'   , component : PageNotFoundComponent }
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
export class AppRoutingModule {}