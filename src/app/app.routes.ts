import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TodoComponent } from './todo/todo.component';
import { TodoInfoComponent } from './todo/components/todo-info/todo-info.component';
import { TodoArchiveComponent } from './todo/components/todo-archive/todo-archive.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    {
        path: 'todo',
        component: TodoComponent,
        children: [
            { path: 'info', component: TodoInfoComponent },
            { path: 'archive', component: TodoArchiveComponent }
        ]
    },
    { path: '', redirectTo: '/signin', pathMatch: 'full' }
];
