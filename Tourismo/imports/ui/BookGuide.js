import React, { Component } from 'react';
import {GuideBookings, AcceptedRequests} from '../api/guide.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Account from './Account';
// import {HomeLinks} from '../api/home.js'
import { render } from 'react-dom';


class BookGuide extends Component {

    handleSubmit(event) {
        event.preventDefault();
        const today = new Date();
        // Find the text field via the React ref
        const guide = {
            userId: Meteor.userId(),
            destination : this.refs.destination.value,
            days : this.refs.days.value,
            hours : this.refs.hours.value,
            date : this.refs.date.value,
            departure : this.refs.departure.value,
            additionalInformation : this.refs.additionalInformation.value,
            pickup: this.refs.pickup
        };
        var flag = true;
        const date = new Date(guide.date);
        if (today > date){
          flag = false;
          this.refs.incorrectDate.replaceWith("Enter the future date");
        }
        if ((guide.days < 0) & (guide.hours<0)){
          flag = false
          this.refs.incorrectDays.replaceWith('Enter valid number of days or hours');
        }
        const cost = guide.days * 1000 + guide.hours * 300;
        if (flag == true){
            var book = confirm("Do you want to book guide for Rs. "+cost+" ?");
            if( book == true ) {
               Meteor.call('guideBookings.book', guide);   
            }   
        }
    
        // Clear form
        this.refs.destination.value = '';
        this.refs.days.value = '0';
        this.refs.date.value = '';
        this.refs.hours.value = '';
        this.refs.departure.value = '';
        this.refs.additionalInformation.value = '';
      }  
    handleRemove(){
        var remove = confirm("Sure you want to remove this?");
        if( remove == true ) {
            Meteor.call('guideBookings.remove', this._id);
        }
    }

    renderBookings(){
        const bookings = this.props.guideBookings;
        return(bookings.map((booking)=>{
            const cost = booking.days * 1000 + booking.hours * 300;
            return(
                <tr><td><div className='booking'>
                    <div className='delete'>
                        <button type='button' onClick={this.handleRemove.bind(booking)}>x</button>
                    </div>
                    Destination: <b><span className='trip-data'>{booking.destination}</span></b> <br/>
                    Cost: <span className='trip-data'>{cost} </span> <br/>
                    Days: <b><span className='trip-data'>{booking.days}</span></b><br/>
                    hours: <b><span className='trip-data'>{booking.hours}</span></b><br/>
                    Date: <b><span className='trip-data'>{booking.date}</span></b><br/>
                    Departure: <b><span className='trip-data'>{booking.departure}</span></b><br/>
                    {booking.pickup? <div>Pickup: <b><span className='trip-data'>{booking.pickup} </span> </b> </div> :""}
                    additionalInformation: <b><span className='trip-data'>{booking.additionalInformation}</span></b><br/>
                </div>
                </td></tr>
            )
        })
        )
    }

    renderAcceptedRequests(){
        const acceptedRequests = this.props.acceptedRequests;
        return(acceptedRequests.map((acceptedRequest)=>{
            const cost = acceptedRequest.days * 1000 + acceptedRequest.hours * 300;
            return(
                <tr><td><div className='acceptedRequest' >
                    Your request is accepted by <b><span className='trip-data'>{acceptedRequest.guide_name}</span></b>.<br/>
                    Phone number is <b><span className='trip-data'>{acceptedRequest.guide_phone}</span></b><br/>
                    CNIC Number is <b><span className='trip-data'>{acceptedRequest.guide_cnic}</span></b><br/>
                    For the following booking<br/>
                    <div>
                    destination: <b><span className='trip-data'>{acceptedRequest.destination}</span></b> <br/>
                    Cost: <span className='trip-data'>{cost} </span> <br/>
                    Days: <b><span className='trip-data'>{acceptedRequest.days}</span></b><br/>
                    hours: <b><span className='trip-data'>{acceptedRequest.hours}</span></b><br/>
                    Date: <b><span className='trip-data'>{acceptedRequest.date}</span></b><br/>
                    {acceptedRequest.departure? <div>departure: <b><span className='trip-data'>{acceptedRequest.departure}</span></b><br/></div> :""}
                    {acceptedRequest.pickup? <div>Pickup: <b><span className='trip-data'>{acceptedRequest.pickup} </span> </b> </div> :""}
                    additionalInformation: <b><span className='trip-data'>{acceptedRequest.additionalInformation}</span></b><br/>
                    </div>
                </div>
                </td></tr>
            )
        })
        )
    }

    render() {
        console.log("accepted requests:", this.props.acceptedRequests);
        // console.log("accepted requests:", this.props.guideBookings);
        render(<div>
            <Account /><br/>
          </div>,
          document.getElementById('signin')
          );
        document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        
        return(
            <div>
                <center><h1 data-aos="fade-up">Book Tour Guide</h1></center>
                <div className='bookings-right'>
                <section className="section contact-section">
                            {/* <div className="container-contact"> */}
                                <div >
                                <div data-aos="fade-up">
                                    <div>{this.props.acceptedRequests[0] ? 
                                    <center><h3>Your Accepted Requests</h3></center>:""}
                                    <center>
                                        <table className='mytable table table-striped'>
                                            <tbody>
                                                {this.renderAcceptedRequests()}
                                            </tbody>
                                        </table>
                                    </center>
                                    {this.props.guideBookings[0] ?
                                    <center><h3>Pending Requests</h3></center> :""}
                                    {/* <ul> */}
                                    <center><table className='mytable table table-striped'>
                                        <tbody>
                                            {this.renderBookings()}
                                        </tbody>
                                    </table>
                                    </center>
                                    {/* </ul> */}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        {/* </div> */}
                    </section>
                </div>
                   <center>
                       {/* <h1>Book Tour Guide</h1> */}
                    { Meteor.userId() ?
                    <div className='form-left'>
                        <section className="section contact-section">
                            {/* <div className="container-contact"> */}
                                <div>
                                <div data-aos="fade-up">
                                    {/*                                       
                                        <form action="#" method="post" className="bg-white p-md-5 p-4 mb-5" onSubmit={this.onSubmit.bind(this)}>
                                        <div className="row">
                                            <div className="col-md-12 form-group"></div> */}

                                    <form className="bg-white p-md-5 p-4 mb-5 hire-guide" onSubmit={this.handleSubmit.bind(this)} >
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                    <input autoComplete
                                                    type="text"
                                                    ref="destination"
                                                    list='cities'
                                                    className="form-control "
                                                    placeholder='Destination that you want to explore'
                                                    />
                                                    <datalist id="cities">
                                                        <option value="" disabled defaultValue>Destination that you want to explore</option>
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
                                                        <option>    Swat    </option>
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
                                                    <div className="col-md-12 form-group">
                                                        {/* <div className='form-field'>Number of Days you want to hire guide for:</div>  */}
                                                        <input
                                                        type="number"
                                                        ref="days"
                                                        placeholder="Number of Days"
                                                        className="form-control "
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group">
                                                        {/* <div className='form-field'>
                                                        Except for the number of days mentioned above enter the hours you want to hire guide for (days+hours = total time):
                                                        </div>  */}
                                                        <input
                                                        type="number"
                                                        ref="hours"
                                                        placeholder="Number of Hours additional to above days"
                                                        className="form-control "
                                                        />
                                                        {/* <br/><p className='form-instruction' color='grey'><em>if you want a person for 3 hours only enter 0 for days and 3 for hours.</em></p> */}
                                                        <div className='error'>
                                                        <span ref='incorrectDays' ></span></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group">                                          
                                                    {/* <div className='form-field'>Date: </div>   */}
                                                        <input
                                                        type="date"
                                                        ref="date"
                                                        placeholder='Date'
                                                        className="form-control "
                                                        /><em>Enter Starting date for more than one day</em><br/>
                                                        <div className='error'>
                                                        <span ref='incorrectDate' className='error' ></span></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group">                                          
                                                    {/* <div className='form-field'>Date: </div>   */}
                                                        <input
                                                        defaultValue="12:00"
                                                        type="time"
                                                        ref="time"
                                                        placeholder='Pick Up Time'
                                                        className="form-control "
                                                        />
                                                        <div className='error'>
                                                        <span ref='incorrectDate' className='error' ></span></div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group">
                                                        {/* <div className='form-field'>Do you want to take the guide to another destination? If so enter the destination you will departure from: </div>  */}
                                                        <input
                                                        type="text"
                                                        ref="departure"
                                                        placeholder="If traveling to another destination. Enter departure destination"
                                                        className="form-control "
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group">
                                                        <input autoComplete
                                                        type="text"
                                                        ref="pickup"
                                                        list='pickup'
                                                        className="form-control "
                                                        placeholder='Pickup Location'
                                                        />
                                                        <datalist id="pickup">
                                                            <option value="" disabled defaultValue>Pickup Location</option>
                                                            <option>    Bus Stop  	</option>
                                                            <option>	Airport 	</option>
                                                            <option>	Train Station 	</option>
                                                            <option>	Other	</option>
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 form-group">                                         
                                                    {/* <div className='form-field'>Any other information you want to tell the guide beforehand:</div>  */}
                                                        <input
                                                        type="text"
                                                        ref="additionalInformation"
                                                        placeholder="Any other information you want to tell the guide beforehand"
                                                        className="form-control "
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <input type="submit" value="Book" className="btn btn-primary"/>
                                                    </div>
                                                </div>
                                                {/* <button type="submit">Submit</button>    */}
                                            </form>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </section>
                        </div>
                    : 
                    <center>
                        <div className='have-to-login'>                  
                            <h3>
                                
                                You need an account. <br/><br/>
                                <a href='login'>Login</a> or <a href='Signup'>Signup</a>
                            </h3>
                        
                        </div>
                    </center>
                        }
                        </center>

                {/* </div>  */}
                <div className='clear-end'></div>
            </div>
            
        )
    };
};
export default withTracker(() => {
    Meteor.subscribe('guideBookings');
    Meteor.subscribe('acceptedRequests');
    // Meteor.subscribe('homeLinks');
    return {
        // homeLink: HomeLinks.findOne({}),
        guideBookings: GuideBookings.find({owner:Meteor.userId()}, { sort: { createdAt: -1 } }).fetch(),
        acceptedRequests: AcceptedRequests.find({guide_id: { $ne: Meteor.userId() }}, { sort: { createdAt: 1 } }).fetch(),
        currentUser: Meteor.user(),
    };
  })(BookGuide);