import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from 'src/app/posts/post-list/post-list.component';
import { PostCreateComponent } from 'src/app/posts/post-create/post-create.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  { path: '' , component: PostListComponent },
  { path: 'create' , component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id' , component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth' , loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
