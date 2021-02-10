import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';

export class RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

 

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  
  
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submittedPressed = false;

constructor(private formBuilder: FormBuilder, private accountService:AccountService) {}

  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: [null, [Validators.required, Validators.minLength(8)]],
          confPassword: [null, [Validators.required]],
        },
        { validators: this.confPasswordMatchesValidator() }
      ),
    });

    // this.firstName.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
  }

  confPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('password').value !== control.get('confPassword').value
        ? { confPass: true }
        : null;
    };
  }

  submit(): void {
    this.submittedPressed = true;
    if (this.registerForm.invalid) {
      return;
    }

    const registerData: RegisterData = new RegisterData(
      this.firstName.value,
      this.lastName.value,
      this.email.value,
      this.password.value
    );
    // const registerData2: RegisterData = new RegisterData(
    //  this.registerForm.value.firstName,
    //   this.registerForm.value.lastName,
    //   this.registerForm.value.email,
    //   this.registerForm.value.passwords.password,
    //   this.registerForm.value.gender,
    // );
    // console.log(registerData2);
    this.accountService.register(registerData).subscribe(
      (response)=>{console.log(response)},
      ()=>{}
    );
    //console.log(registerData1);
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get passwords(): AbstractControl {
    return this.registerForm.get('passwords');
  }

  get password(): AbstractControl {
    return this.registerForm.get('passwords').get('password');
  }

  get confPassword(): AbstractControl {
    return this.registerForm.get('passwords').get('confPassword');
  }

  get gender(): AbstractControl{
    return this.gender.get('gender');
  }
}

