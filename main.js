
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }
  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }
  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });
  /**
  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let productContainer = select('.product-container');
    if (productContainer) {
      let productIsotope = new Isotope(productContainer, {
        itemSelector: '.product-item',
        layoutMode: 'fitRows'
      });

      let productFilters = select('#product-flters li', true);

      on('click', '#product-flters li', function(e) {
        e.preventDefault();
        productFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        productIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        productIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }
  });

  /**
   * Initiate product lightbox 
   */
  const productLightbox = GLightbox({
    selector: '.product-lightbox',
    loop: true
  });

  /**
   * product details slider
   */
  new Swiper('.product-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
/*product details start*/

let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: 'NEFT QUBE 7,4kW',
    price:'€ 699',
    tag:'product-1',
    Details:'<li><strong>Type: </strong>plug-and-charge</li> <li><strong>Laadkabel: </strong>zonder vaste kabel</li> <li><strong>Montage: </strong>muur of sokkel</li> <li><strong>Spanning: </strong>220V - 380V</li> <li><strong>Afmetingen: </strong>210 x 160 x 210mm</li> <li><strong>Omgevingstemp: </strong>-25°C - 50°C</li> <li><strong>Behuizing: </strong>PC + ASA Ontvlambaar UL94 V-0</li>',
    buyUrl: '',
    image:'NEFT QUBE 7,4kW/Charger 2.png',
    headerOne:'Op zoek naar een laadpaal met discretie en gebruiksgemak?',
    headerTwo:'Compact & gebruiksvriendelijk',
    about:'Maak kennis met de NEFT Qube - één van de kleinste snelladers op de markt, ontworpen en gebouwd voor de dagelijkse EV-rijder.',
    more:'Dankzij zijn kleine formaat en discretie kan de NEFT Qube vrijwel overal geinstalleerd worden.<br><br>De NEFT Qube werkt volgens de plug-in-charge methode waardoor het enorm gebruiksviendelijk is. U hoeft enkel de aagesloten laadkabel van het laadstation in uw elektrische of hybride auto te pluggen en er wordt direct gestart met laden.'
  },
  {
    name: 'NEFT PRO 7,4kW',
    tag:'product-1',
    price:'€ 899',
    Details:'<li><strong>Type: </strong>smart</li> <li><strong>Laadkabel: </strong>met vaste kabel</li>  <li><strong>Spanning: </strong>220V - 380V</li> <li><strong>Netwerk: </strong>Wi-Fi</li> <li><strong>Authorisatie: </strong>RFID-kaartlezer</li> <li><strong>Afmetingen: </strong>350 x 150 x 650mm</li> <li><strong>Omgevingstemp: </strong>-25°C - 50°C</li> <li><strong>Behuizing: </strong>PC + ASA Ontvlambaar UL94 V-0</li>',
    buyUrl: '',
    image:'NEFT PRO 7,4kW/3.png',
    headerOne:'Smart',
    headerTwo:'Premium Design',
    about:'NEFT PRO is een smart laadstation beschikbaar in verschillende vermogens en dus geschikt voor alle elektrische voertuigtypes. De load balancing functionaliteit voor een efficient stroomverdeling en de connectie met energiesoftware, maakt het laadstatlon zeer complementair met slimme energieinfrastructuur en biedt de mogelijkheid het energieverbruik op te volgen.',
    more:'Een elegant design gecombineerd met het gebruik van hoogkwalitatief materiaal vormen samen een premium geheel. Zorgvuldig geselecteerde kunwoffen zorgen voor een robuust, weerbestendig en duurzaam product. De laadstatus wordt weergegeven aan de hand van oplichtende LED-verlichting in verschillende kleuren. De digitale display geeft de parameters weer van de laadsessie.<br><br> De laadstatus wordt weergegeven aan de hand van oplichtende LED-verlichting in verschillende kleuren. De dlgitale display geeft de parameters weer van de laadsessie.',
  },
  {
    name: 'NEFT PRO 11-22kW',
    tag:'product-1',
    price:'€ 1099',
    Details:'<li><strong>Type: </strong>smart</li> <li><strong>Laadkabel: </strong>zonder vaste kabel</li>  <li><strong>Spanning: </strong>220V - 380V</li> <li><strong>Netwerk: </strong>Wi-Fi</li> <li><strong>Authorisatie: </strong>RFID-kaartlezer</li> <li><strong>Afmetingen: </strong>350 x 150 x 650mm</li> <li><strong>Omgevingstemp: </strong>-25°C - 50°C</li> <li><strong>Behuizing: </strong>PC + ASA Ontvlambaar UL94 V-0</li>',
    buyUrl: '',
    image:'NEFT PRO 7,4kW/ZONDER KABEL 3.png',
    headerOne:'Smart',
    headerTwo:'Premium Design',
    about:'NEFT PRO is een smart laadstation beschikbaar in verschillende vermogens en dus geschikt voor alle elektrische voertuigtypes. De load balancing functionaliteit voor een efficient stroomverdeling en de connectie met energiesoftware, maakt het laadstatlon zeer complementair met slimme energieinfrastructuur en biedt de mogelijkheid het energieverbruik op te volgen.',
    more:'Een elegant design gecombineerd met het gebruik van hoogkwalitatief materiaal vormen samen een premium geheel. Zorgvuldig geselecteerde kunwoffen zorgen voor een robuust, weerbestendig en duurzaam product. De laadstatus wordt weergegeven aan de hand van oplichtende LED-verlichting in verschillende kleuren. De digitale display geeft de parameters weer van de laadsessie.<br><br> De laadstatus wordt weergegeven aan de hand van oplichtende LED-verlichting in verschillende kleuren. De dlgitale display geeft de parameters weer van de laadsessie.',
  
  },
  {
    name: 'EV Laadkabels',
    tag:'product-1',
    price:'€ 250',
    type: 'Charging Cable',
    kw:'11-22 kw',
    buyUrl: '',
    image:'cable-black/17.png',
    Details:'',
    headerOne:'',
    headerTwo:'',
    about:'<li>Type 2</li> <li>22kw</li> <li>5 Meter</li> <li>Load balancing</li> <li>Beschermingsgraad IP 44</li>',
    more:''
  },
  {
    name: 'EV Laadkabels - uitrekbaar',
    tag:'product-1',
    price:'€ 250',
    type: 'Charging Cable',
    kw:'7,4 kw',
    buyUrl: '',
    image:'cable-green/1.png',
    Details:'',
    headerOne:'',
    headerTwo:'',
    about:'<li>Type 2</li> <li>7,4kw</li> <li>3 Meter</li> <li>Load balancing</li> <li>Universeel</li> <li>Voorkomt het rondslingeren</li> <li>Beschermingsgraad IP 44</li>',
    more:''
  },
];
/*product details end*/

/*product-details page genarator start*/
for (let i = 0; i  < carts.length; i++) {
  let buy = carts[i];
  buy.addEventListener('click', () => {
    //console.log(products[i]);
    localStorage.setItem('buy', JSON.stringify(products[i]));
  });
}
function displayCart(){
  let cartItems = localStorage.getItem('buy');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.product-details');
  //console.log(cartItems.price);
  if(productContainer){
    //productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      //console.log(item.price);
      productContainer.innerHTML = `

    <section id="product-details" class="product-details" data-aos="fade-up">
      <div class="container">
        <div class="row gy-4">
          <div class="col-lg-8">
            <div class="product-details-slider swiper">
              <div class="swiper-wrapper align-items-center">
                <div class="swiper-slide">
                  <img src="assets/img/product/${cartItems.image}" alt="">
                </div>
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="product-info">
              <h3>${cartItems.name}</h3>
              <ul>
                <li class="priceText"><strong>Prijs</strong>: ${cartItems.price}</li>
                <li class="details">${cartItems.Details}</li>
                <br>
                <li class="button">
                  <a class="button-one" target="_blank" href="${cartItems.buyUrl}" role="button">KOOP NU</a>
                </li>
              </ul>
            </div>
            <div class="product-description about-li">
              <h2>${cartItems.headerOne}</h2>
              <p class="about-li">
              ${cartItems.about}
              </p>
              <h2>${cartItems.headerTwo}</h2>
              <p class="about-li">
              ${cartItems.more}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
    });
  }else{
    console.log('Not NEFT product page!');
  }
}

displayCart();
//localStorage.clear();
/*product-details page genarator start*/
