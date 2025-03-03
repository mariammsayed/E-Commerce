import { Brand } from '../../shared/interfaces/icart';
import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)
  brand:WritableSignal<Brand[]> = signal([])

  ngOnInit(): void {
    this.getAllBrands();
  }


  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next:(res) => {
        this.brand.set(res.data)
        
      },

    })
  }

  
}
