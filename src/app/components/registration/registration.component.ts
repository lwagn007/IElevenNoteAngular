import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private _form: FormBuilder, private _authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this._form.group({
      email: new FormControl,
      password: new FormControl,
      confirmPassword: new FormControl
    });
  }

  onSubmit() {
    this._authService
      .register(this.registerForm.value)
      .subscribe(() => this._authService.login(this.registerForm.value));
  }
}
