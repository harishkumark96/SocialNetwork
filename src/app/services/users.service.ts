import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASEURL ='http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
    GetAllUsers(): Observable<any>{
      return this.http.get(`${BASEURL}/users`);
    }

    // async GetAllUsers() {
    //   return await this.http.get(`${BASEURL}/users`);
    // }
    GetUserById(id): Observable<any>{
      return this.http.get(`${BASEURL}/user/${id}`);
    }
    GetUserByName(username): Observable<any>{
      return this.http.get(`${BASEURL}/username/${username}`);
    }


    FollowUser(userFollowed): Observable<any> {
      return this.http.post(`${BASEURL}/follow-user`,{
        userFollowed
      })
    }
    UnFollowUser(userFollowed): Observable<any> {
      return this.http.post(`${BASEURL}/unfollow-user`, {
        userFollowed
      });
    }
    MarkNotification(id, deleteValue?): Observable<any>{
      return this.http.post(`${BASEURL}/mark/${id}`,{
        id,
        deleteValue
      });
    }
    AddImage(image): Observable<any> {
      return this.http.post(`${BASEURL}/upload-image`,{
        image
      });
    }
    SetDefaultImage(imageId, imageVersion): Observable<any> {
      return this.http.get(`${BASEURL}/set-default-image/${imageId}/${imageVersion}`);
    }
}
