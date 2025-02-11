import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Idetails } from '../../shared/interfaces/idetails';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly  productsService = inject(ProductsService)
  productCount:number = 1
  productDetails:Idetails = {} as Idetails; 


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(params) => {
        this.productsService.getSpacificProduct(params.get('id')!).subscribe({
          next:(res) => {
            this.productDetails = res.data
            console.log(this.productDetails);
            
          },
          error:(err) => {
            console.log(err)
          }
        })
      }
    })
}

increment() {
  this.productCount++;
}

decrement() {
  if (this.productCount > 1) {
    this.productCount--;
  }
}

}
