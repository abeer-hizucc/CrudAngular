import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpParams} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry,tap } from 'rxjs/operators';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost:3000/products";
  public first :string="";
  public prev :string="";
  public next :string="";
  public last :string="";
  constructor(private httpClient:HttpClient) { }
  public getSendRequest(){
    
    return this.httpClient.get<Products[]>(
      this.REST_API_SERVER,
      {params: new HttpParams(
        {fromString:"_page=1&_limit=20"}),observe:"response"})
          .pipe(retry(3),catchError(this.handleError),
    
          tap(res => {
            const linkHeader = res.headers.get('Link');
            if(linkHeader){
              console.log("Link header is present");
              this.parseLinkHeader(linkHeader);
            }

          }));
  }
  public getSendRequestToUrl(url:string)
  {
    return this.httpClient.get<Products[]>(url,{observe:"response"}).pipe(retry(3),catchError(this.handleError),tap(res => {
      const linkHeader = res.headers.get('Link');
      if(linkHeader){
        console.log("Link header is present");
        this.parseLinkHeader(linkHeader);
      }
    }
      ));
  }
  handleError(error:HttpErrorResponse){
    let errorMessage = "Unknown error!";
    if(error.error instanceof ErrorEvent){
      //client-side error
      errorMessage = `Error: ${error.error.message}`;
    }else{
      //server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  parseLinkHeader(header: string){
    if(header.length == 0){
      return ;
    }
    let parts = header.split(',');
    var links:any = {};
    parts.forEach(p => {
      let section = p.split(';');
      let url = section[0].replace(/<(.*)>/,'$1').trim();
      let name = section[1].replace(/rel="(.*)"/,'$1').trim();
      links[name] = url;
    });
    this.first = links['first'];
    this.prev = links['prev'];
    this.next = links['next'];
    this.last = links['last'];

  }
}
