import { AddCat } from './../models/models';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  valid: string= '';

  category: AddCat={
    Category: '',
    SubCategories: ''
  }

  constructor(private http: HttpClient,
    public utilityService: UtilityService,
    private navigationService: NavigationService) { }

  ngOnInit(): void {
  }
  AddCat(){
    this.navigationService
          .postCategory(this.category.Category,this.category.SubCategories)
          .subscribe({
            next: (res: any) => {
            this.category = res;
            this.valid = 'valid';
            },
            error: (response) => {
              console.log(response);

              this.valid = 'valid';
            }

          });



  }

}
