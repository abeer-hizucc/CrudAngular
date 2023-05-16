import { Component, OnInit, SimpleChange,Input } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subject } from 'rxjs';
import{takeUntil} from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Products } from '../products';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 products:Products[] |null = [];
 data:any = [];
 destroy$: Subject<boolean> = new Subject<boolean>();

constructor(private dataService:DataService) {console.log("Constructor made") }

ngOnInit() {

  this.dataService.getSendRequest().pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<Products[]>)=>{
    console.log(res);
    this.products = res.body;
  })  
}

ngOnDestroy(){
this.destroy$.next(true);
this.destroy$.unsubscribe();
}
public firstPage(){
this.products = [];
this.dataService.getSendRequestToUrl(this.dataService.first).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<Products[]>)=>{
  console.log(res);
  this.products = res.body;
})
}
public previousPage(){
this.products = [];
if(this.dataService.prev!==undefined && this.dataService.prev !==''){
  this.products = [];
  this.dataService.getSendRequestToUrl(this.dataService.prev).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<Products[]>)=>{
    console.log(res);
    this.products = res.body;
  });
} }
public nextPage(){
this.products = [];
if(this.dataService.next!==undefined && this.dataService.next !==''){
  this.products = [];
  this.dataService.getSendRequestToUrl(this.dataService.next).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<Products[]>)=>{
    console.log(res);
    this.products = res.body;
  });
}
}
public lastPage(){
this.products = [];
this.dataService.getSendRequestToUrl(this.dataService.last).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<Products[]>)=>{
  console.log(res);
  this.products = res.body  ;
});
}
}
