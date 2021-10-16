import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';
import { Messaging } from './messaging.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
url:any ="https://learn2codeapi.azurewebsites.net/api/Student/"
urlLogin:any ="https://learn2codeapi.azurewebsites.net/api/Login/"
student: Student = <Student>{};
messagereply: any = <any>{};
  constructor(private http: HttpClient,private _jwtHelper: JwtHelperService) { }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
 
    return token && !this._jwtHelper.isTokenExpired(token);
  }

  getStudent(userid):Observable<any>{
    
    return this.http.get(this.url+'Getstudent/'+userid);
  }

  getUni():Observable<any>{
    return this.http.get(this.url+'GetUniRegister');
  }
  getdegree(id):Observable<any>{
    return this.http.get(this.url+'GetDegreeRegister/'+ id);
  }
  getmodule(id):Observable<any>{
    return this.http.get(this.url+'GetModuleRegister/'+ id);
  }
  updateStudent(obj):Observable<any>{
    return this.http.put(this.url+'updatestudent',obj);
  }
  //messages
  getrecievedmessages(userid):Observable<any>{
   
    return this.http.get(this.url+'GetRecievedMessages/'+userid);
  }

  gettutor():Observable<any>{
    return this.http.get(this.url+'GetAllTutorsMessaging');
  }

  createmessage(obj):Observable<any>{
    return this.http.post(this.url+'CreateMessage',obj);
  }

  getGroup(UserId):Observable<any>{
    return this.http.get(this.url+'GetMyGroupSessionsIonic/'+UserId);
    
  }

  getIndividual(id):Observable<any>{
    return this.http.get(this.url+'GetMyBookings/'+id);
  }

  Login(obj):Observable<any>{
    return this.http.post(this.urlLogin+'Login/',obj);
  }

  delete(id):Observable<any>{
    return this.http.delete(this.url+'DeleteStudent/'+id);
  }
}

