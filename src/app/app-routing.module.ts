import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'',redirectTo:'/home',pathMatch:'full' },
  { path:'home',component:HomeComponent,data:{ title:'Home' } },
 // { path:'home/:countryId',component:HomeComponent,data:{ title:'Home' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
