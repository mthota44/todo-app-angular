import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-forms-demo',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './forms-demo.component.html',
    styleUrls: ['./forms-demo.component.css']
})
export class FormsDemoComponent {

    // =================================================================================
    // 1. FORM CONTROL
    // Concept: Tracks the value and validation status of an individual form control (input).
    // It is the most basic building block of Angular forms.
    // =================================================================================

    // Creating a single control for an email with a default value 'test@example.com'
    // YES! We can add validators to a single control too.
    emailControl = new FormControl('test@example.com', [Validators.required, Validators.email]);

    showFormControl() {
        console.log('--- FORM CONTROL DEMO ---');
        console.log('Value:', this.emailControl.value);
        console.log('Valid:', this.emailControl.valid);
        console.log('Dirty (User changed value?):', this.emailControl.dirty);
        console.log('Touched (User blurred field?):', this.emailControl.touched);
        console.log('Full Control Object:', this.emailControl); // Inspect prototype in console
    }

    updateControl() {
        // We can set value explicitly
        this.emailControl.setValue('updated@example.com');
    }


    // =================================================================================
    // 2. FORM GROUP
    // Concept: Tracks the same value/status for a COLLECTION of form controls.
    // Useful for grouping related data, like an address or a login form.
    // If one control is invalid, the whole group is invalid.
    // =================================================================================

    loginForm = new FormGroup({
        // We can add validators here (e.g., Required)
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    submitLogin() {
        console.log('--- FORM GROUP DEMO ---');
        console.log('Form Value (JSON):', this.loginForm.value);
        console.log('Is Form Valid?', this.loginForm.valid);

        // Accessing individual controls within the group
        const userControl = this.loginForm.get('username');
        console.log('Username control errors:', userControl?.errors); // null if valid

        console.log('Full Form Group Object:', this.loginForm);
    }


    // =================================================================================
    // 3. FORM BUILDER
    // Concept: Syntactic sugar (a shortcut) to create FormGroups and FormControls easily.
    // Instead of saying "new FormControl()", "new FormGroup()", we use the builder.
    // =================================================================================

    private fb = inject(FormBuilder);

    userProfileForm = this.fb.group({
        firstName: ['John'], // Array syntax: [defaultValue, validators]
        lastName: ['Doe', Validators.required],
        address: this.fb.group({ // Nested Group!
            street: [''],
            city: ['']
        })
    });

    submitProfile() {
        console.log('--- FORM BUILDER DEMO ---');
        console.log('Profile Value:', this.userProfileForm.value);
        // Note: If a field is disabled, .value might exclude it. use .getRawValue() to include disabled fields.

        console.log('Full Builder Form Object:', this.userProfileForm);
    }

    // =================================================================================
    // 4. TEMPLATE DRIVEN FORMS (ngModel)
    // Concept: Simple, two-way binding. Data flows from TS to HTML and back automatically.
    // Great for simple inputs, but harder to test and scale than Reactive Forms.
    // =================================================================================

    favoriteColor: string = 'Blue';

    logTemplateDriven() {
        console.log('--- TEMPLATE DRIVEN DEMO ---');
        console.log('Favorite Color (in TS):', this.favoriteColor);
    }

}
