import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserForm!: FormGroup

  constructor(
    public authservice:AuthService,
    ) { }

  ngOnInit(): void {
    this.loginUserForm = new FormGroup({
      'userEmail': new FormControl (null, Validators.required),
      'userPass': new FormControl (null, Validators.required),
    });
  }

  onLogin() {
    var form = this.loginUserForm;
    if (form.invalid) {
      return;
    }
    this.authservice.loginUser(form.value.userEmail, form.value.userPass);
  }

}
