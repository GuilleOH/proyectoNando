import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash2',
  templateUrl: './splash2.page.html',
  styleUrls: ['./splash2.page.scss'],
})
export class Splash2Page implements OnInit {

  constructor() { }

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:false,
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      clickable: true
    },

   };

  ngOnInit() {

  }

}





