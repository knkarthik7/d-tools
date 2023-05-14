import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;
  marginCal = true
  unitPrice:number;
  unitCost:number;
  marginPercentage: number;
  constructor(private fb: FormBuilder) { }
  brands:any = ['Brand 1', 'Brand 2'];
  models:any = ['Model 1', 'Model 2'];
  ngOnInit(): void {
    this.productForm = this.fb.group({
      brand:['', Validators.required],
      model:['',Validators.required],
      partNumber:[''],
      description:[''],
      keywords:[''],
      unitPrice:[''],
      unitCost:[''],
      margin:['']
    })
  }
onSubmit(){

}
calculateMargin() {
  this.marginCal = true
  if (this.unitPrice && this.unitCost) {
    const marginAmount = this.unitPrice - this.unitCost;
    this.marginPercentage = (marginAmount / this.unitCost) * 100;
  } 
  // else if (this.unitPrice && this.marginPercentage) {
  //   // Calculate selling price
  //   const marginAmount = (this.marginPercentage / 100) * this.unitPrice;
  //   this.unitCost = this.unitPrice + marginAmount;
  // } 
  // else if (this.unitCost && this.marginPercentage) {
  //   // Calculate cost price
  //   const marginAmount = (this.marginPercentage / 100) * this.unitCost;
  //   this.unitPrice = this.unitCost - marginAmount;
  // }
   else {
    // Clear calculated values
    // this.unitCost = null;
    this.marginPercentage = null;
    // this.unitPrice = null;

  }
}
calculateUnitPrice(){
  this.marginCal = false;
  if (this.unitCost && this.marginPercentage) {
      // Calculate cost price
      const marginAmount = (this.marginPercentage / 100) * this.unitCost;
      this.unitPrice = this.unitCost - marginAmount;
    }
    else{
      this.unitPrice = null;
    }
}
}
