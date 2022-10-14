import { Category, NavigationItem, Update } from './../models/models';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { Product } from '../models/models';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})



export class AdminComponent implements OnInit {

  navigationList: NavigationItem[] = [];

  products: Product[] = [];
  valid: string= '';

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



updateProduct: Update={
  id: 0,
  price: 0,
  quantity:0
}

  constructor(private http: HttpClient,
    public utilityService: UtilityService,
    private navigationService: NavigationService) { }
  testString: string='';
  onChange(value: string) {
      this.testString = value === '' ? 'DEFAULT' : value;
    }
  ngOnInit(): void {
    this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory],
          });
        }
      }
    });


  }
  Product()
  {


      this.navigationService
        .putProduct(this.updateProduct.id,this.updateProduct.price,this.updateProduct.quantity)
        .subscribe({
          next: (res: any) => {
          this.products = res;
          if(this.updateProduct.id<1){
            this.valid = 'invalid'
          }
          else if(this.updateProduct.id>30 )
          {
            this.valid = 'invalid'
          }
          else{
            this.valid = 'valid'
          }

          },
          error: (response) => {
            console.log(response);

            this.valid = 'invalid';
          }

        });


  }

}
