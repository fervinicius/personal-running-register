import { Component, OnInit } from '@angular/core';
import { Sport } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent implements OnInit {

  sport!: Sport

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe((sport) => {
      this.sport = sport;
    });
  }

  deleteSport(): void {
    this.productService.delete(this.sport.id).subscribe(() => {
      this.productService.showMessage("Sport deleted with success!");
      this.router.navigate(["/sports"]);
    });
  }

  cancelSport(): void {
    this.router.navigate(["/sports"]);
  }

}
