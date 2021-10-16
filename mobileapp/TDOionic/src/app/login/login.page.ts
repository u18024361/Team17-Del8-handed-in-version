import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../login/modal/modal.page';
import { AlertController } from '@ionic/angular';
import { StudentServiceService } from 'src/Shared/student-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
Login:any={};
  constructor(public modalController: ModalController,public alertController: AlertController,
    private service: StudentServiceService,private _router: Router, private _route: ActivatedRoute) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      
      message: 'Email or Password is incorrect',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  

  ngOnInit() {
    localStorage.clear();
  }

  Loginn(){
    this.service.Login(this.Login).subscribe((res) => {
      if(res.type == "Student"){
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", res.id);
        console.log(res)
        //this._router.navigate([this._returnUrl]);
        this._router.navigate(['/Home']);
        Swal.fire('Logged in!');
      }
      else if(res.type == "Admin"){
        Swal.fire({
          icon: 'error',
          text: 'The app is only for students',
         
        })
      }
     
  },(error) => {
    
    Swal.fire('Error!', error.error, 'error');
  }
  );
  }

}
