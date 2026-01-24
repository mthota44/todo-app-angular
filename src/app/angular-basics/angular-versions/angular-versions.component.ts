import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VersionFeatureDetail {
    title: string;
    description: string;
    codeExample?: {
        lang: string;
        content: string;
        label?: string;
    };
    comparison?: {
        beforeTitle: string;
        beforeCode: string;
        afterTitle: string;
        afterCode: string;
    };
}

interface VersionData {
    version: string;
    year: string;
    title: string;
    features: string[];
    color: string;
    details?: VersionFeatureDetail[];
}

@Component({
    selector: 'app-angular-versions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './angular-versions.component.html',
    styleUrls: ['./angular-versions.component.css']
})
export class AngularVersionsComponent {
    selectedVersion: VersionData | null = null;

    versions: VersionData[] = [
        {
            version: 'Angular 18+',
            year: '2024 - Present',
            title: 'The Modern Era',
            features: ['Zoneless Change Detection (Experimental)', 'Event Replay', 'Material 3 Default', 'New Control Flow Stable'],
            color: '#f44336',
            details: [
                {
                    title: "Zoneless Change Detection",
                    description: "Traditionally, Angular used a library called 'zone.js' to magically find out when to update the screen (e.g., after a click or HTTP request). While easy, it was heavy. Angular 18 allows apps to interpret changes via 'Signals' directly, removing the need for zone.js entirely. This makes apps faster and lighter."
                },
                {
                    title: "@defer (Deferrable Views)",
                    description: "This allows you to lazy-load specific chunks of your HTML template. For example, you can tell Angular: 'Don't load this heavy chart component until the user actually scrolls down to see it.'",
                    codeExample: {
                        lang: 'html',
                        content: `@defer (on viewport) {
  <heavy-chart />
} @placeholder {
  <p>Loading chart...</p>
}`
                    }
                }
            ]
        },
        {
            version: 'Angular 17',
            year: '2023',
            title: 'The Renaissance',
            features: ['New Built-in Control Flow (@if, @for)', 'Hydration (Stable)', 'New Branding'],
            color: '#e91e63',
            details: [
                {
                    title: "New Control Flow",
                    description: "Angular moved away from the structural directives (*ngIf, *ngFor) to a cleaner, built-in syntax that is part of the language itself. It's more intuitive and supports type-checking better.",
                    comparison: {
                        beforeTitle: "Old Way (*ngIf)",
                        beforeCode: `<div *ngIf="isLoggedIn; else loginTemplate">
  Welcome User!
</div>
<ng-template #loginTemplate>
  Please Login
</ng-template>`,
                        afterTitle: "New Way (@if)",
                        afterCode: `@if (isLoggedIn) {
  <div>Welcome User!</div>
} @else {
  <div>Please Login</div>
}`
                    }
                }
            ]
        },
        {
            version: 'Angular 16',
            year: '2023',
            title: 'Reactivity Revolution',
            features: ['Signals Introduced', 'Server-Side Rendering (SSR) Improvements'],
            color: '#9c27b0',
            details: [
                {
                    title: "Signals",
                    description: "Signals are a new way to handle state. Instead of just variables, a Signal is a wrapper around a value that notifies interested consumers when that value changes. It allows fine-grained reactivity.",
                    codeExample: {
                        lang: 'typescript',
                        content: `// Creating a signal
count = signal(0);

// Updating it
this.count.set(5);
this.count.update(value => value + 1);

// Reading it (it's a getter function)
console.log(this.count()); 

// Effect (React to changes automatically)
effect(() => {
  console.log('The count is now:', this.count());
});`
                    }
                }
            ]
        },
        {
            version: 'Angular 14',
            year: '2022',
            title: 'Standalone Era',
            features: ['Standalone Components (No NgModules required)', 'Typed Forms'],
            color: '#673ab7',
            details: [
                {
                    title: "Standalone Components vs NgModules",
                    description: "Before Angular 14, every component HAD to belong to an NgModule (like AppModule). It was like a mandatory 'club membership'. If you wanted to use a component, you had to declare it in the module.\n\nStandalone components are like 'freelancers'. They don't need a module. They specify their own dependencies directly. This reduces boilerplate code significantly and makes learning Angular much easier.",
                    comparison: {
                        beforeTitle: "The Old Way (NgModule)",
                        beforeCode: `// app.module.ts is MANDATORY
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule],
  bootstrap: [AppComponent]
})
export class AppModule {}`,
                        afterTitle: "The New Way (Standalone)",
                        afterCode: `// component.ts
@Component({
  standalone: true, // <-- The Magic Flag
  imports: [CommonModule], // Import what YOU need directly
  selector: 'app-root',
  template: '...'
})
export class AppComponent {}`
                    }
                },
                {
                    title: "Typed Forms",
                    description: "Before Angular 14, Reactive Forms were 'loosely typed'. TypeScript didn't know if 'email' was a string or a number inside the form group. Now, Forms are strictly typed, preventing silly mistakes.",
                    comparison: {
                        beforeTitle: "Untyped (Before)",
                        beforeCode: `const login = new FormGroup({
  email: new FormControl('')
});

// TS allows this, but it crashes at runtime! 😱
login.value.email = 12345; 
login.get('email').setValue({ complexBox: true });`,
                        afterTitle: "Typed (Now)",
                        afterCode: `const login = new FormGroup({
  email: new FormControl<string>('')
});

// TypeScript Error: Type 'number' is not assignable to type 'string'. 🛡️
login.controls.email.setValue(12345); // ❌ Red Squiggly Line!`
                    }
                }
            ]
        },
        {
            version: 'Angular 9',
            year: '2020',
            title: 'Ivy Compiler',
            features: ['Ivy Default Renderer', 'Smaller Bundle Sizes', 'Better Debugging'],
            color: '#3f51b5',
            details: [
                {
                    title: "The Ivy Compiler",
                    description: "Ivy was a complete rewrite of Angular's rendering engine. It's invisible to the average developer, but it made bundle sizes much smaller (Tree Shaking) and compilation faster. It also improved error messages, making them easier to understand."
                }
            ]
        },
        {
            version: 'Angular 2',
            year: '2016',
            title: 'The Rewrite',
            features: ['Complete Rewrite from AngularJS', 'Component-Based Architecture'],
            color: '#2196f3',
            details: [
                {
                    title: "The Big Rewrite",
                    description: "Angular 2 was a breaking change from AngularJS (v1). It moved from 'Controllers' and '$scope' to a 'Component-Based' architecture, similar to React. This modular approach is what modern web development looks like today."
                }
            ]
        },
        {
            version: 'AngularJS',
            year: '2010',
            title: 'The Origin',
            features: ['MVC Architecture', 'Two-Way Data Binding'],
            color: '#00bcd4',
            details: [
                {
                    title: "Two-Way Data Binding",
                    description: "The feature that made AngularJS famous. It automatically synchronized data between the model (JavaScript) and the view (HTML). If you typed in an input, the JS variable updated instantly, and vice versa.",
                    codeExample: {
                        lang: 'html',
                        content: `<!-- The magic of ng-model -->
<input ng-model="name">
<h1>Hello {{name}}!</h1>`
                    }
                }
            ]
        }
    ];

    openDetails(version: VersionData) {
        this.selectedVersion = version;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeDetails() {
        this.selectedVersion = null;
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}
