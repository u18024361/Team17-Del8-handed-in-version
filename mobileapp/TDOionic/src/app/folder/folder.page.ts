import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StudentServiceService } from 'src/Shared/student-service.service';
import { Student } from 'src/Shared/student.model';
import Swal from 'sweetalert2';
import { EditPage } from '../folder/edit/edit.page';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  student: Student = <Student>{};
  Letter:string;
  id:any =1;

  constructor(private activatedRoute: ActivatedRoute, private service: StudentServiceService,
    public modalController: ModalController,public alertController: AlertController,private _router: Router) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'are you sure you want to delete your profile',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.presentAlert();
          }
        }
      ]
    });

    await alert.present();
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      
      message: 'Profile deleted',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditPage,
      cssClass: 'my-custom-class'

      
    });
    modal.onDidDismiss().then(data => {
      console.log('dismissed');
      window.location.reload();
  });
    return await modal.present();
    
  }
  
  ngOnInit() {
    this.id = localStorage.getItem('user');
    console.log(this.id)
    this.GetStudent();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

  //to get student details
  GetStudent(){
      this.service.getStudent(this.id).subscribe((result) => {
        console.log(result);
        this.student = result as Student;
        this.service.student = this.student;
        let name = result
      this.Letter = name.studentName.charAt(0);

        console.log(this.service.student)
      });
  }
  
  delete(id){
    console.log(id)
    this.service.delete(id).subscribe((res) => {
      console.log(res)
      Swal.fire('Saved!', res.message, 'success');
      localStorage.clear();
      this._router.navigate(["/login"]);
  },(error) => {
    
    Swal.fire('Error!', error.error, 'error');
  }
  );
  }

}
