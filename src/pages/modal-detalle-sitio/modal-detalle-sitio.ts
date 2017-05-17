import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalDetalleSitio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal-detalle-sitio',
  templateUrl: 'modal-detalle-sitio.html',
})
export class ModalDetalleSitio {

  sitio: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private viewCtrl: ViewController) {
                this.sitio = this.navParams.get('miSitio');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetalleSitio');
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }

  comoLlegar(){

    let q = '';

    q = this.sitio.lat+', '+this.sitio.lng;
             
    var device = navigator.userAgent;
    var url = 'http://maps.google.com?daddr='+q
    if (device.match(/Iphone/i) || device.match(/iPhone|iPad|iPod/i))
    {
        // iOs
        url='http://maps.apple.com/maps?saddr=Current%20Location&daddr='+q
    }
    else if(device.match(/Android/i))
    {
        // Android
        url='geo:0,0?q='+q;
    }
    else if(device.match(/Windows Phone/i))
    {
        // windows phone
        url='maps:'+q;
    }
    window.open(url, "_system", 'location=yes');
 }

}
