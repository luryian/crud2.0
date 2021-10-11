import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/Database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';


@Injectable()
export class UserProvider {

  constructor(public http: HttpClient,
    public afd: AngularFireDatabase,
    public afa: AngularFireAuth,
    public alertCtrl: AlertController,
    private storage: Storage
    ) {
    console.log('Hello UserProvider Provider');
  }

  byId(id: string){
    return this.afd.object('/usuarios/' + id).valueChanges();
  }

  salvarusuario(usuario){
    this.afd.object('/usuarios/' + usuario.id).update(usuario);
  }

  salvarcep(endereco){
  this.afd.list('/endereco').push(endereco);
  }

  login(email,senha){
    return this.afa.auth.signInWithEmailAndPassword(email,senha)
    }

  cadastro(usuario){
    return this.afa.auth.createUserWithEmailAndPassword(usuario.email,usuario.senha)
      .then(_usuarioAuth => {
        usuario.id = _usuarioAuth.uid;
        delete usuario.senha;

        this.salvarusuario(usuario);

      }).catch(error => {

      })
  }

  senha(email){
    return this.afa.auth.sendPasswordResetEmail(email)
  }

  salvarLocal(id){
    return this.storage.set('usuario', id);
  }

  lerLocal(){
    return this.storage.get('usuario');
  }
}
