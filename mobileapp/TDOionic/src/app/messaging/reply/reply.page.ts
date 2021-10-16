import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Messaging } from 'src/Shared/messaging.model';
import { StudentServiceService } from 'src/Shared/student-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {
  message: any = <any>{};
  replymessage: any = <any>{};
  name: any;

  constructor( private service: StudentServiceService,
    public alertController: AlertController,
    private modalCtrl: ModalController) { }
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
    this.getmessagereply();
    console.log(this.message)
    console.log(this.name)
  }

  async reply(){
   this.replymessage.ReceiverId = await this.message.senderId;
  this.replymessage.SenderId = await this.message.receiverId;
  this.replymessage.TutorId = await this.message.tutorId;
  this.replymessage.StudentId = await this.message.studentId;
  console.log(this.replymessage);
  this.service.createmessage(this.replymessage).subscribe((result) => {
    Swal.fire('Saved!', result.message, 'success');
  },(error) => {
    Swal.fire('Error!', error.error, 'error');
  });


  }

  close() {
    this.modalCtrl.dismiss();
  }

  async getmessagereply(){
    this.message = await this.service.messagereply;
    this.name = this.replymessage.ReceiverId;
  }

  
}
