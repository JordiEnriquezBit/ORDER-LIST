import { Order } from './../shared/interfaces/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import { FireService } from '../shared/services/fire.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList:Order[];
  constructor(private orderService:OrderService, private afs: FireService) { }

  ngOnInit(): void {

    this.afs.read$().subscribe(
      data => this.orderList=data.filter(e => e.waitress == localStorage.getItem('name')));


  }
}
