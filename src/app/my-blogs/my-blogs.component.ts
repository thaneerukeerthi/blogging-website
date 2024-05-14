import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  myBlogs: any[] = [];

  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.fetchMyBlogs();
  }

  fetchMyBlogs() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.firestore.collection('blogs', ref => ref.where('userId', '==', user.uid)).snapshotChanges().subscribe(data => {
          this.myBlogs = data.map((blog: any) => {
            const id = blog.payload.doc.id;
            const data = blog.payload.doc.data();
            return { id, ...data, editMode: false, updatedTitle: data.title, updatedContent: data.content };
          });
        });
      }
    });
  }

  goToBlogForm() {
    this.router.navigate(['/blog-form']);
  }

  editBlog(blog: any) {
    blog.editMode = true;
  }

  deleteBlog(blog : any){
    console.log("blogssss", blog)
    this.firestore.collection('blogs').doc(blog.id).delete()

  }

  saveBlogChanges(blog: any) {
    this.firestore.collection('blogs').doc(blog.id).update({ title: blog.updatedTitle, content: blog.updatedContent })
      .then(() => {
        console.log('Blog updated successfully');
        blog.editMode = false; // Exit edit mode after successful update
      })
      .catch(error => {
        console.error('Error updating blog:', error);
      });
  }

  cancelEdit(blog: any) {
    blog.editMode = false;
  }

  logout(){
    this.router.navigate(['/login'])
  }

  back(){
    this.router.navigate(['/home'])
  }
}
