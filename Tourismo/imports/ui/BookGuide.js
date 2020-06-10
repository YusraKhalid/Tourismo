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
        if (flag == true){
            Meteor.call('guideBookings.book', guide);      
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
            return(
                <tr><td><div className='booking'>
                    <div className='delete'>
                        <button type='button' onClick={this.handleRemove.bind(booking)}>x</button>
                    </div>
                    destination:<b>{booking.destination}</b> <br/>
                    Days:<b>{booking.days}</b><br/>
                    hours:<b>{booking.hours}</b><br/>
                    Date:<b>{booking.date}</b><br/>
                    departure:<b>{booking.departure}</b><br/>
                    additionalInformation:<b>{booking.additionalInformation}</b><br/>
                </div>
                </td></tr>
            )
        })
        )
    }

    renderAcceptedRequests(){
        const acceptedRequests = this.props.acceptedRequests;
        return(acceptedRequests.map((acceptedRequest)=>{
            return(
                <tr><td><div className='acceptedRequest' >
                    CNIC Number is <b>{acceptedRequest.guide_cnic}</b><br/>
                    For the following booking<br/>
                    <div>
                    destination:<b>{acceptedRequest.destination}</b> <br/>
                    Days:<b>{acceptedRequest.days}</b><br/>
                    hours:<b>{acceptedRequest.hours}</b><br/>
                    Date:<b>{acceptedRequest.date}</b><br/>
                    departure:<b>{acceptedRequest.departure}</b><br/>
                    additionalInformation:<b>{acceptedRequest.additionalInformation}</b><br/>
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
                                    {/* {this.props.guideBookings[0] ? */}
                                    {/* <center><h3>Pending Requests</h3></center> :""} */}
                                    {/* <ul> */}
                                    <center><table className='mytable table table-striped'>
                                        <tbody>
                                            {/* {this.renderBookings()} */}
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
                                                {/* <div className='form-field'>Destination that you want to explore:</div> */}
                                                    <input autoComplete
                                                    type="text"
                                                    ref="destination"
                                                    list='cities'
                                                    className="form-control "
                                                    placeholder='Destination that you want to explore'
                                                    />
                                                    <datalist id="cities">
                                                        <option value="" disabled defaultValue>Destination that you want to explore</option>
                                                        <option>	Alpūrai	</option>
                                                        <option>	Athmuqam	</option>
                                                        <option>	Attock City	</option>
                                                        <option>	Awārān	</option>
                                                        <option>	Ayubia	</option>
                                                        <option>	Babusar	</option>
                                                        <option>	Badīn	</option>
                                                        <option>	Bāgh	</option>
                                                        <option>	Bahāwalnagar	</option>
                                                        <option>	Bahāwalpur	</option>
                                                        <option>	Bannu	</option>
                                                        <option>	Bardār	</option>
                                                        <option>	Bārkhān	</option>
                                                        <option>	Batgrām	</option>
                                                        <option>	Bhakkar	</option>
                                                        <option>	Chakwāl	</option>
                                                        <option>	Chaman	</option>
                                                        <option>	Chārsadda	</option>
                                                        <option>	Chilās	</option>
                                                        <option>	Chiniot	</option>
                                                        <option>	Chitrāl	</option>
                                                        <option>	Dādu	</option>
                                                        <option>	Daggar	</option>
                                                        <option>	Dālbandīn	</option>
                                                        <option>	Dasu	</option>
                                                        <option>	Dera Allāhyār	</option>
                                                        <option>	Dera Bugti	</option>
                                                        <option>	Dera Ghāzi Khān	</option>
                                                        <option>	Dera Ismāīl Khān	</option>
                                                        <option>	Dera Murād Jamāli	</option>
                                                        <option>	Eidgāh	</option>
                                                        <option>	Faisalābād	</option>
                                                        <option>	Gākuch	</option>
                                                        <option>	Gandāvā	</option>
                                                        <option>	Ghotki	</option>
                                                        <option>	Gilgit	</option>
                                                        <option>	Gujrānwāla	</option>
                                                        <option>	Gujrāt	</option>
                                                        <option>	Gwādar	</option>
                                                        <option>	Hāfizābād	</option>
                                                        <option>	Hangu	</option>
                                                        <option>	Harīpur	</option>
                                                        <option>	Hyderābād City	</option>
                                                        <option>	Islamabad	</option>
                                                        <option>	Jacobābād	</option>
                                                        <option>	Jāmshoro	</option>
                                                        <option>	Jhang City	</option>
                                                        <option>	Jhang Sadr	</option>
                                                        <option>	Jhelum	</option>
                                                        <option>	Kalāt	</option>
                                                        <option>	Kandhkot	</option>
                                                        <option>	Karachi	</option>
                                                        <option>	Karak	</option>
                                                        <option>	Kashmir	</option>
                                                        <option>	Kasūr	</option>
                                                        <option>	Khairpur	</option>
                                                        <option>	Khānewāl	</option>
                                                        <option>	Khārān	</option>
                                                        <option>	Khushāb	</option>
                                                        <option>	Khuzdār	</option>
                                                        <option>	Kohāt	</option>
                                                        <option>	Kohlu	</option>
                                                        <option>	Kotli	</option>
                                                        <option>	Kumrat	</option>
                                                        <option>	Kundiān	</option>
                                                        <option>	Lahore	</option>
                                                        <option>	Lakki Marwat	</option>
                                                        <option>	Lārkāna	</option>
                                                        <option>	Leiah	</option>
                                                        <option>	Lodhrān	</option>
                                                        <option>	Loralai	</option>
                                                        <option>	Malakand	</option>
                                                        <option>	Mandi Bahāuddīn	</option>
                                                        <option>	Mānsehra	</option>
                                                        <option>	Mardan	</option>
                                                        <option>	Masīwāla	</option>
                                                        <option>	Mastung	</option>
                                                        <option>	Matiāri	</option>
                                                        <option>	Mehra	</option>
                                                        <option>	Miānwāli	</option>
                                                        <option>	Mīrpur Khās	</option>
                                                        <option>	Multān	</option>
                                                        <option>	Murree	</option>
                                                        <option>	Mūsa Khel Bāzār	</option>
                                                        <option>	Muzaffargarh	</option>
                                                        <option>	Nankāna Sāhib	</option>
                                                        <option>	Nārowāl	</option>
                                                        <option>	Nathia Gali	</option>
                                                        <option>	Naushahro Fīroz	</option>
                                                        <option>	Nawābshāh	</option>
                                                        <option>	Neelam	</option>
                                                        <option>	New Mīrpur	</option>
                                                        <option>	Nowshera	</option>
                                                        <option>	Okāra	</option>
                                                        <option>	Pākpattan	</option>
                                                        <option>	Panjgūr	</option>
                                                        <option>	Parachinār	</option>
                                                        <option>	Peshāwar	</option>
                                                        <option>	Pishin	</option>
                                                        <option>	Qila Abdullāh	</option>
                                                        <option>	Qila Saifullāh	</option>
                                                        <option>	Quetta	</option>
                                                        <option>	Rahīmyār Khān	</option>
                                                        <option>	Rājanpur	</option>
                                                        <option>	Rāwala Kot	</option>
                                                        <option>	Rāwalpindi	</option>
                                                        <option>	Rawlakot	</option>
                                                        <option>	Sādiqābād	</option>
                                                        <option>	Sāhīwāl	</option>
                                                        <option>	Saidu Sharif	</option>
                                                        <option>	Sānghar	</option>
                                                        <option>	Sargodha	</option>
                                                        <option>	Serai	</option>
                                                        <option>	Shahdād Kot	</option>
                                                        <option>	Sheikhupura	</option>
                                                        <option>	Shikārpur	</option>
                                                        <option>	Siālkot City	</option>
                                                        <option>	Sibi	</option>
                                                        <option>	Sukkur	</option>
                                                        <option>	Swābi	</option>
                                                        <option>	Tando Allāhyār	</option>
                                                        <option>	Tando Muhammad Khān	</option>
                                                        <option>	Tānk	</option>
                                                        <option>	Thatta	</option>
                                                        <option>	Timargara	</option>
                                                        <option>	Toba Tek Singh	</option>
                                                        <option>	Tolipeer	</option>
                                                        <option>	Turbat	</option>
                                                        <option>	Umarkot	</option>
                                                        <option>	Upper Dir	</option>
                                                        <option>	Uthal	</option>
                                                        <option>	Vihāri	</option>
                                                        <option>	Zhob	</option>
                                                        <option>	Ziārat	</option>
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
                                                        <input type="submit" value="Sign Up" className="btn btn-primary"/>
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