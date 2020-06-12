import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips } from '../api/trips.js';
import Trip from './Trip.js';
import Account from './Account';
import { render } from 'react-dom';
// import {HomeLinks} from '../api/home.js'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const today = new Date();
    const trip = {
        userId: Meteor.userId(),
        destination : this.refs.destination.value,
        phone : this.refs.phone.value,
        startDate : this.refs.startDate.value,
        endDate : this.refs.endDate.value,
        departure : this.refs.departure.value,
        destinationInformation : this.refs.destinationInformation.value,
        price: this.refs.price.value,
        detail : this.refs.detail.value};
    var flag = true;
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    if ((today > startDate) | (today > endDate)){
      flag = false;
      this.refs.incorrectDate.replaceWith("Enter the future date");
    }
    if (trip.days < 0){
      flag = false
      this.refs.incorrectDays.replaceWith('Enter valid number of days');
    }
    if (trip.price < 0){
      flag = false
      this.refs.incorrectDays.replaceWith('Enter valid price');
    }
    if (flag == true){
      var input = document.getElementById("image");
      var fReader = new FileReader();
      fReader.onloadend = function(event){
        Meteor.call('trips.insert', trip, event.target.result); 
      }     
      fReader.readAsDataURL(input.files[0]);
  }
    

    // Clear form
    this.refs.destination.value = '';
    this.refs.days.value = '0';
    this.refs.startDate.value = '';
    this.refs.endDate.value = '';
    this.refs.image.value = '';
    this.refs.departure.value = '';
    this.refs.destinationInformation.value = '';
    this.refs.detail.value = '';
  }  

  renderTrips() {
    let filteredTrips = this.props.trips;
    return filteredTrips.map((trip) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      if (trip.owner === currentUserId){
      return (
        <div>
          <Trip
            key={trip._id}
            trip={trip}
          ></Trip>        
        </div>
      );
        }
    });
  }

  render() {
    render(<div>
      <Account /><br/>
      </div>,
      document.getElementById('signin')
      );
    // const requiredLink = this.props.homeLink;
    // if (requiredLink){
    //     render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
    //         document.getElementById('link')
    //         );
    // }
    document.getElementById('only-home').innerHTML = '<span></span>';
    document.getElementById('home-description').innerText = "";
    document.getElementById('home-trips').innerHTML = ''
    document.getElementById('scroll-down').innerHTML = '';
    return (
      <div className="container">
        <header>
          <h1>{this.props.id} <br/>
            <center>
              Add Trips{this.props.owner}
            </center>
          </h1>
        { this.props.currentUser ?
              <div className='trip-form'>
                <section className="section contact-section">
                  <div className="container-contact">
                    <div className="row" data-aos="fade-up">
                      <div className="col-md-3  col-lg-3 col-sm-3 col-xs-3 ">
                    </div>
                    <div className="col-md-6  col-lg-6 col-sm-6 col-xs-6 ">
                      
                      <form action="#" method="post" className="border border-primary bg-white p-md-5 p-4 mb-5" onSubmit={this.handleSubmit.bind(this)} >
                        <div className="row">
                          <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                          <input type="text" ref="destination" placeholder="Desination" list='cities' className="form-control " />
                            <datalist id="cities" >
                            <option>  Abbottābād  	</option>
                              <option>	Alīābad 	</option>
                              <option>	Alpūrai 	</option>
                              <option>	Altit	</option>
                              <option>	Askole	</option>
                              <option>	Astore	</option>
                              <option>	Athmuqam	    </option>
                              <option>	Attock City </option>
                              <option>	Awārān  	</option>
                              <option>	Ayubia  	</option>
                              <option>	Babusar 	</option>
                              <option>	Badīn   	</option>
                              <option>	Bāgh    	</option>
                              <option>	Bahāwalnagar    </option>
                              <option>	Bahāwalpur  </option>
                              <option>	Balghar	</option>
                              <option>	Bannu   	</option>
                              <option>	Barah Valley	</option>
                              <option>	Bardār  	</option>
                              <option>	Bārkhān 	</option>
                              <option>	Batgrām 	</option>
                              <option>	Bhakkar 	</option>
                              <option>	Bunji	</option>
                              <option>	Chakwāl 	</option>
                              <option>	Chalunka	</option>
                              <option>	Chaman  	</option>
                              <option>	Chārsadda   </option>
                              <option>	Chilas	</option>
                              <option>	Chilās  	</option>
                              <option>	Chiniot 	</option>
                              <option>	Chitrāl 	</option>
                              <option>	Chitral.	</option>
                              <option>	Dādu    	</option>
                              <option>	Daggar  	</option>
                              <option>	Dālbandīn   </option>
                              <option>	Danyor	</option>
                              <option>	Dasu    	</option>
                              <option>	Dera All	āhyār   </option>
                              <option>	Dera Bugti  </option>
                              <option>	Dera Ghāzi Khān </option>
                              <option>	Dera Ismāīl Khān    </option>
                              <option>	Dera Murād Jamāli   </option>
                              <option>	Eidgāh  	</option>
                              <option>	Fairy Meadows	</option>
                              <option>	Faisalābād  </option>
                              <option>	Gākuch  	</option>
                              <option>	Gandāvā 	</option>
                              <option>	Ghotki  	</option>
                              <option>	Gilgit  	</option>
                              <option>	Gorikot	</option>
                              <option>	Gujrānwāla  </option>
                              <option>	Gujrāt  	</option>
                              <option>	Gulmit	</option>
                              <option>	Gwādar  	</option>
                              <option>	Hāfizābād   </option>
                              <option>	Haji Gham	</option>
                              <option>	Haldi	</option>
                              <option>	Hangu   	</option>
                              <option>	Harīpur 	</option>
                              <option>	Hassanabad Chorbat	</option>
                              <option>	Hunza	</option>
                              <option>	Hushe	</option>
                              <option>	Hussainabad	</option>
                              <option>	Hyderābād City  </option>
                              <option>	Islamabad   </option>
                              <option>	Jacobābād   </option>
                              <option>	Jaglot	</option>
                              <option>	Jalal Abad	</option>
                              <option>	Jāmshoro	    </option>
                              <option>	Jhang City  </option>
                              <option>	Jhang Sadr  </option>
                              <option>	Jhelum  	</option>
                              <option>	Jutal	</option>
                              <option>	Kalam	</option>
                              <option>	Kalāt   	</option>
                              <option>	Kandhkot	    </option>
                              <option>	Karachi 	</option>
                              <option>	Karak   	</option>
                              <option>	Karimabad	</option>
                              <option>	Kashmir 	</option>
                              <option>	Kasūr   	</option>
                              <option>	Keris Valley	</option>
                              <option>	Khairpur	    </option>
                              <option>	Khānewāl	    </option>
                              <option>	Khaplu	</option>
                              <option>	Khārān  	</option>
                              <option>	Kharfaq	</option>
                              <option>	Khushāb 	</option>
                              <option>	Khuzdār 	</option>
                              <option>	Kohāt   	</option>
                              <option>	Kohlu   	</option>
                              <option>	Kotli   	</option>
                              <option>	Kumrat	</option>
                              <option>	Kumrat  	</option>
                              <option>	Kundiān 	</option>
                              <option>	Lahore  	</option>
                              <option>	Lakki Marwat    </option>
                              <option>	Lārkāna 	</option>
                              <option>	Leiah   	</option>
                              <option>	Lodhrān 	</option>
                              <option>	Loralai 	</option>
                              <option>	Maiun	</option>
                              <option>	Malakand	    </option>
                              <option>	Mandi Bahāuddīn </option>
                              <option>	Mānsehra	    </option>
                              <option>	Mardan  	</option>
                              <option>	Masīwāla	    </option>
                              <option>	Mastung 	</option>
                              <option>	Matiāri 	</option>
                              <option>	Mehra   	</option>
                              <option>	Miānwāli	    </option>
                              <option>	Minimarg	</option>
                              <option>	Mīrpur Khās </option>
                              <option>	Misgar	</option>
                              <option>	Multān  	</option>
                              <option>	Murree  	</option>
                              <option>	Mūsa Khel Bāzār </option>
                              <option>	Muzaffar	garh    </option>
                              <option>	Nagar Khas	</option>
                              <option>	Naltar Valley	</option>
                              <option>	Nankāna 	Sāhib   </option>
                              <option>	Naran Kaghan.	</option>
                              <option>	Nārowāl 	</option>
                              <option>	Nasirabad	</option>
                              <option>	Nathia Gali </option>
                              <option>	Naushahro Fīroz </option>
                              <option>	Nawābshāh   </option>
                              <option>	Neelam	</option>
                              <option>	Neelam  	</option>
                              <option>	New Mīrpur  </option>
                              <option>	Nowshera	    </option>
                              <option>	Okāra   	</option>
                              <option>	Oshikhandass	</option>
                              <option>	Pākpattan   </option>
                              <option>	Palas	</option>
                              <option>	Panjgūr 	</option>
                              <option>	Parachinār  </option>
                              <option>	Pasu	</option>
                              <option>	Peshāwar	    </option>
                              <option>	Pishin  	</option>
                              <option>	Qila Abdullāh   </option>
                              <option>	Qila Saifullāh  </option>
                              <option>	Quetta  	</option>
                              <option>	Rahīmyār	 Khān   </option>
                              <option>	Rājanpur	    </option>
                              <option>	Rāwala Kot  </option>
                              <option>	Rāwalpindi  </option>
                              <option>	Rawlakot	    </option>
                              <option>	Sādiqābād   </option>
                              <option>	Sāhīwāl 	</option>
                              <option>	Saidu Sharif    </option>
                              <option>	Sānghar 	</option>
                              <option>	Sargodha	    </option>
                              <option>	Serai   	</option>
                              <option>	Shahdād Kot </option>
                              <option>	Sheikhupura </option>
                              <option>	Shigar	</option>
                              <option>	Shikārpur   </option>
                              <option>	Shimshal	</option>
                              <option>	Siālkot City    </option>
                              <option>	Sibi    </option>
                              <option>	Skardu City.	</option>
                              <option>	Sost	</option>
                              <option>	Sukkur  	</option>
                              <option>	Sultan Abad	</option>
                              <option>	Swābi   	</option>
                              <option>  Swat    </option>
                              <option>	Taghafari	</option>
                              <option>	Tando Allāhyār  </option>
                              <option>	Tando Muhammad Khān </option>
                              <option>	Tānk    	</option>
                              <option>	Thatta  	</option>
                              <option>	Timargara   </option>
                              <option>	Toba Tek	Singh  </option>
                              <option>	Tolipeer	    </option>
                              <option>	Tolti Kharmang	</option>
                              <option>	Turbat  	</option>
                              <option>	Umarkot 	</option>
                              <option>	Upper Dir   </option>
                              <option>	Uthal   	</option>
                              <option>	Vihāri  	</option>
                              <option>	Yugo	</option>
                              <option>	Zhob    	</option>
                              <option>	Ziārat  	</option>
                              <option>  Other   </option>
                            </datalist>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                          <input type="tel" ref="phone" placeholder="Contact Number" className="form-control " />
                          <div className="error col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                            <span ref='incorrectDays' ></span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                          <input type="date"  ref="startDate" placeholder="Date of Departure" className="form-control "/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                          <input  type="date"  ref="endDate" placeholder="Date of Return" className="form-control "/>
                          <div className="error col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                            <span ref='incorrectDate'  ></span>
                          </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                            <input type="number" ref="price" placeholder="Cost of Trip in PKR" className="form-control " />
                            <div className='error col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group'>
                              <span ref='incorrectPrice' ></span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                            <input type="file" id="image" ref="image" accept="image/*" className="form-control "/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                            <select className="form-control" ref='departure' id="sel1">
                              <option>  Abbottābād  	</option>
                              <option>	Alīābad 	</option>
                              <option>	Alpūrai 	</option>
                              <option>	Altit	</option>
                              <option>	Askole	</option>
                              <option>	Astore	</option>
                              <option>	Athmuqam	    </option>
                              <option>	Attock City </option>
                              <option>	Awārān  	</option>
                              <option>	Ayubia  	</option>
                              <option>	Babusar 	</option>
                              <option>	Badīn   	</option>
                              <option>	Bāgh    	</option>
                              <option>	Bahāwalnagar    </option>
                              <option>	Bahāwalpur  </option>
                              <option>	Balghar	</option>
                              <option>	Bannu   	</option>
                              <option>	Barah Valley	</option>
                              <option>	Bardār  	</option>
                              <option>	Bārkhān 	</option>
                              <option>	Batgrām 	</option>
                              <option>	Bhakkar 	</option>
                              <option>	Bunji	</option>
                              <option>	Chakwāl 	</option>
                              <option>	Chalunka	</option>
                              <option>	Chaman  	</option>
                              <option>	Chārsadda   </option>
                              <option>	Chilas	</option>
                              <option>	Chilās  	</option>
                              <option>	Chiniot 	</option>
                              <option>	Chitrāl 	</option>
                              <option>	Chitral.	</option>
                              <option>	Dādu    	</option>
                              <option>	Daggar  	</option>
                              <option>	Dālbandīn   </option>
                              <option>	Danyor	</option>
                              <option>	Dasu    	</option>
                              <option>	Dera All	āhyār   </option>
                              <option>	Dera Bugti  </option>
                              <option>	Dera Ghāzi Khān </option>
                              <option>	Dera Ismāīl Khān    </option>
                              <option>	Dera Murād Jamāli   </option>
                              <option>	Eidgāh  	</option>
                              <option>	Fairy Meadows	</option>
                              <option>	Faisalābād  </option>
                              <option>	Gākuch  	</option>
                              <option>	Gandāvā 	</option>
                              <option>	Ghotki  	</option>
                              <option>	Gilgit  	</option>
                              <option>	Gorikot	</option>
                              <option>	Gujrānwāla  </option>
                              <option>	Gujrāt  	</option>
                              <option>	Gulmit	</option>
                              <option>	Gwādar  	</option>
                              <option>	Hāfizābād   </option>
                              <option>	Haji Gham	</option>
                              <option>	Haldi	</option>
                              <option>	Hangu   	</option>
                              <option>	Harīpur 	</option>
                              <option>	Hassanabad Chorbat	</option>
                              <option>	Hunza	</option>
                              <option>	Hushe	</option>
                              <option>	Hussainabad	</option>
                              <option>	Hyderābād City  </option>
                              <option>	Islamabad   </option>
                              <option>	Jacobābād   </option>
                              <option>	Jaglot	</option>
                              <option>	Jalal Abad	</option>
                              <option>	Jāmshoro	    </option>
                              <option>	Jhang City  </option>
                              <option>	Jhang Sadr  </option>
                              <option>	Jhelum  	</option>
                              <option>	Jutal	</option>
                              <option>	Kalam	</option>
                              <option>	Kalāt   	</option>
                              <option>	Kandhkot	    </option>
                              <option>	Karachi 	</option>
                              <option>	Karak   	</option>
                              <option>	Karimabad	</option>
                              <option>	Kashmir 	</option>
                              <option>	Kasūr   	</option>
                              <option>	Keris Valley	</option>
                              <option>	Khairpur	    </option>
                              <option>	Khānewāl	    </option>
                              <option>	Khaplu	</option>
                              <option>	Khārān  	</option>
                              <option>	Kharfaq	</option>
                              <option>	Khushāb 	</option>
                              <option>	Khuzdār 	</option>
                              <option>	Kohāt   	</option>
                              <option>	Kohlu   	</option>
                              <option>	Kotli   	</option>
                              <option>	Kumrat	</option>
                              <option>	Kumrat  	</option>
                              <option>	Kundiān 	</option>
                              <option>	Lahore  	</option>
                              <option>	Lakki Marwat    </option>
                              <option>	Lārkāna 	</option>
                              <option>	Leiah   	</option>
                              <option>	Lodhrān 	</option>
                              <option>	Loralai 	</option>
                              <option>	Maiun	</option>
                              <option>	Malakand	    </option>
                              <option>	Mandi Bahāuddīn </option>
                              <option>	Mānsehra	    </option>
                              <option>	Mardan  	</option>
                              <option>	Masīwāla	    </option>
                              <option>	Mastung 	</option>
                              <option>	Matiāri 	</option>
                              <option>	Mehra   	</option>
                              <option>	Miānwāli	    </option>
                              <option>	Minimarg	</option>
                              <option>	Mīrpur Khās </option>
                              <option>	Misgar	</option>
                              <option>	Multān  	</option>
                              <option>	Murree  	</option>
                              <option>	Mūsa Khel Bāzār </option>
                              <option>	Muzaffar	garh    </option>
                              <option>	Nagar Khas	</option>
                              <option>	Naltar Valley	</option>
                              <option>	Nankāna 	Sāhib   </option>
                              <option>	Naran Kaghan.	</option>
                              <option>	Nārowāl 	</option>
                              <option>	Nasirabad	</option>
                              <option>	Nathia Gali </option>
                              <option>	Naushahro Fīroz </option>
                              <option>	Nawābshāh   </option>
                              <option>	Neelam	</option>
                              <option>	Neelam  	</option>
                              <option>	New Mīrpur  </option>
                              <option>	Nowshera	    </option>
                              <option>	Okāra   	</option>
                              <option>	Oshikhandass	</option>
                              <option>	Pākpattan   </option>
                              <option>	Palas	</option>
                              <option>	Panjgūr 	</option>
                              <option>	Parachinār  </option>
                              <option>	Pasu	</option>
                              <option>	Peshāwar	    </option>
                              <option>	Pishin  	</option>
                              <option>	Qila Abdullāh   </option>
                              <option>	Qila Saifullāh  </option>
                              <option>	Quetta  	</option>
                              <option>	Rahīmyār	 Khān   </option>
                              <option>	Rājanpur	    </option>
                              <option>	Rāwala Kot  </option>
                              <option>	Rāwalpindi  </option>
                              <option>	Rawlakot	    </option>
                              <option>	Sādiqābād   </option>
                              <option>	Sāhīwāl 	</option>
                              <option>	Saidu Sharif    </option>
                              <option>	Sānghar 	</option>
                              <option>	Sargodha	    </option>
                              <option>	Serai   	</option>
                              <option>	Shahdād Kot </option>
                              <option>	Sheikhupura </option>
                              <option>	Shigar	</option>
                              <option>	Shikārpur   </option>
                              <option>	Shimshal	</option>
                              <option>	Siālkot City    </option>
                              <option>	Sibi    </option>
                              <option>	Skardu City.	</option>
                              <option>	Sost	</option>
                              <option>	Sukkur  	</option>
                              <option>	Sultan Abad	</option>
                              <option>	Swābi   	</option>
                              <option>  Swat     </option>
                              <option>	Taghafari	</option>
                              <option>	Tando Allāhyār  </option>
                              <option>	Tando Muhammad Khān </option>
                              <option>	Tānk    	</option>
                              <option>	Thatta  	</option>
                              <option>	Timargara   </option>
                              <option>	Toba Tek	Singh  </option>
                              <option>	Tolipeer	    </option>
                              <option>	Tolti Kharmang	</option>
                              <option>	Turbat  	</option>
                              <option>	Umarkot 	</option>
                              <option>	Upper Dir   </option>
                              <option>	Uthal   	</option>
                              <option>	Vihāri  	</option>
                              <option>	Yugo	</option>
                              <option>	Zhob    	</option>
                              <option>	Ziārat  	</option>
                              <option>  Other   </option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">
                              <textarea  rows='3' type="text"  ref="destinationInformation"  className="form-control " placeholder="Breifly introduce destination to your customers" /><br/>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12  col-lg-12 col-sm-12 col-xs-12  form-group">                    
                              <textarea rows='5' type="text"  ref="detail" className="form-control "  placeholder="Any other notes for trip" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6  col-lg-6 col-sm-6 col-xs-6 form-group">
                              <input type="submit" value="Add Trip" className="btn btn-primary"/>
                            </div>
                          </div>
                        </form>
                          </div>
                            <div className="col-md-3  col-lg-3 col-sm-3 col-xs-3">
                            </div>
                          </div>
                      </div>
                    </section>
                  </div>
                : ''
                }
                </header>
                <ul className='trips'>
                  {this.renderTrips()}
                </ul>
                <div className='clear-end'></div>
              </div>
            );
      }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(App);