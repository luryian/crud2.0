import { Paciente } from './../../models/paciente';
import { AngularFireDatabase } from 'angularfire2/Database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the PacientesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacientesProvider {

  ENTIDADE = '/pacientes';

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

  inserir(paciente) {
    return this.afd.list('/pacientes/').push(paciente);
  }

  inserirFS(paciente: Paciente){

    const obj = JSON.parse( JSON.stringify(paciente));

    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

  atualizar(id,paciente) {
    return this.afd.object('/pacientes/' + id).update(paciente);
  }

  atualizarFS(id,paciente){
    return this.afs.doc(this.ENTIDADE + '/' + id).update(paciente);
  }

  remover(id) {
    return this.afd.object('/pacientes/' + id).remove();
  }

  removerFS(id){
    return this.afs.doc(this.ENTIDADE + '/' + id).delete();
  }
}
