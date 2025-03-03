import { get } from 'http';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Icategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
   private readonly categoriesService= inject(CategoriesService)
   categories:WritableSignal<Icategories[]> = signal([])


    ngOnInit(): void {
      this.getAllCategories();
    }


    getAllCategories():void {
      this.categoriesService.getAllCategories().subscribe(res=>this.categories.set(res.data)) 
    }

    

}
