import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  errorMessage:string;
  showSpinner =false;

  constructor(private authService: AuthService, private fb:FormBuilder, private router:Router, private tokenService:TokenService) { }

  ngOnInit(): void {
    this.init();
  }
init(){
  this.signupForm =this.fb.group({
    username:['', Validators.required],
    email:['',[Validators.email, Validators.required]],
    password:['', Validators.required]
  })
}

  signupUser() {
     // console.log(this.signupForm.value)
     this.showSpinner = true;
    this.authService.registerUser(this.signupForm.value).subscribe(data=>{
      console.log(data);
      this.tokenService.setToken(data.token);
      this.signupForm.reset();

      setTimeout(()=>{
        this.router.navigate(['streams']);
      }, 2000);
    }, err =>{
      // console.log(err);
      this.showSpinner =false;
      if(err.error.msg){
        this.errorMessage=err.error.msg[0].message;
      }
      if(err.error.message){
        this.errorMessage = err.error.message;
      }

    }
    );
  }

}
