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
        };
        // for email verification:    https://docs.meteor.com/api/passwords.html#Accounts-createUser
        event.preventDefault();
        const userId = Meteor.user()._id
        Meteor.call('user.addFields', userId, fields);
        this.props.history.push("../")
      }

    render() {
        document.getElementById('only-home').innerHTML = '<span></span>';
        return(
            <div>
                <h1>Signup as Company to continue</h1>
                <div id='sign-up-form'>
                    <form className="new-trip" onSubmit={this.onSubmit.bind(this)} >
                        Full Name: 
                        <input type="text" ref="name" placeholder="Enter your full name"/>
                        Contact Number:
                        <input type="number" ref="phone" placeholder="Enter your Phone number"/><br/>
                        Address
                        <input type="text" ref="address" placeholder="Enter your address"/><br/>
                        CNIC Number:
                        <input type="number" ref="cnic" placeholder="Enter your CNIC number"/><br/>
                        Company Name:
                        <input type="text" ref="company" placeholder="Enter your company name"/><br/>
                        City:
                        <div class="form-group">
                        {/* <label for="sel1" >Departure destination:</label> */}
                        <select class="form-control" ref='city' id="sel1">
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
                        </select>
                        </div> 
                        {/* <input type="text" ref="city" placeholder="Enter your city"/><br/> */}
                        License Number: 
                        <input type="number" ref="license"/><br/>
                        Website or Social media profile link:
                        <input type="text" ref="link" placeholder="Enter your profile link"/><br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className='clear-end'></div>

            </div>
        );
    };
};
export default (SignupCompany);