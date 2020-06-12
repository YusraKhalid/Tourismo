import React, { Component } from 'react';
import '../api/accounts.js';
import { withTracker } from 'meteor/react-meteor-data';
import { render } from 'react-dom';
import {HomeLinks} from '../api/home.js'

class Account extends Component {
    signout(event){
        console.log("signout")
        Meteor.logout()
        document.getElementById('link').innerHTML = '';
        return(
            <div>
                <a href='../Login'><button>Sign In</button></a>
            </div>
        )
      }
    //   renderprofile(){
    //     const user = this.props.currentUser.username;
    //     const profile = this.props.currentUser.profile;
    //       render(
    //         <h5>{profile?<img className='dp' src={profile.dp}></img>:""}<br/><div className='username'>{user}</div></h5>,
    //         this.document.getElementById('userdata')
    //       );
    //   }
    render() {
        const requiredLink = this.props.homeLink;
        if (requiredLink){
            // document.getElementById("guide-link").href = requiredLink;
            render(<a className='nav-link nav-item-mobile' href={'../'+requiredLink.link}>{requiredLink.text}</a>,
                document.getElementById('link')
                );
        }
        
        if (this.props.currentUser){
            const user = this.props.currentUser.username;
            const profile = this.props.currentUser.profile;
            document.getElementById('nav-custom').classList.add('nav-custom');
            // console.log("user", this.props.currentUser);
        return(
            // <div align='right' className='animated fadeInDownBig'>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    {/* <a class="nav-link" href='#'>  */}
                    <button className=' nav-link nav-item-mobile sign-button' onClick={this.signout.bind(this)}>Sign out </button>
                     {/* </a> */}
                </li>
                <li class="nav-item nav-item-mobile active">
                {profile?<img className='dp' src={profile.dp}></img>:""}<br/><br/>
                    <h5>
                        <div color='black' className='username'>{user}</div>
                    </h5>
                </li>
                {/* {this.renderprofile()} */}
            </ul>
        
                
                /* <h5>{profile?<img className='dp' src={profile.dp}></img>:""}<br/><div className='username'>{user}</div></h5>
                <button className='sign-button' onClick={this.signout.bind(this)}>Sign out</button> */
            // </div>
        );}
        else{
            const nav = document.getElementById('nav-custom')
            nav.classList.remove('nav-custom');
            nav.classList.add('not-loggin');
        return(
            // <div align='right'>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                    <a class="nav-link nav-item-mobile" href="../Login">Log In</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link nav-item-mobile" href="../Signup">Sign Up</a>
                </li>
                {/* <li class="nav-item active">
                <img className='dp' src=""></img> <br/><br/>
                    <h5>
                        <div color='black' className='username'></div>
                    </h5>
                </li> */}
                {/* <a href='../Login' className='sign-button'><button>Sign In</button></a> */}
            </ul>
            // </div>
        );}

    };
};
export default withTracker(() => {
    Meteor.subscribe('homeLinks');
    return {
        currentUser: Meteor.user(),
        homeLink: HomeLinks.findOne({}),
    };
  })(Account);
