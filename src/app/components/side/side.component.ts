import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client'

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  socket:any;
  user:any;
  userData:any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('http://localhost:3000')
  }

  ngOnInit(): void {
    this.user =this.tokenService.getPayload();
    this.getUser();
    this.socket.on('refreshpage', ()=>{
      this.getUser();
    });

  }
  getUser(){
    this.usersService.GetUserById(this.user._id).subscribe((data)=>{
      this.userData = data.result;
    })
  }

}
