import { CookieService } from 'ngx-cookie-service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService:CookieService) { }

  setToken(token){
    this.cookieService.set('chat_token', token);
  }
  getToken(){
    return this.cookieService.get('chat_token')
  }
  deleteToken(){
    this.cookieService.delete('chat_token')
  }
  getPayload(){
    const token = this.getToken();
    let payload: any;
    if(token) {
      payload = token.split('.')[1];
      // console.log(window.atob(payload))
      payload = JSON.parse(window.atob(payload))
      // console.log(payload.data)
    }
    return payload.data;
  }
}
