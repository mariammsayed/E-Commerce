import { CartService } from './../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Iwishlist } from '../../shared/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlistService = inject(WishlistService)
  toastrService = inject(ToastrService)
  cartService = inject(CartService)
  wishListCount:number = 0
  wishListProducts:WritableSignal<Iwishlist[]> = signal([])

  ngOnInit(): void {
    this.getAllWishList();
  }


  getAllWishList(): void {
    this.wishlistService.getAllWishList().subscribe(res=>{ 
      this.wishListCount = res.count
      this.wishListProducts.set(res.data)

     
      
      
    
    })
    
    
  }



  addToCart(id:string):void{
    this.cartService.addToCart(id).subscribe(res=>{ 
      this.toastrService.success( res.message , 'Exclusive');
    })
  }

  removeFromWishList(id:string):void{
    this.wishlistService.removeProductFromWishList(id).subscribe(res=>{ 
      this.toastrService.success( res.message , 'Exclusive');
      this.getAllWishList();
    })
  }





}
