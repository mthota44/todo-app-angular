import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TodoComponent } from './todo/todo.component';
import { TodoInfoComponent } from './todo/components/todo-info/todo-info.component';
import { TodoArchiveComponent } from './todo/components/todo-archive/todo-archive.component';
import { Day5Component } from './day5/day5.component';
import { CommunicationParentComponent } from './communication/communication-parent/communication-parent.component';
import { authGuard } from './core/guards/auth.guard';

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
    { path: 'day5', component: Day5Component, canActivate: [authGuard] },
    { path: 'communication', component: CommunicationParentComponent },
    {
        path: 'modern-communication',
        loadComponent: () => import('./communication/modern-parent/modern-parent.component').then(m => m.ModernParentComponent)
    },
    {
        path: 'routes-demo',
        loadComponent: () => import('./routes-demo/routes-demo.component').then(m => m.RoutesDemoComponent),
        children: [
            {
                path: 'product/:id',
                loadComponent: () => import('./routes-demo/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            }
        ]
    },
    {
        path: 'lifecycle-hooks',
        loadComponent: () => import('./lifecycle-demo/lifecycle-demo.component').then(m => m.LifecycleDemoComponent)
    },
    {
        path: 'rxjs',
        loadComponent: () => import('./rxjs-demo/rxjs-demo.component').then(m => m.RxjsDemoComponent)
    },
    {
        path: 'angular-basics',
        children: [
            {
                path: '',
                loadComponent: () => import('./angular-basics/angular-basics.component').then(m => m.AngularBasicsComponent)
            },
            {
                path: 'versions',
                loadComponent: () => import('./angular-basics/angular-versions/angular-versions.component').then(m => m.AngularVersionsComponent)
            }
        ]
    },
    {
        path: 'forms-demo',
        loadComponent: () => import('./forms-demo/forms-demo.component').then(m => m.FormsDemoComponent)
    },
    {
        path: 'modules-demo',
        loadComponent: () => import('./modules-demo/modules-demo.component').then(m => m.ModulesDemoComponent)
    },
    {
        path: 'storage-demo',
        loadComponent: () => import('./storage-demo/storage-demo.component').then(m => m.StorageDemoComponent)
    },
    {
        path: 'third-party',
        loadComponent: () => import('./third-party-demo/third-party-demo.component').then(m => m.ThirdPartyDemoComponent)
    },
    { path: '', redirectTo: '/todo', pathMatch: 'prefix' }
];
