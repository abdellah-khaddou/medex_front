import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router:Router,private route: ActivatedRoute ) { }
  redirectToenums(){

  }
  redirectTostatusVedeur(){

  }
  toRoot() {
    this.router.navigate(['/']);
  }
  tosignup() {
    this.router.navigate(['/signup']);
  }
  toLogin() {

    this.router.navigate(['/login']);
  }
  toRole() {

    this.router.navigate(['/dashboard/roles']);
  }

  toUsers() {

    this.router.navigate(['/dashboard/users']);
  }
  toRoseurces() {

    this.router.navigate(['/dashboard/resources']);
  }

  fromLogin(){
    let prevUrl = this.route.snapshot.queryParamMap.get('prevUrl') || '/dashboard';
    localStorage.setItem('prevUrl', prevUrl);

    this.router.navigateByUrl(prevUrl);
  }
  toYourPage(){
    let prevUrl = localStorage.getItem('prevUrl');
    this.router.navigateByUrl(prevUrl);
  }
  redirectToUsers(){
    this.router.navigate(['/dashboard/users']);
 }
  toAction(module,action,obj){
    this.router.navigate(['/dashboard/'+module+'/'+action+''],{ queryParams: { id: obj._id } });

  }
}
