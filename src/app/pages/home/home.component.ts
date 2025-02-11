import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  imports: [RouterLink,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  products:Iproduct[] = [];
  categories:Icategories[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navText: ['<span class=" text-[#316565]"><i class="fa-solid fa-angles-left"></i></span>', '<span class=" text-[#316565]"><i class="fa-solid fa-angles-right"></i></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    console.log(this.categories);
    
  }


  getAllProducts(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }



}



