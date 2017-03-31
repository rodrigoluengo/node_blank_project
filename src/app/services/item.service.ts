import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import {environment as env} from "../../environments/environment";

@Injectable()
export class ItemService
{

  private static route: string = `${env.endpoint}/item`;

  constructor(private http: Http){}

  /**
   * POST
   * Save a new Item
   * @param item
   */
  post(item): Observable<Response>
  {
    return this.http.post(ItemService.route, item)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error!.json()!.errors || 'Server error'));
  }

}
