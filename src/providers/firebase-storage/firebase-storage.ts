import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { snapshotChanges } from 'angularfire2/Database';
import { AngularFireStorage } from 'angularfire2/storage';

/*
  Generated class for the FirebaseStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseStorageProvider {

  constructor(public http: HttpClient,
    private afs: AngularFireStorage
    ) {
    console.log('Hello FirebaseStorageProvider Provider');
  }

  private getBlob(b64Data) {
    let contentType = '';
    let sliceSize = 512;
    b64Data = b64Data.split(',')[1];
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  uploadImagemStorage(imageContent, urlFirebaseStorage){

    const blob = this.getBlob(imageContent);

    return new Promise<any>((resolve, reject) => {

      let imagemref = this.afs.ref(urlFirebaseStorage);
      let metaData = { contentType: 'image/jpg'};

      imagemref.put(blob,metaData).then(snapshot =>{
        console.log('imagem enviada', snapshot);

        resolve('ok');
      })
      .catch(error =>{
        reject('erro');
      })

    })

  }

  downloadImageStorage(pathStorage: string) {
    return new Promise<any> ((resolve, reject) => {
      this.afs.ref(pathStorage).getDownloadURL().subscribe(data => {
        resolve(data);
      }, error => reject(error));
    });
  }

  processWebImage(event, sucessCallback) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;

      let image = new Image();
      image.src = imageData;
      image.onload = (data) => {
        const w = data['path'][0].naturalWidth;
        const h = data['path'][0].naturalHeight;

        sucessCallback(imageData, w, h);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  }

}
