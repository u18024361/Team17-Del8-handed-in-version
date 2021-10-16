import { Component, OnInit } from '@angular/core';
import { ReplyPage } from '../messaging/reply/reply.page';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Messaging } from 'src/Shared/messaging.model';
import { StudentServiceService } from 'src/Shared/student-service.service';
import { CreateMessageComponent } from './create-message/create-message.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit {
Messages:Messaging[] =[];
id:any;



  constructor(public modalController: ModalController,public alertController: AlertController,private service: StudentServiceService) { }

  async presentModal(item) {
    this.service.messagereply = item as Messaging;
    console.log(this.service.messagereply)
    const modal = await this.modalController.create({
      component: ReplyPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: CreateMessageComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      
      message: 'Message sent',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  

  ngOnInit() {
    this.id = localStorage.getItem('user');
    console.log(this.id)
    this.getMessages();
    this.getid()
  }
  
  getMessages(){
      this.service.getrecievedmessages(this.id).subscribe((result) => {
        this.Messages = result as Messaging[];
        console.log(this.Messages);
      });
    
  }

   getid():void{
    
   
  }

}
