import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { StudentServiceService } from 'src/Shared/student-service.service';
import { Student } from 'src/Shared/student.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  student: any = {};
  uniList: any = [];
  degreelist: any =[];
  Modulelist: any =[];
  uniId:number;
  degreeId:number;
  update:any={};
 
  constructor(
    private service: StudentServiceService,
    public alertController: AlertController,
    private modalCtrl: ModalController
  ) {
    modalCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      message: 'Profile updated',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  ngOnInit() {
    this.student = this.service.student;
    this.getuni();
   
  }

  close() {
    this.modalCtrl.dismiss();
  }

  selectuni(event) {
    this.uniId = event;
    console.log(this.uniId);
    this.Getdegree();
  }
  selecdegree(event) {
    this.degreeId = event;
    console.log(this.degreeId);
    this.selectModule();
  }
  Getdegree(){
    this.service.getdegree(this.uniId).subscribe((result) => {
      this.degreelist = result;
      console.log(result);
    });
  }

  selectModule(){
    this.service.getmodule(this.degreeId).subscribe((result) => {
      this.Modulelist = result;
      console.log(result);
    });
  }

  getuni() {
    this.service.getUni().subscribe((result) => {
      this.uniList = result;
      console.log(result);
    });
  }

  updatestudent(){
    console.log(this.student.ModuleId)
    
   this.update.StudentId = this.student.id;
   this.update.StudentName = this.student.studentName;
   this.update.StudentSurname = this.student.studentSurname;
   this.update.StudentCell = this.student.studentCell;
   this.update.UserName = this.student.identity.userName;
   this.update.Email = this.student.identity.email;
   this.update.ModuleId = this.student.ModuleId;
   this.update.UserId = this.student.userId;
    
    
    this.service.updateStudent(this.update).subscribe((res) => {
      console.log(res)
      Swal.fire('Saved!', res.message, 'success');
  },(error) => {
    
    Swal.fire('Error!', error.error, 'error');
  }
  );
}
}
