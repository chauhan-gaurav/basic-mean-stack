import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from 'src/app/posts/post-create/post-create.component';
import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
 declarations: [
   PostCreateComponent,
   PostListComponent
 ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class PostsModule {

}
