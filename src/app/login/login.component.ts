import { Component, createPlatformFactory, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  responseStatus = true;
  submittedPressed = false;
  id:number;
  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private accountService:AccountService, 
    private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
    });
  }
  submit(){
    console.log("merge");
    if(this.loginForm.invalid){
      return;
    }
    this.accountService.login(this.loginForm.value).subscribe((response:any)=>{
      if (response.status==true){
      localStorage.setItem("token",response.id);
      this.router.navigate(['feed']);
      } 
    }); 
  }

  get email(){
    return this.loginForm.get("email");
  }
  get password(){
    return this.loginForm.get("password");
  }
}
