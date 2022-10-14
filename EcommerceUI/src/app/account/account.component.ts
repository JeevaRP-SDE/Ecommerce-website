import { AdmindashboardComponent } from './../admindashboard/admindashboard.component';
import { Cart, Details, User } from './../models/models';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../services/utility.service';
import { Product, Review } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { AdminAddComponent } from '../admin-add/admin-add.component';
import { AdminComponent } from '../admin/admin.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit
 {



  view: 'grid' | 'list' = 'list';
  imageIndex: number = 1;
  product!: Product;

  showError = false;
  reviewSaved = false;
  otherReviews: Review[] = [];
Details: Details ={
  id: 0,
  firstName: '',
   lastName:  '',
   email: '',
   address: '',
   mobile: '',
   password: '',
  createdAt: '',
  modifiedAt:  ''

}

  currentDate = new Date();
  id:number=0;

   firstName:string= '';
   lastName:string=  '';
   email:string=  '';
   address:string= '';
   mobile:string=  '';
   password:string=  '';

  createdAt:string=  '';
  modifiedAt:string=  '';

  usersPreviousCarts: Cart[] = [];
checkid: number=0;

  constructor(private http: HttpClient,
    public utilityService: UtilityService,
    private navigationService: NavigationService) { }

  ngOnInit(): void {



    let userid = this.utilityService.getUser().id;
    let firstName=this.utilityService.getUser().firstName;
    let lastName=this.utilityService.getUser().lastName;
    let email=this.utilityService.getUser().email;
    let address=this.utilityService.getUser().address;
    let mobile=this.utilityService.getUser().mobile;
    let createdAt=this.utilityService.getUser().createdAt;
    let modifiedAt=this.utilityService.getUser().modifiedAt;


    this.Details.id=userid;
    //jeeva is admin id need check
    this.checkid=userid;
    console.log(this.checkid);
    this.Details.firstName=firstName;
    this.Details.lastName=lastName;
    this.Details.email=email;
    this.Details.address=address;
    this.Details.mobile=mobile;
    this.Details.createdAt=createdAt
    this.Details.modifiedAt=modifiedAt

    if (userid!=0) {
      console.table(this.Details)
    }
// jeeva test cart
    this.navigationService
    .getAllPreviousCarts(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.usersPreviousCarts = res;
      console.table(res)
      console.log(res)
    });



  }

   refresh(){
    window.location.reload();
    }

  //jeeva previous

  // this.navigationService
  // .getAllPreviousCarts(this.utilityService.getUser().id)
  // .subscribe((res: any) => {
  //   this.usersPreviousCarts = res;
  // });

}
