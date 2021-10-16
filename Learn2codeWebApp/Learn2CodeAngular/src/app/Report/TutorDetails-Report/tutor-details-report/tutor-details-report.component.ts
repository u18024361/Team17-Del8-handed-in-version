import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReportingService } from '../../Report resources/reporting.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-tutor-details-report',
  templateUrl: './tutor-details-report.component.html',
  styleUrls: ['./tutor-details-report.component.scss']
})
export class TutorDetailsReportComponent implements OnInit {

  //Pagination
  date:any;
  page1:number = 1;
  totalLength1:any;
  sentance:string="";
tutorList: any = [];

  constructor(
    private reportService: ReportingService,
    private router: Router,private datePipe: DatePipe
  ) { }

  
  ngOnInit(): void {
    this.getTutorDetails()
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }

  public logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/loginhomepage/login']);
  };

  getTutorDetails() {
    this.reportService.getTutorDetails().subscribe((result) => {
      this.tutorList = result; 
      this.totalLength1 = this.tutorList.length;
      console.log(this.tutorList);
    });
  }

  public DownloadPDF():void {
    var imgs = new Image();
  var src = "../.././assets/pics/HD logo.png";
  imgs.src = src;
    let data = document.getElementById('TutorDetailsData');
    this.date=new Date();
    let latest_date =this.datePipe.transform(this.date, 'dd-MM-yyyy');
   this.sentance = "Date generated:"+latest_date;
    html2canvas(data).then(canvas => {
        
        let fileWidth = 180;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        PDF.addImage(imgs, 'PNG', 10, 5, 25, 25)
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 15, 60, fileWidth, fileHeight)
        PDF.setFontSize(22);
        PDF.setFont(undefined, 'bold')
        PDF.text("Tutor details report",70,20);
        PDF.setFontSize(9);
        PDF.setFont(undefined, 'normal')
        PDF.text("Description: Table displays list of all emplyed tutors and their details",15,40);
        PDF.text("Generated by: Admin.",15,45);
        PDF.text(this.sentance,15,50);
        PDF.save('TutorDetailsReport.pdf');
    });     
  }

  public RedirectReportHome(){
    this.router.navigateByUrl('/report-home');
  }

}