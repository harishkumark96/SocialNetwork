import { UsersService } from '../../services/users.service'
import { TokenService } from '../../services/token.service'
import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client'

const URL = 'http://localhost:3000/api/chatapp/upload-image';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });
  selectedFile:any;
  user:any;
  images= [];
  socket: any;

  constructor(private usersService: UsersService, private tokenService:TokenService) {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit(): void {
    this.user = this.tokenService.getPayload();
    this.GetUsers()
    this.socket.on('refreshPage',()=>{
      this.GetUsers()
    })
  }
  GetUsers(){
    // console.log(this.user._id + 'userid called')
    this.usersService.GetUserById(this.user._id).subscribe((data)=>{
      this.images = data.result.images
     },error=>{
       console.log(error)
     })
  }
  OnFileSelected(event){
    const file: File = event[0];
    this.readAsBase64(file).then((result)=>{
      this.selectedFile = result
    }).catch((error)=>{
      console.error(error)
    })
  }
  upload(){
    // console.log(this.selectedFile)
    if(this.selectedFile){
      this.usersService.AddImage(this.selectedFile).subscribe(
          (data)=>{
            this.socket.emit('refresh',{});
        const filePath = <HTMLInputElement>document.getElementById('filePath')
        filePath.value = '';

      },err=> console.log(err))
    }

  }
  setAsProfile(image){
    // console.log(image.imgId)
    this.usersService.SetDefaultImage(image.imgId, image.imgVersion).subscribe(data=>{
      this.socket.emit('refresh',{});
    },
    err => console.log(err))
  }
  readAsBase64(file):Promise<any>  {
    const reader = new FileReader()
    const fileValue = new Promise((resolve, reject)=>{
      reader.addEventListener('load', ()=>{
        // console.log('result is' + reader.result)
        resolve(reader.result)
      });
      reader.addEventListener('error', (event)=>{
        reject(event);
      })
      reader.readAsDataURL(file);
    })
    return fileValue
  }

}
