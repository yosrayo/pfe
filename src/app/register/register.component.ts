import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  phone : string;
  city: string;
  country: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  registerForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  }
 get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }else {
          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.city = '';
          this.country = '';
          this.address = '';
          this.phone = '';
          this.password = '';
          this.confirmPassword = '';
          alert('SUCCESS!!');
        console.log(this.registerForm.value);
        window.location.replace("login");
        }
    
    }

    onReset() {
      this.submitted = false;
      this.registerForm.reset();
    }
}
