import { Component, Injector, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { HashService } from 'src/app/shared/services/hash.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  service: OntimizeService;
  service2:OntimizeService;
  product: any = null;
  hash:string;
  allergens: any = null;
  userAllergens : any = null;
  matchingAllergens : any = null;

  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private hashService: HashService,
  ) {
    this.service = this.injector.get(OntimizeService);
    this.service2 = this.injector.get(OntimizeService);
  }

  async ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('prod_id'))
    //this.hash = await this.hashService.generateUniqueHash();
    this.hashService.generateUniqueHash()
    .then(hash=>{
      this.hash = hash;
      this.tracker(id,this.hash);
    })
    this.loadProduct(id);
    this.loadAllergens(id); // Top stack call for loadUserAllergens and then getMatchingAllergens

  }

  public tracker(id,hash){

      const conf = this.service2.getDefaultServiceConfiguration('productsView');
      this.service2.configureService(conf); 
      this.service2.insert({"PROV_UID":hash,"PRO_ID":id},"productView")
      .subscribe(
        (data) => {
          console.log(data);       
        },
        (error) => {
          console.log(error + " ¡algo salió mal!");
        }
      );
  }

  public loadProduct(id){
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE", "PRO_SALE", "BRA_NAME", "PGE_NAME", "CAT_NAME"], "productEnabled")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.product = data.data[0];
        } else {
          this.router.navigate(['']);
        }
      })
  }
  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  get price() {
    return this.product.PRO_PRICE?.toFixed(2);
  }
  get sale() {
    return this.product.PRO_SALE?.toFixed(2);
  }


  addProduct(product: any) {
    this.cartService.addProductToCart(product);
  }

  public loadAllergens(id){
    const conf = this.service.getDefaultServiceConfiguration('allergen-products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["ALLER_NAME"], "allergenProduct")
      .subscribe((data) => {
        if (data.data.length != 0) {
          this.allergens = data.data;

          //To avoid async problems we load user allergens only after promise is fulfilled
          this.loadUserAllergens();
        }
      })
  }

  public loadUserAllergens(){
    const conf = this.service.getDefaultServiceConfiguration('allergen-users');
    this.service.configureService(conf);
    // Backend for allergen-users query already implements an AuthService to secure IDORs
    this.service.query({},["ALLER_NAME"],"allergenUser")
    .subscribe((data) => {
      if (data.data.length != 0) {
        this.userAllergens = data.data;

        // By now we should have userAllergens and product allergens (see onInit)
        this.matchingAllergens = this.getMatchingAllergens();
      }
    })



  }

  /**
   * Matches the users allergen list to the product allergens
   * and returns any allergens that match, returns an empty array otherwise
   */
  public getMatchingAllergens(){
    // I decided to use a Set here as it makes lookups 0(1) and allergen listing can be large
    const userAllergenNames = new Set(this.userAllergens.map(allergen => allergen["ALLER_NAME"]));
    // Get matches by filtering, remember that entity results are arrays of maps
    const matchingAllergens = this.allergens.filter(allergen => userAllergenNames.has(allergen["ALLER_NAME"]));
    // Ensure an array (not a map) is returned
    return matchingAllergens.map(allergen => allergen["ALLER_NAME"]);
  }

  public getStringOfAllergies(){
    return this.matchingAllergens.join(", ");
  }

}
