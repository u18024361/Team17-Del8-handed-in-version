import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/Shared/student-service.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
})
export class IndividualComponent implements OnInit {
  myIndividual:any[] =[];
  studentId:any;
  constructor(private service: StudentServiceService) { }

  ngOnInit() {
    this.studentId = localStorage.getItem('user');
    this.getIndividual();
  }

  getIndividual(){
    console.log(this.studentId)
    this.service.getIndividual(this.studentId).subscribe((result) => {
      console.log(result);
      this.myIndividual = result;
      console.log( this.myIndividual)
    });
  }

}
