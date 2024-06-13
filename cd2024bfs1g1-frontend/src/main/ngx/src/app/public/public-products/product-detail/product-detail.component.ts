import { Component, Injector, OnInit } from '@angular/core';
import { AuthService, OntimizeService } from 'ontimize-web-ngx';
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
  service2: OntimizeService;
  product: any = null;
  hash: string;
  allergens: any[] = [];
  skintypes: any = null;
  userAllergens: any[] = [];
  matchingAllergens: any[] = [];

  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private hashService: HashService,
    private authService: AuthService,
  ) {
    this.service = this.injector.get(OntimizeService);
    this.service2 = this.injector.get(OntimizeService);
  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('prod_id'))

    // In case of emergency, de-comment this:
    //this.hash = await this.hashService.generateUniqueHash();

    this.hashService.generateUniqueHash()
      .then(hash => {
        this.hash = hash;
        this.tracker(id, this.hash);
      })
    this.loadProduct(id);

    // Load both allergens simultaneously
    let prom_function_1 = this.loadAllergens(id);
    let pron_arr = [prom_function_1];
    let prom_function_2 = this.loadUserAllergens();

    if(this.authService.isLoggedIn()){
      pron_arr.push(prom_function_2);
    }

    Promise.all(pron_arr)
      .then((res) => {
        // Perform matching once both allergens are loaded
        console.log(res);
        this.matchingAllergens = this.getMatchingAllergens();
      })
      .catch(error => console.warn(error));

  }

  public tracker(id, hash) {

    const conf = this.service2.getDefaultServiceConfiguration('productsView');
    this.service2.configureService(conf);
    this.service2.insert({ "PROV_UID": hash, "PRO_ID": id }, "productView")
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error + " ¡algo salió mal!");
        }
      );
  }

  public loadProduct(id) {
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRICE", "PRO_IMAGE", "REAL_PRICE", "BRA_NAME", "PGE_NAME", "CAT_NAME"], "productEnabled")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.product = data.data[0];
        } else {
          this.router.navigate(['']);
        }
      })
  }

  public loadSkin(id) {
    const conf = this.service.getDefaultServiceConfiguration('productsSkin');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["SKIN_NAME"], "productSkin")
      .subscribe((data) => {
        if (data.data.length != 0) {
          this.skintypes = data.data;
        }
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  get price() {
    return this.product.PRICE?.toFixed(2);
  }
  get sale() {
    return this.product.REAL_PRICE?.toFixed(2);
  }


  addProduct(product: any) {
    this.cartService.addProductToCart(product);
  }

  public loadAllergens(id): Promise<void> {
    return new Promise((resolve, reject) => {
      const conf = this.service.getDefaultServiceConfiguration('allergen-products');
      this.service.configureService(conf);
      this.service.query({ "PRO_ID": id }, ["ALLER_NAME"], "allergenProduct")
        .subscribe((data) => {
          this.allergens = data.data;
          resolve(data.data);
        }, error => {
          reject(error);
        });
    });
  }

  public loadUserAllergens(): Promise<void> {
    return new Promise((resolve, reject) => {
    const conf = this.service.getDefaultServiceConfiguration('allergen-users');
    this.service.configureService(conf);
    // Backend for allergen-users query already implements an AuthService to secure IDORs
    this.service.query({}, ["ALLER_NAME"], "allergenUser")
    .subscribe((data) => {
      if(data.data.length != 0){
        this.userAllergens = data.data;
        resolve(data.data);
      }else{
        this.userAllergens = [];
        resolve();
      }
    }, error => {
      reject(error);
    });
  });
}

  /**
   * Matches the users allergen list to the product allergens
   * and returns any allergens that match, returns an empty array otherwise
   */
  public getMatchingAllergens() {

    // I decided to use a Set here as it makes lookups 0(1) and allergen listing can be large
    const userAllergenNames = new Set(this.userAllergens.map(allergen => allergen["ALLER_NAME"]));
    // Get matches by filtering, remember that entity results are arrays of maps
    const matchingAllergens = this.allergens.filter(allergen => userAllergenNames.has(allergen["ALLER_NAME"]));
    // Ensure an array (not a map) is returned
    return matchingAllergens.map(allergen => allergen["ALLER_NAME"]);
  }

  public getStringOfAllergies() {
    return this.matchingAllergens.join(", ");
  }


}
