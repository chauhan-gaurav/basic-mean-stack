import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Post } from 'src/app/posts/post.module';
import { PostsService } from 'src/app/posts/posts.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1;
  userId: string;
  private postsSubcription: Subscription;
  isUserAuthenticated = false;
  private authListenerSub: Subscription;
  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSubcription = this.postsService.getPostUpdateListener().subscribe(
      (postData: {posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      }
    );
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(authenticated => {
      this.isUserAuthenticated = authenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangePage(event: PageEvent) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.postPerPage = event.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage );
  }

  ngOnDestroy() {
    this.postsSubcription.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    });
  }

}
