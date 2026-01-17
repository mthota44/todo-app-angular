import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'todo', component: TodoComponent },
    { path: '', redirectTo: '/signin', pathMatch: 'full' }
];
