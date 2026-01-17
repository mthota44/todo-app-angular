import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { NgIf, NgFor, NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // registration form
  private fb = inject(FormBuilder);
  userForm = this.fb.group({

    userInfo: this.fb.group({
      username: ['', Validators.required],
      age: [null, Validators.required],
      gender: ['', Validators.required],
      mobile: [
        '',
        [
          Validators.required,
          this.mobileNumberValidator
        ]
      ]
    }),

    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required]
    })
  });

  mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null; // required validator will handle empty case
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    return mobileRegex.test(value)
      ? null
      : { invalidMobile: true };

  }

  submitUserForm() {
    console.log('Complete FormGroup:', this.userForm);
    console.log('Form Value:', this.userForm.value);
  }
}
