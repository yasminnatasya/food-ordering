import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  @Input() description: string;
  @Input() category: string;
  @Input() price: number;
  @Input() id: number;
  @Output() addProduct = new EventEmitter<any>(); // EventEmitter to emit the product data

  imagePath: SafeUrl;
  quantity: number = 1;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const imageUrl = `http://localhost/food-ordering-backend/public/uploads/${this.image}`;
    this.imagePath = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onAddProduct(): void {
    if (this.quantity > 0) {
      this.addProduct.emit({
        id: this.id,
        name: this.name,
        price: this.price,
        image: this.image,
        quantity: this.quantity  // Emitting the selected quantity
      });
    }
  }
  
}
