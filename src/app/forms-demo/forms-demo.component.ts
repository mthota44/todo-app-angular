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

    // 1. FORM CONTROL
    emailControl = new FormControl('test@example.com', [Validators.required, Validators.email]);

    showFormControl() {
        console.log('--- FORM CONTROL DEMO ---');
        console.log('Value:', this.emailControl.value);
        console.log('Valid:', this.emailControl.valid);
        console.log('Dirty (User changed value?):', this.emailControl.dirty);
        console.log('Touched (User blurred field?):', this.emailControl.touched);
        console.log('Full Control Object:', this.emailControl);
    }

    updateControl() {
        this.emailControl.setValue('updated@example.com');
    }

    // 2. FORM GROUP
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

    submitLogin() {
        console.log('--- FORM GROUP DEMO ---');
        console.log('Form Value (JSON):', this.loginForm.value);
        console.log('Is Form Valid?', this.loginForm.valid);

        const userControl = this.loginForm.get('username');
        console.log('Username control errors:', userControl?.errors);

        console.log('Full Form Group Object:', this.loginForm);
    }

    // 3. FORM BUILDER
    private fb = inject(FormBuilder);

    userProfileForm = this.fb.group({
        firstName: ['John'],
        lastName: ['Doe', Validators.required],
        address: this.fb.group({
            street: [''],
            city: ['']
        })
    });

    submitProfile() {
        console.log('--- FORM BUILDER DEMO ---');
        console.log('Profile Value:', this.userProfileForm.value);
        console.log('Full Builder Form Object:', this.userProfileForm);
    }

    // 4. TEMPLATE DRIVEN FORMS (ngModel)
    favoriteColor: string = 'Blue';

    logTemplateDriven() {
        console.log('--- TEMPLATE DRIVEN DEMO ---');
        console.log('Favorite Color (in TS):', this.favoriteColor);
    }

}
