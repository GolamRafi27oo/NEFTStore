
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
/*product details*/

let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name: 'NEFT QUBE 7,4 KW',
    tag:'product-2',
    price:'€ 679 (7,4kW)',
    type: 'Charging station 7,4 KW',
    kw:'7,4 kw',
    url: 'https://buy.stripe.com/test_3cs15scnjcVw0BG146',
    image:'NEFT QUBE 7,4kW/Charger 2.png',
    about:'Introducing the Neft Qube – one of the smallest fast chargers on the market, designed and built for the everyday EV driver.'
  },
  {
    name: 'NEFT PRO 7,4kW',
    tag:'product-1',
    price:'€ 879 (7,4KW)',
    type: 'Charging station 7,4 KW',
    kw:'7,4 kw',
    url: 'https://buy.stripe.com/test_00g4hE0EB9Jk2JO3cf',
    image:'NEFT PRO 7,4kW/3.png',
    about:'The PRO series from NEFT is a series of smart charging stations that adapt charging behavior to any circumstance so that you can charge as efficiently and cheaply as possible. The NEFT charging stations are suitable for all electric vehicles. For the EVs that are already part of the street scene, but also for the electric vehicles of the future.'

  },
  {
    name: 'NEFT PRO 11-22kW',
    tag:'product-1',
    kw:'11-22 kw',
    price:'€ 1079 (11-22kW)',
    type: 'Charging station 11-22 KW', 
    url: 'https://buy.stripe.com/test_14kbK672ZbRs4RW148',
    image:'NEFT PRO 7,4kW/ZONDER KABEL 3.png',
    about:'The PRO series from NEFT is a series of smart charging stations that adapt charging behavior to any circumstance so that you can charge as efficiently and cheaply as possible. The NEFT charging stations are suitable for all electric vehicles. For the EVs that are already part of the street scene, but also for the electric vehicles of the future.'

  },
  {
    name: 'EV Laadkabels',
    tag:'product-1',
    price:'€ 250',
    type: 'Charging Cable',
    kw:'11-22 kw',
    url: 'https://buy.stripe.com/test_14kbK672ZbRs4RW148',
    image:'cable-black/17.png',
    about:'Charging Cable: Type 2, 11-22kw, 5 Meter, Load balancing'
  },
  {
    name: 'EV Laadkabels - uitrekbaar',
    tag:'product-1',
    price:'€ 250',
    type: 'Charging Cable',
    kw:'7,4 kw',
    url: 'https://buy.stripe.com/test_14kbK672ZbRs4RW148',
    image:'cable-green/1.png',
    about:'Charging Cable: Type 2, 7,4kw, 3 Meter, Load balancing'
  },
];
for (let i = 0; i  < carts.length; i++) {
  let buy = carts[i];
  buy.addEventListener('mouseenter', () => {
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
                <li><strong>Product Name</strong>: ${cartItems.name}</li>
                <li><strong>KW</strong>: ${cartItems.kw}</li>
                <li><strong>Type</strong>: ${cartItems.type}</li>
                <br>
                <li class="button">
                <a class="button-one" href="${cartItems.url}" role="button">BUY NOW</a>
                </li>
              </ul>
            </div>

            <div class="product-description">
              <h2>About This Product</h2>
              <p>
              ${cartItems.about}
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