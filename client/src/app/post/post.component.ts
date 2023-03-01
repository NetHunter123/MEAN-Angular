import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$!: Observable<any>;
  login: any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem('user') || '{}')?.login;
    }
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.authService?.getPostById(params['id']);
      })
    );
  }
  deletePost(id:any) {
    this.authService.deletePost(id).subscribe((data:any) => {
      if (!data.success) {
        this._flashMessagesService.show('Post not deleted', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else {
        this._flashMessagesService.show('Post not deleted', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      }
    });
  }
}
