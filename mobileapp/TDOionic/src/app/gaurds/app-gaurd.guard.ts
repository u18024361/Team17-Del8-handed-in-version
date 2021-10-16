import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentServiceService } from 'src/Shared/student-service.service';
@Injectable({
  providedIn: 'root'
})
export class AppGaurdGuard implements CanActivate {
  
    
  constructor(private Service: StudentServiceService, private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this.Service.isUserAuthenticated()) {
      return true;
    }
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
