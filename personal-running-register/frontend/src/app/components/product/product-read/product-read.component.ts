import { Component, OnInit } from '@angular/core';
import { Sport } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.css'
})
export class ProductReadComponent implements OnInit {

  sports!: Sport[]
  displayedColumns = ['id', 'name', 'distance', 'time', 'pace', 'action']

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(sports => {
      this.sports = sports
    })
  }
  
}
