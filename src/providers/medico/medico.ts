import { Medico } from './../../models/medico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/Database';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the MedicoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MedicoProvider {

  ENTIDADE = '/medicos';

  constructor(
    public http: HttpClient,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore,
    ) {
    console.log('Hello PacientesProvider Provider');
  }

  listar() {
    return this.afd.list(this.ENTIDADE)
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  listarFS(){
    return this.afs.collection(this.ENTIDADE)
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.doc.id , value: changes.payload.doc.data() })));
  }

  buscar(cidade: string) {
    return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('cidade').equalTo(cidade))
    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  buscarFS(estado: string, cidade: string) {
    return this.afs.collection(this.ENTIDADE,
      ref => ref
      .where('cidade', '==', cidade)
      .where('estado', '==', estado)
      .orderBy('nome')
      )

    .snapshotChanges()
    .map(item => item.map(changes => ({key: changes.payload.doc.id , value: changes.payload.doc.data() })));
  }

  inserir(medico) {
    return this.afd.list('/medicos/').push(medico);
  }

  inserirFS(medico: Medico){

    const obj = JSON.parse( JSON.stringify(medico));

    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

  atualizar(id,medico) {
    return this.afd.object('/medicos/' + id).update(medico);
  }

  atualizarFS(id,medico){
    return this.afs.doc(this.ENTIDADE + '/' + id).update(medico);
  }


  remover(id) {
    return this.afd.object('/medicos/' + id).remove();
  }

  removerFS(id){
    return this.afs.doc(this.ENTIDADE + '/' + id).delete();
  }

}
