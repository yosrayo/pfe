import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message: FormGroup;
  ReactiveFormModul
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.message = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
   
  });

  }
  get f() { return this.message.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.message.invalid) {
        return;
    }

    // display form values on success
    alert('bien reçu');
    console.log(this.message.value);
} 
}
