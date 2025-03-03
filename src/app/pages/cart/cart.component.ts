import { Router, RouterLink } from '@angular/router';
import { Icart } from '../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  

  cartDetails: Icart = {} as Icart;
  isFull: boolean = false;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.isFull = this.cartDetails.products.length > 0;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItem(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#000000',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your item has been deleted.',
              icon: 'success',
            });
          }
        });
        this.cartService.deleteItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.getCartData();
            this.toastrService.success(
              'Item has been deleted from cart',
              'Exclusive'
            );

            this.cartService.cartNumber.set(res.numOfCartItems);

            if (res.numOfCartItems == 0) {
              this.isFull = false;
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  increment(id: string, count: number) {
    this.cartService.updateItemCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.getCartData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  decrement(id: string, count: number) {
    this.cartService.updateItemCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.getCartData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to clear your cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cleared!',
          text: 'Your cart has been cleared.',
          icon: 'success',
        });
        this.isFull = false;
        this.cartService.clearUserCart().subscribe({
          next: (res) => {
            console.log(res);
            this.getCartData();
            this.toastrService.success('Cart has been cleared', 'Exclusive');
            this.cartService.cartNumber.set(0);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }
}
