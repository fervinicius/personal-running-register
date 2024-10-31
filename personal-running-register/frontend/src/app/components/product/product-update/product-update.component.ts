import { Component, OnInit } from '@angular/core';
import { Sport } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})  
export class ProductUpdateComponent implements OnInit {

  sport!: Sport;

  constructor(
    private productService: ProductService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
  }

  updateSport(): void {
    this.productService.update(this.sport).subscribe(() => {
      this.productService.showMessage("Sport updated with success!");
      this.router.navigate(['/sports']);
    })
  }

  cancelSport(): void {
    this.router.navigate(['/sports'])
  }

}
