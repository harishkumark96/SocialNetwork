import { TokenService } from './../../services/token.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import * as moment from 'moment';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client'


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user:any;
  notifications = [];
  imgId:any;
  imgVersion:any;
  socket: any;

  constructor(private tokenService:TokenService,private router:Router, private usersService: UsersService) {
    this.socket = io('http://localhost:3000')
  }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems,{
      coverTrigger:true,
      alignment: 'right'
    });
    this.getUser();
    this.socket.on('refreshPage',()=>{
      this.getUser()
    })
  }
  getUser(){
    this.usersService.GetUserById(this.user._id).subscribe((data)=>{
      this.imgId= data.result.picId;
      this.imgVersion= data.result.picVersion;
      this.notifications = data.result.notifications.reverse();
    })
  }
  logout(){
    this.tokenService.deleteToken();
    this.router.navigate(['']);
  }
  GoToHome(){
    this.router.navigate(['streams']);
  }
  TimeFromNow(time){
    return moment(time).fromNow();
  }
}
