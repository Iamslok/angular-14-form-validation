import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import Validation from './utils/validation';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  errormsg = {
    fullname:"err",
    username:"user"
  }
show: string[] = [];;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    var elt1= document.getElementById("fname");
    var elt2= document.getElementById("uname");
    elt1.style.color=""
    elt2.style.borderColor=""
    this.show= []
    this.submitted = true;
    if (this.form.invalid) {
      if( this.f['fullname'].errors?.required){
        this.show.push(this.errormsg.fullname)
      }
      if(this.f['username'].errors?.required){
        this.show.push(this.errormsg.username)
      }
      console.log(this.show)
      
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  
  check(data:any){
    var elt1= document.getElementById("fname");
    var elt2= document.getElementById("uname");
    if (this.form.invalid){
      if(this.f['fullname'].errors?.required && data == this.errormsg.fullname){
        elt1.style.color="green"
       }
       if(data == this.errormsg.username){
         elt2.style.borderColor="blue"
        }
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
