import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trips, UserTripBookings } from '../api/trips.js';
import Trip from './Trip.js';
import { render } from 'react-dom';
import Account from './Account';
// import {HomeLinks} from '../api/home.js'



class App extends Component {

  handleSubmit(event){
    event.preventDefault();
    console.log("this.refs.search.value: ", this.refs.search.value);
      const search = {
        date: this.refs.date.value,
        location: this.refs.search.value,
        price: this.refs.priceRange.value
        }
      Meteor.call('trips.search', search, (error, result) => {
        console.log('error: ', error);
        if (error) {
          document.getElementsById('render-trips').replaceWith('No trip found');
        }
        console.log('result: ', result);
        if (!result[0]){
          render(
            <center><h4>No Trips found</h4></center>,
            document.getElementById('render-trips')
          );
        }
        else{
          console.log("Price: ", result[0].price-this.refs.priceRange.value);
          render(
            this.renderTrips(result),
            document.getElementById('render-trips')
          );
        }
        result = [];
        this.refs.search.value = '';
        this.refs.date.value = ''
      });
  }

  renderTrips(filteredTrips) {
    return filteredTrips.map((trip) => {
      return (
        <Trip
          key={trip._id}
          trip={trip}
        />
      );
    });
  }

  handleRemove() {
    var remove = confirm("Sure you want to remove this booking?");
    if( remove == true ) {
      Meteor.call('trip.removeBooking', this._id);
    }
  }

  renderBookings(){
    const bookings = this.props.userBookings;
    return bookings.map((booking) => {
      return(<tr><td>
                <div className='bookings'>
                  <div className='delete'>
                    <button onClick={this.handleRemove.bind(booking)} >x</button>
                  </div>
                  You have booked 
                  Trip: <strong><a href={"IndividualTrip/"+booking.trip_id}>{booking.trip_name}</a></strong><br/>
                  Seats: <strong>{ booking.seats }</strong>
                </div>
              </td></tr>
          
             )
          })
    }

  render() {

    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    if (slider){
      output.innerHTML = slider.value;
      slider.oninput = function() {
        output.innerHTML = this.value;
      }
    }

    
    render(<div>
      <Account /><br/>
      </div>,
      document.getElementById('signin')
      );
      // const requiredLink = this.props.homeLink;
      //   if (requiredLink){
      //       render(<li><a href={'../'+requiredLink.link}>{requiredLink.text}</a></li>,
      //           document.getElementById('link')
      //           );
      //   }
      document.getElementById('only-home').innerHTML = '<span></span>';
      document.getElementById('home-description').innerText = "";
      document.getElementById('home-trips').innerHTML = ''
      document.getElementById('scroll-down').innerHTML = '';
    return (
      <div className="container">
          {this.props.userBookings[0] ?
            <div data-aos="fade-down">
              <center>
                <h1>
                  Bookings
                </h1>
                    <table className='mytable table table-striped'>
                        <tbody>
                          {this.renderBookings()}
                        </tbody>
                      </table>
              </center>
            </div>
          :""}
        <header>
        <center>
          <div className=' translate'>
          <h1>Trips</h1>
          <div className='search-form-div'>
          <form className='search-form' onSubmit={this.handleSubmit.bind(this)}>
          <div class="slidecontainer search-fields">
          Price Range:
            <input type="range" min="500" max="50000" defaultValue='50000' ref='priceRange' class="slider" id="myRange"/>
            <p>Rs. <span id="demo"></span></p>
          </div>
          <div class="form-group search-fields">
            Location: <br/>
            <input type='text' placeholder='Locations' ref='search' list="cities"/>
              <datalist id="cities">
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
              </datalist>
              </div> 
              <div className='search-fields'>
              Filter Dates: <br/>
                <input
                  type="date"
                  ref="date"
                />
              </div>
              <div className='search-fields'><br/>
                <button type='submit'>Search</button>
              </div>
          </form>
          </div>
          </div>
          <div className='clear-end'></div>
        </center>
        </header>
        <ul className='trips' id='render-trips'>
          {this.renderTrips(this.props.trips)}
        </ul>
        <br></br>
        <div className='clear-end'></div>
      </div>
    );
    }
  }

  export default withTracker(() => {
    Meteor.subscribe('trips');
    Meteor.subscribe('userTripBookings');
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        trips: Trips.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),   
        userBookings: UserTripBookings.find({}).fetch()
    };
  })(App);