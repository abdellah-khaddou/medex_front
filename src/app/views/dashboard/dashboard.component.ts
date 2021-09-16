import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent   {
      user;
      constructor(private currentUser:User){
          this.user= this.currentUser.getuser();

      }
     
}