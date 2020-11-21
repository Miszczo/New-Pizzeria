import {Product} from './components/Product.js';
import {Booking} from './components/booking.js';
import {Cart} from './components/Cart.js';
import {select, settings, classNames, templates} from './settings.js';

const app = {

  initMenu: function(){
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);

    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },
  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },
  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        // console.log('parsedResponse:' ,parsedResponse);
        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenu method */
        thisApp.initMenu();
      });

    // console.log('thisApp.data', JSON.stringify(thisApp.data));
  },
  initPages: function(){
    const thisApp = this;

    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children);

    thisApp.navLinks = Array.from(document.querySelectorAll(select.nav.links));

    thisApp.activatePage(thisApp.pages[0].id);

    thisApp.pageLinks = Array.from(document.querySelectorAll('.link'));
    console.log(thisApp.pageLinks);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* TODO: get page id from href */
        const clickId = clickedElement.getAttribute('href').replace('#', '');
        /* TODO: activate page */
        thisApp.activatePage(clickId);
      });
    }

    for(let link of thisApp.pageLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();

        const pageId = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(pageId);
        link.classList.add('active');
      });
    }

  },
  activatePage: function(pageId){
    const thisApp = this;

    for(let link of thisApp.navLinks){
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.getAttribute('id') == pageId);
    }
  },
  initBooking: function(){
    const thisApp = this;

    const widgetContainer = document.querySelector(select.containerOf.booking);
    // console.log('widgetContainer', widgetContainer);

    thisApp.Booking = new Booking(widgetContainer);
    // console.log('newBooking', thisApp.Booking);
  },
  init: function(){
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);

    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
  },
};


app.init();
