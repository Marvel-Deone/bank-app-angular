import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatError } from '@angular/material/form-field';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  public signupForm?: any
  public hide:boolean = false
  public hideConfirm:boolean = false
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      emailFormControl: ['', [Validators.required, Validators.email]],
      usernameFormControl: ['Folagbade', [Validators.required, Validators.minLength(2)]],
      passwordFormControl: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      confirmPasswordFormControl: ['', Validators.required,],
    },
    {
      validators: this.pwrdMatch('passwordFormControl', 'confirmPasswordFormControl')
    });
  }

  get signup (){return this.signupForm.controls};

  pwrdMatch(controlName: string, matchingControlName:string) {
    return (formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl= formGroup.controls[matchingControlName];
      if (matchingControl.errors  && !matchingControl.errors?.['pwrdMatch']) {
         return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({pwrdMatch:true});
      }else {
        matchingControl.setErrors(null)
      }
    }
  }

  matcher = new MyErrorStateMatcher();
  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    console.log(form.value);
    
  }

}
