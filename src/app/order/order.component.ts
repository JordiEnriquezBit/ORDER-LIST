import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { Order } from '../shared/interfaces/order';
import { OrderService } from '../shared/services/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  products = [
    'Americano',
    'Flat White',
    'Cappuccino',
    'Latte',
    'Espresso',
    'Machiato',
    'Mocha',
    'Hot Chocolate',
    'Tea',
  ];

  sendSuccess = false;
  orderProducts: any[];

  formGroup: FormGroup;
  //[p,p,p]
  contador: number;
  constructor(private fb: FormBuilder, private orderService: OrderService) {
    this.orderProducts = [];
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: '',
      table: '',
    });
  }

  productExist(productExist,f){
    let index = -1 ;
    switch (f) {
      case "addToOrder":
        index = this.orderProducts.findIndex(
          product => product.product == productExist
        );
        break;
      case "ModifyQuantityProduct":
        index = this.orderProducts.findIndex(
          product => product.product == productExist.product
        );
        break;

    }


    return index;
  }

  addToOrder(productToAdd) {
    let index = this.productExist(productToAdd,"addToOrder");
    if (index == -1) {
      let dicc = {
        product: productToAdd,
        i: 1,
      };

      this.orderProducts.push(dicc);
    } else {
      this.orderProducts[index].i += 1;
    }

  }

  ModifyQuantityProduct(productoToSum,simbol){
    let index = this.productExist(productoToSum,"ModifyQuantityProduct");
console.log(index);
      switch (simbol) {
        case "-":
          if (productoToSum.i == 1) {
            this.orderProducts.splice(index,1);
          }else{
            this.orderProducts[index].i-=1;
          }
          break;
        case "+":
          this.orderProducts[index].i+=1;
          break;
      }
  }

  removeFromOrder(i) {
    this.orderProducts.splice(i, 1);
  }

  submit(form){

    let order: Order = {
      id:      uuid(),
      name:    form.get('name').value,
      table:   form.get('table').value,
      products: this.orderProducts,
      waitress: "jordi"
    }

    //   this.orderService.create$(order).subscribe(e => {
    //   this.formGroup.reset();
    //   this.orderProducts=[];
    //   this.sendSuccess=true;
    // });
    //localStorage.setItem('name',`${order.name}`)
    localStorage.setItem('name',"jordi");

    this.orderService.create(order);
    this.formGroup.reset();
    this.orderProducts=[];
    this.sendSuccess=true;
    setTimeout(_=>this.sendSuccess=false,2000);

    }
}
