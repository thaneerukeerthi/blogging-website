import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = ''

constructor(
  private afAuth: AngularFireAuth,
  private router: Router,
  private snackBar: MatSnackBar 
) {}

login() {
  this.afAuth.signInWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      console.log('Logged in:', userCredential);
      this.router.navigate(['/home']); 
    })
    .catch((error) => {
      console.error('Error:', error); 
      this.showSnackbar('Invalid login credentials', 'top'); 
    });
}

private showSnackbar(message: string, position: 'top'): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000, 
    verticalPosition: position 
    });
  }

}
