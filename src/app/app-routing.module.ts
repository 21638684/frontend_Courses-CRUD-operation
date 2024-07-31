import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './course/courses/courses.component';
import { AddComponent } from './course/add/add.component';

const routes: Routes = [
  {path: 'courses', component: CoursesComponent}, 
  { path: 'add', component: AddComponent }, 
  {path: '', redirectTo: '/courses', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
