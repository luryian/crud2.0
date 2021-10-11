import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/Database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Clinica } from '../../models/clinica';

/*
  Generated class for the ClinicaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClinicaProvider {

  ENTIDADE = '/clinicas';

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

  inserir(clinica) {
    return this.afd.list('/clinicas/').push(clinica);
  }

  inserirFS(clinica: Clinica){

    const obj = JSON.parse( JSON.stringify(clinica));

    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

    atualizar(id,clinica) {
      return this.afd.object('/clinicas/' + id).update(clinica);
    }

    atualizarFS(id,clinica){
      return this.afs.doc(this.ENTIDADE + '/' + id).update(clinica);
    }

    remover(id) {
      return this.afd.object('/clinicas/' + id).remove();
    }

    removerFS(id){
      return this.afs.doc(this.ENTIDADE + '/' + id).delete();
    }

}
