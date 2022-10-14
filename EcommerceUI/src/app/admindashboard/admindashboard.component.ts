
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '../services/navigation.service';

import { Cart, Details, Product, Review } from '../models/models';
import { UtilityService } from '../services/utility.service';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  imageIndex: number = 1;


  showError = false;
  reviewSaved = false;
  otherReviews: Review[] = [];
Details:  Details ={
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


  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: {
      id: 1,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0,
    },
    imageName: '',
  };
myid:number=0;
myname:string='';

  constructor(  private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService) { }

  ngOnInit(): void {
    this.navigationService
    .getAllPreviousCarts(this.utilityService.getUser().id)
    .subscribe((res: any) => {
      this.usersPreviousCarts = res;
      console.table(res)
      console.log(res)
    });



    let userid = this.utilityService.getUser().id;
    let firstName=this.utilityService.getUser().firstName;
    let lastName=this.utilityService.getUser().lastName;
    let email=this.utilityService.getUser().email;
    let address=this.utilityService.getUser().address;
    let mobile=this.utilityService.getUser().mobile;
    this.myid=userid
    this.myname=firstName
    this.Details.firstName=firstName;
    this.Details.email=email;
    this.Details.address=address;
    this.Details.mobile=mobile;



}
fetchAllReviews() {
  this.otherReviews = [];
  this.navigationService
    .getAllReviewsOfProduct(this.product.id)
    .subscribe((res: any) => {
      for (let review of res) {
        this.otherReviews.push(review);
      }
    });
}

Click(){

  this.Details.firstName='';
  this.Details.email='';
  this.Details.address='';
  this.Details.mobile='';
}


}
