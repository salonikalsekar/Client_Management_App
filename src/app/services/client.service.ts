import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { Client } from '../models/Client'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) { 
    this.clientCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }


  getClients(): Observable<Client[]> {
    // Get clients with the id
    this.clients = this.clientCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        console.log(action.payload.doc)
        // data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.clients;
  }
}
