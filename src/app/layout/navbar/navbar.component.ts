import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, computed, inject, input, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  readonly cartService = inject(CartService)
  readonly authService = inject(AuthService)
  readonly wishlistService = inject(WishlistService)
  private readonly router = inject(Router)
  isLogin = input<boolean>(true)
  countNumber:Signal<number> = computed(()=>  this.cartService.cartNumber()   )
  wishListCount:Signal<number> = computed(()=>  this.wishlistService.wishListCount()   )

  ngOnInit(): void {

    this.cartService.getLoggedUserCart().subscribe(res=>{ 
      this.cartService.cartNumber.set(res.numOfCartItems);
    
    })

    this.wishlistService.getAllWishList().subscribe(res=>{ 
      
      this.wishlistService.wishListCount.set(res.count);
    
    })
    
    
  }


 

}
