import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import * as moment from 'moment';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  socket:any;

  user:any;
  notifications = [];
  constructor(private tokenService:TokenService, private usersService: UsersService) {
    this.socket =io('http://localhost:3000');
   }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    // console.log(this.user);
    this.getUser();
    this.socket.on('refreshPage',()=>{
      this.getUser();
    });
  }
  getUser(){
    this.usersService.GetUserById(this.user._id).subscribe(data =>{
      console.log(data.result.notifications)
      this.notifications = data.result.notifications.reverse();
    })
  }
  TimeFromNow(time){
    return moment(time).fromNow();
  }
  markNotification(data){
    // console.log(data)
    this.usersService.MarkNotification(data._id).subscribe(data=>{
     this.socket.emit('refresh',{});
    })
  }
  deleteNotification(data){
    // console.log(data)
    this.usersService.MarkNotification(data._id, true).subscribe(data=>{
      this.socket.emit('refresh',{});
     })
  }

}
