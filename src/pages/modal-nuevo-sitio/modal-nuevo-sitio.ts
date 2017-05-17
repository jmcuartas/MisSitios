import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Db } from '../../providers/Db';
declare var google: any;

/**
 * Generated class for the ModalNuevoSitio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-nuevo-sitio',
  templateUrl: 'modal-nuevo-sitio.html',
})
export class ModalNuevoSitio {

  coords : any = { lat: 0, lng: 0 } //variable de tipo any, que nos permite guardar las coordenadas recibidas
  address: string;
  description: string = '';
  foto: any = '';


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl : ViewController,
              private camera: Camera,
              private db: Db) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNuevoSitio');
    /**Obtenemos las coordenadas que nos han pasado por parametros desde otra vista */
    this.coords.lat = this.navParams.get('lat');
    this.coords.lng = this.navParams.get('lng');
    this.getAddress(this.coords).then(results => {
      this.address = results[0]['formatted_address'];
    }, errStatus => {
      //Codigo para manejar el error
    });
  }

  cerrarModal(){ 
    this.viewCtrl.dismiss();
  }

  getAddress(coords): any{
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject){
      geocoder.geocode({'Location':coords}, function(results,status){
        if(status == google.maps.GeocoderStatus.OK){
          resolve(results);
        }else{
          reject(status);
        }
      });
    });
  }

  sacarFoto(){

    let cameraOptions : CameraOptions = {
        quality: 50,
        encodingType: this.camera.EncodingType.JPEG, 
        targetWidth: 800,
        targetHeight: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true
    }


    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is a base64 encoded string
        this.foto = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  guardarSitio(){
    let sitio = {
      lat: this.coords.lat,
      lng: this.coords.lng , 
      address: this.address, 
      description: this.description, 
      foto: this.foto
    }
    this.db.addSitio(sitio).then((res)=>{
      this.cerrarModal();
     /*  alert('se ha introducido correctamente en la bd'); */
    },(err)=>{ /* alert('error al meter en la bd'+err) */ }) 
}  

}
