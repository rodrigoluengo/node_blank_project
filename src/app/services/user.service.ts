import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import {LocalStorageService} from 'angular-2-local-storage';

import {environment as env} from "../../environments/environment";



@Injectable()
export class UserService
{

  private static route: string = `${env.endpoint}/user`;
  private user: any;

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  )
  {
    this.user = this.localStorageService.get('user');
  }

  /**
   * POST
   * Save a new User
   * @param user
   */
  post(user): Observable<Response>
  {
    return this.http.post(UserService.route, user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error!.json()!.errors || 'Server error'));
  }

  /**
   * POST
   * Login
   * @param email
   * @param password
   * @returns {Observable<R>}
   */
  credential(credential): Observable<Response>
  {
    return this.http.post(UserService.route.concat('/credential'), credential)
      .map((res: Response) =>
      {
        // Get user
        this.user = res.json();

        // Store user
        this.localStorageService.set('user', this.user);

        // Return user
        return this.user;
      })
      .catch((error: any) => Observable.throw(error!.json()!.errors || 'Server error'));
  }

  /**
   * Verify if user is logged
   * @return boolean
   */
  isLogged(): boolean
  {
    if(this.user != null)
    {
      return true;
    }

    return false;
  }

  /**
   * Return token from User
   * @return string
   */
  token(): string
  {
    if(this.isLogged())
      return this.user.token;
    else
      return '';
  }

  logout()
  {
    this.localStorageService.remove('user');
  }

}
