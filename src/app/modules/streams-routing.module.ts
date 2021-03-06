import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from '../components/comments/comments.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { PeopleComponent } from '../components/people/people.component';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ImagesComponent } from '../components/images/images.component';

const routes:Routes =[
  {
    path:'streams',
    component: StreamsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate:[AuthGuard]
  },{
    path : 'people',
    component: PeopleComponent,
    canActivate:[AuthGuard]
  },{
    path: 'people/following',
    component : FollowingComponent,
    canActivate:[AuthGuard]
  },{
    path: 'people/followers',
    component : FollowersComponent,
    canActivate:[AuthGuard]
  },{
    path: 'notifications',
    component: NotificationsComponent,
    canActivateChild : [AuthGuard]
  },
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivateChild : [AuthGuard]
  },{
    path: '**',
    redirectTo: '/streams'
  }
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class StreamsRoutingModule { }
