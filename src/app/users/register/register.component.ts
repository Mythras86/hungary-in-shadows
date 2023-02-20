import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regUserForm!: FormGroup;

  constructor(
    public authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.regUserForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'userEmail': new FormControl(null, Validators.required),
      'userPass': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    var form = this.regUserForm;
    if (form.invalid) {
      return;
    }
    this.authService.registerUser(form.value.userName, form.value.userEmail, form.value.userPass);
  }

}
