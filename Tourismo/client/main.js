
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/routes.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';


Meteor.startup(() => {
  AOS.init({
    duration : 1500
  })
  $(".owl-carousel").owlCarousel({
    items : 1,
    autoplay: true,
    autoPlay: 1500, //Set AutoPlay to 3 seconds
    
    });
  // render(<div>
  //   <Account />
  // </div>,
  // document.getElementById('signin')
  // );
  render(renderRoutes(), document.getElementById('render-target'));
  // render(renderComments(), document.getElementById('reviews'));
});