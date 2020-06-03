import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {HomeLinks} from '../api/home.js'
import ReactDom from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { render } from 'react-dom';
import Account from './Account';



// Meteor.startup(() => {
//     render("renderRoutes()", document.getElementById('link'));
//   });

class Index extends Component {
    render(){
        // render(<div>
        //     <Account /><br/>
        //   </div>,
        //   document.getElementById('signin')
        //   );
        // render(<a href='../homeLink'> homelink</a>, document.getElementById('link'));
        
        return(
            <div></div>
        )
    }
    // ReactDOM.render(myelement, document.getElementById('root'));
    // render() {
    //     var ReactDOMServer = require('react-dom/server');
    //     ReactDOMServer.renderToString("element")
    //     console.log("Document from props: ", this.props);
    //     const requiredLink = this.props.homeLink;
    //     // ReactDOM.render(requiredLink, document.getElementById('link'));
    //     console.log("Links: ", requiredLink);
    //     const doc = document.getElementById('link');
    //     console.log("Document: ", document.getElementById('link'));
    //     return(
    //         <div><center>
    //             <h2 font = 'arial'>Welcome to Tourismo.<br/>
    //             How may we help you?<br/>
    //             Are you: <br/>
    //             <ul className='home'>
    //                 <li>
    //                     <a href="DisplayTrips">Looking for Trips</a>
    //                 </li>
    //                 <li>
    //                 {requiredLink ? <a href={requiredLink.link}>{requiredLink.link}</a> : ""}
    //                 </li>
    //             </ul>
    //             <h1>Here: {doc}</h1>
                
    //             </h2>
    //             </center>
    //         </div> 
    //     )
    // };
};
    export default withTracker(() => {
        Meteor.subscribe('homeLinks');
        return {
            homeLink: HomeLinks.findOne({}),
        };
      })(Index);
    