import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/Shared/student-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
myGroup:any[] =[];
studentId:any;

  constructor( private service: StudentServiceService,private http: HttpClient) { }

  ngOnInit() {
    this.studentId = localStorage.getItem('user');
   
     this.getgroup();
    
    console.log(this.myGroup)
  }

  async getgroup(){
    this.service.getGroup(this.studentId).subscribe((result) => {
      console.log(result);
      this.myGroup = result;
      console.log( this.myGroup)
    });
  }

 
  

}
