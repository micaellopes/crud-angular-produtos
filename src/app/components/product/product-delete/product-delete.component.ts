import { Product } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  
  product: Product

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    if(confirm('Deseja excluir')){
      this.productService.delete(this.product.id).subscribe(() => {
        this.productService.showMessagem('Produto deletado com sucesso!')
        this.router.navigate(['products']);
      })
    }
  }

  cancel(): void {
    this.router.navigate(['products']);
  }

}
