import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modules-demo',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modules-demo.component.html',
    styleUrls: ['./modules-demo.component.css']
})
export class ModulesDemoComponent {

    packages = [
        {
            name: '@angular/core',
            icon: '🧠',
            title: 'The Brain',
            description: 'The heart of Angular. Without this, nothing exists.',
            contains: ['@Component', '@Directive', '@Pipe', '@Injectable', 'Signals (signal, computed, effect)']
        },
        {
            name: '@angular/common',
            icon: '🛠️',
            title: 'The Essentials',
            description: 'Basic tools that every web app needs. It contains the "CommonModule".',
            contains: ['CommonModule', 'DatePipe, UpperCasePipe', 'NgClass, NgStyle']
        },
        {
            name: '@angular/forms',
            icon: '📝',
            title: 'The Paperwork',
            description: 'Everything involved in handling user input and validation.',
            contains: ['ReactiveFormsModule', 'FormsModule', 'Validators', 'FormBuilder']
        },
        {
            name: '@angular/router',
            icon: '🧭',
            title: 'The GPS',
            description: 'Handles navigation between different pages (views).',
            contains: ['RouterModule', 'RouterOutlet', 'RouterLink', 'ActivatedRoute']
        }
    ];

    modules = [
        {
            name: 'CommonModule',
            package: '@angular/common',
            analogy: 'The Swiss Army Knife',
            description: 'You import this to get the basic Angular superpowers in your standalone components.',
            tools: [
                { name: '*ngIf (@if)', desc: 'Show/Hide things' },
                { name: '*ngFor (@for)', desc: 'Loop through lists' },
                { name: 'Pipes', desc: 'Format text (Date, Currency, Json)' },
                { name: 'NgClass/NgStyle', desc: 'Dynamic styling' }
            ]
        },
        {
            name: 'ReactiveFormsModule',
            package: '@angular/forms',
            analogy: 'The Pro Form Tool',
            description: 'For complex, scalable forms. Logic lives in TypeScript (The Class).',
            tools: [
                { name: 'formControl', desc: 'Links a single input to TS' },
                { name: 'formGroup', desc: 'Links a group of inputs to TS' },
                { name: 'formControlName', desc: 'The connector directive' }
            ]
        },
        {
            name: 'FormsModule',
            package: '@angular/forms',
            analogy: 'The Easy Form Tool',
            description: 'For simple forms. Logic lives in HTML (The Template). Template-Driven.',
            tools: [
                { name: '[(ngModel)]', desc: 'Two-way binding (Banana in a box)' },
                { name: 'ngForm', desc: 'Auto-attaches to <form> tags' }
            ]
        },
        {
            name: 'RouterModule',
            package: '@angular/router',
            analogy: 'The Map System',
            description: 'Enables the application to be a Single Page Application (SPA).',
            tools: [
                { name: 'router-outlet', desc: 'Where the page loads' },
                { name: 'routerLink', desc: 'The new href' }
            ]
        }
    ];
}
