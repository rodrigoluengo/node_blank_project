import {Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit
{

  constructor(private router: Router, private userService : UserService) { }

  ngOnInit()
  {
    if(this.userService.isLogged())
    {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(form: any)
  {
    this.userService.credential(form).subscribe(_=>{
      this.router.navigateByUrl('');
    })

  }

  logout()
  {
    this.userService.logout()
  }

}
