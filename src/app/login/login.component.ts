import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  decoded: any;
  showPassword = false;
  submitted = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {

    this.submitted = true;

    this.markFormGroupTouched(this.form);

    if(this.form.valid){
      
      const email = this.form.value.email;
      const password = this.form.value.password;

      if(email!=null && password!=null){
        this.authService.login(email, password).subscribe(
          _ => {
            this.router.navigate(['/list-clinic']);
          },
          error => {
            this.isLoginFailed = true;
            this.errorMessage = error.error.message;
          }
        );
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  reloadPage(): void {
    this.router.navigate(['/']); 
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}