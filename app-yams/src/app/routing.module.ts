import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastriesComponent } from './pastries/pastries.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { PastrieSampleComponent } from './pastrie-sample/pastrie-sample.component';
import { CreatePastriesComponent } from './create-pastries/create-pastries.component';
import { PastrieDetailsComponent } from './pastrie-details/pastrie-details.component';
import { UpdatePastrieComponent } from './update-pastrie/update-pastrie.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'home', component: PastriesComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'register', component : RegisterComponent}, // redirect to `first-component`
  {path:'sample', component: PastrieSampleComponent},
  {path:'createPastrie', component: CreatePastriesComponent},
  { path: 'updatePastrie/:id', component: UpdatePastrieComponent },
  {path:'login', component:LoginComponent},
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
