import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  blogs: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  currentPage: number = 0;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'content'];
  isLoading: boolean = false

  constructor(private router: Router, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.isLoading = true;
    this.firestore.collection('blogs').valueChanges().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false
    });
  }


  goToMyBlogs() {
    this.router.navigate(['/my-blogs']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
