import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(private router: Router, private userService: UserService) { }

  canActivate() : boolean
  {
    if(this.userService.isLogged())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
