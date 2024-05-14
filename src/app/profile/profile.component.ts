import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userEmail: string = '';
  
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  
  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userEmail = user.email ?? ''; 
      }
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
