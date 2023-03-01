import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts!: any[];
  // category?:any
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllPosts().subscribe(
      (posts) => (this.posts = posts),
      (err: any) => {},
      () => {
        for (let i = 0; i < this.posts.length; i++) {
          this.posts[i].text = this.posts[i].text.substring(0, 260);
        }
      }
    );
  }
}
