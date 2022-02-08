import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { TokenService } from 'src/app/services/token.service';
import { PostService } from 'src/app/services/post.service';


import _ from 'lodash';
import { Router } from '@angular/router';
import  io  from 'socket.io-client';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket:any;
  posts =[];
  user:any;

  constructor(private postService: PostService, private tokenService:TokenService, private router:Router) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    this.allPosts();
    this.socket.on('refreshPage', data=>{
      this.allPosts();
    })
  }

  allPosts() {
    this.postService.getAllPosts().subscribe(data =>{
      // console.log(data)
      this.posts = data.posts;
    },err=>{
      if(err.error.token === null) {
        this.tokenService.deleteToken();
        this.router.navigate(['']);
      }
    })
  }
  likePost(post) {
    this.postService.addLike(post).subscribe(data=>{
      console.log("post liked ack");
      this.socket.emit('refresh', {});
    },err=> console.log(err))
  }
  timeFromNow(time){
    return moment(time).fromNow();
  }
  checkInLikesArray(arr,username){
    return _.some(arr, 'username')
  }
  openCommentBox(post){
    this.router.navigate(['post', post._id]);
   }

}
