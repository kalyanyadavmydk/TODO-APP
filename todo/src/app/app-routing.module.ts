import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'create',component:CreateTaskComponent,canActivate:[AuthGuard]},
  {path:'display',component: ListTasksComponent ,canActivate:[AuthGuard]},
  {path:'editTask/:taskId',component:CreateTaskComponent ,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
