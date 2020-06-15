import React, { Component } from 'react';
import '../api/accounts.js';

class SignupCompany extends Component {
    onSubmit(event) {
        const fields = {
            name: this.refs.name.value,
            phone: this.refs.phone.value,
            address: this.refs.address.value,
            cnic: this.refs.cnic.value,
            link: this.refs.link.value,
            company: this.refs.company.value,
            city: this.refs.city.value,
            license: this.refs.license.value,
            intro: this.refs.intro.value,
        };
        // for email verification:    https://docs.meteor.com/api/passwords.html#Accounts-createUser
        event.preventDefault();
        const userId = Meteor.user()._id
        Meteor.call('user.addFields', userId, fields, (error, result) => {
            if (error){
                console.log("Error ", error);
            }
            else {
                window.location.pathname = '/';
            }
        });
      }

    render() {
        // document.getElementById('only-home').innerHTML = '<span></span>';
        document.getElementById('home-description').innerText = "";
        document.getElementById('home-trips').innerHTML = ''
        document.getElementById('scroll-down').innerHTML = '';
        return(
            <div>
            <section className="section contact-section">
                  <div className="row">
                  <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6" data-aos="fade-up">
                      
                      <form action="#" method="post" className="border border-primary bg-white p-md-5 p-4 mb-5 " onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                            <input type="text" ref="name" placeholder="Full Name" className="form-control " />
                            
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                            <input type="tel" ref="phone" placeholder="Phone#" className="form-control "/>
                          </div>
                        </div>
                    
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                            <input type="text" ref="address" placeholder="Address" className="form-control "/>
                          </div>
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
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
                                  <option>	Skardu	</option>
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
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                            <input type="text" ref="cnic" placeholder="CNIC#" className="form-control" pattern="[0-9]{13}"/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                            <input type="text" ref="company" placeholder="Company Name" className="form-control "/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                            <input type="text" rows='5' ref="intro" placeholder="Brief introduction of company" minLength='150' maxLength='500' className="form-control "/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                          <input type="number" ref="license" placeholder="License Number" className="form-control "/>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 form-group">
                          <input type="text" ref="link" placeholder="Profile Link" className="form-control "/>
                          </div>
                          <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6 form-group">
                            <input type="submit" value="Sign Up" className="btn btn-primary"/>
                          </div>
                          </div>
                      </form>

                    </div>
                  <div className="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                    </div>
                    
                  </div>
              </section>
            </div>
        );
    };
};
export default (SignupCompany);