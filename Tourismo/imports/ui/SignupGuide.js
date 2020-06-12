import React, { Component } from 'react';
import '../api/accounts.js';

class SignupGuide extends Component {
    onSubmit(event) {
        const fields = {
            name: this.refs.name.value,
            age: this.refs.age.value,
            phone: this.refs.phone.value,
            cnic: this.refs.cnic.value,
            address: this.refs.address.value,
            experience: this.refs.experience.value,
            expertise: this.refs.expertise.value,
            city: this.refs.city.value,
        };

        event.preventDefault();
        const userId = Meteor.user()._id
        Meteor.call('user.addFields', userId, fields);
        window.location.pathname = '/';
    }

    render() {
        document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div className='form-div'>
            {/* <center> */}
        <section className="section contact-section">
        <div className="container-contact">

        <div className="row">
                  <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
          </div>
        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6" data-aos="fade-up">    
            <form action="#" method="post" className="bg-white p-md-5 p-4 mb-5" onSubmit={this.onSubmit.bind(this)}>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                  <input type="text" ref="name" placeholder="Full Name" className="form-control " />
                </div>
                </div>
                <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                  <input type="text" ref="age" placeholder="Age" className="form-control "/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                <input type="tel" ref="phone" placeholder="Phone#" className="form-control "/>
                </div>
                </div>
                <div className="row">
               <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                  <input type="number" ref="cnic" placeholder="CINC#" className="form-control "/>
                </div>
                </div>
                <div className="row">
               <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                  <input type="text" ref="address" placeholder="Address" className="form-control "/>
                </div>
                </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                {/* <input type="text" ref="city" placeholder="City" className="form-control "/> */}
                  <select className="form-control" ref='city' id="sel1">
                        <option value="" disabled selected>City</option>
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
                        </select></div>
              </div>

               {/* <div className="row">
                <div className="col-md-12 form-group">
                 <input type="text" ref="city" placeholder="City" className="form-control "/>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                 <input type="text" ref="experience" placeholder="Past Experience" className="form-control "/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                 <input type="text" ref="expertise" placeholder="Expertise" className="form-control "/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 form-group">
                  <input type="submit" value="Sign Up" className="btn btn-primary"/>
                </div>
              </div>
            </form>
        </div>
                  <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
          </div>
        </div>
      </div>
    </section>
    {/* </center> */}
            </div>
        );
    };
};
export default (SignupGuide);