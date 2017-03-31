import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";

import {environment as env} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable()
export class SectionService
{

  private static route: string = `${env.endpoint}/section`;

  private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.userService.token()}` });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private userService: UserService, private http: Http, private jsonp: Jsonp) { }

  post(section): Observable<any>
  {
    return this.http.post(SectionService.route, section, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error!.json()!.errors || 'Server error'));
  }

  get(params): Observable<any>
  {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('search', ''); // the user's search value
    urlSearchParams.set('action', 'opensearch');
    urlSearchParams.set('format', 'json');
    urlSearchParams.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(SectionService.route, urlSearchParams)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error!.json()!.errors || 'Server error'));
  }

}
