import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit{

  title: string = '';
  content: string = '';
  status: boolean = false;
  userId: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    this.route.queryParams.subscribe(params => {
      const blogId = params['id'];
      if (blogId) {
        this.fetchBlog(blogId);
      }
    });
  }

  fetchBlog(blogId: string) {
    this.firestore.collection('blogs').doc(blogId).valueChanges().subscribe((blog: any) => {
      this.title = blog.title;
      this.content = blog.content;
      this.status = blog.status;
    });
  }

  saveBlog() {
    if (this.title && this.content) {
      if (this.userId) {
        const blog = {
          title: this.title,
          content: this.content,
          status: this.status,
          userId: this.userId
        };
        this.firestore.collection('blogs').add(blog).then(() => {
          this.router.navigate(['/my-blogs']);
        }).catch(error => {
          console.error('Error saving blog:', error);
        });
      }
    }
  }

  cancelBlog(){
    this.router.navigate(['/my-blogs'])
  }
}
