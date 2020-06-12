import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;
  ReactiveFormModul
  submitted = false;
  email:string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
     
  });

  }
  get f() { return this.resetForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.resetForm.invalid) {
          return;
      }else {
        this.email='',
     window.location.replace("login");
      }
  
  }

  
}
