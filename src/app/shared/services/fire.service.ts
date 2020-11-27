import { Order } from './../interfaces/order';
import { Observable } from 'rxjs';
import { AngularFireStore } from '@angular/fire/store';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private afs: AngularFirestore) { }
  read$(): Observable<Order[]>{
return this.afs.collection<Order>('orders').valueChanges();
  }
}
