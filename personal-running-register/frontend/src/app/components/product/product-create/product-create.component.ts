import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router'
import { Sport } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {

  sport: Sport = {
    name: '',
    distance: '',
    time: '',
    pace: ''
  }

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    
  }

  createProduct(): void {
    this.productService.create(this.sport).subscribe(() => {
      this.productService.showMessage("Sport adicionado!")
      this.router.navigate(['/sports'])
    })
    
  }

  cancelProduct(): void {
    this.router.navigate(['/sports'])
  }
}
