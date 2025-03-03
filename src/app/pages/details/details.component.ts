import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Idetails } from '../../shared/interfaces/idetails';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly  productsService = inject(ProductsService)
    private readonly cartService = inject(CartService);
    private readonly toastrService = inject(ToastrService)
    private readonly wishlistService = inject(WishlistService)

  
  productCount:number = 1
  productDetails:Idetails = {} as Idetails; 
  prductId:string = ''
  wishListData: any[] = []


  ngOnInit(): void {
    this.wishlistService.getAllWishList().subscribe(res=>{
      this.wishListData = res.data.map((item:any)=>item._id)
    })
    this.activatedRoute.paramMap.subscribe({
      next:(params) => {
        this.prductId = params.get('id') as string
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

  addToCart(id:string){
    for (let index = 0; index <= this.productCount; index++) {
      this.cartService.addToCart(id).subscribe({
        next:res=>{
          console.log(res);
          
          this.cartService.cartNumber.set(res.numOfCartItems)
  
          
          
        },
        error:err=>{
          console.log(err);
          
        }
      })
      
    }
    this.toastrService.success( 'Product added to cart' , 'Exclusive');
  }


  addProductToWishList(id:string){

    this.wishlistService.addProductToWishList(id).subscribe({
      next:res=>{
        
        
          this.toastrService.success( res.message , 'Exclusive');
          this.wishlistService.wishListCount.set(res.data.length);
          localStorage.setItem('red','text-red-500');
          this.wishListData = res.data


          

          
        
      }
      
    })
    
  }



  removeproductFromWishList(id:string):void{
    this.wishlistService.removeProductFromWishList(id).subscribe(res=>{ 
      this.toastrService.success( res.message , 'Exclusive');
      this.wishListData = res.data
    })
  }

}
