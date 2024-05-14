import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  async signUp() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.showSuccessMessage('Sign up successful!'); 
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
