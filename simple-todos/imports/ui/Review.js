import React, { Component } from 'react';
import classnames from 'classnames';

export default class Trip extends Component {

  render() {
    const reviewClassName = classnames({
        review: this.props.review
    });
    return (
        <li className={reviewClassName}>
        <span className="text">
            <h4>Reviewer: {this.props.review.username}</h4>
            <strong>Rating: </strong> <br/>
                {this.props.review.rating == '1' ? <img width='5%' height='5%' id='star'src='/img/star.png' ></img> : ""}
                {this.props.review.rating == '2' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
                {this.props.review.rating == '3' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
                {this.props.review.rating == '4' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
                {this.props.review.rating == '5' ? <div>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    <img width='5%' height='5%' id='star'src='/img/star.png' ></img>
                    </div> : ""}
            <br/>
            <strong>Review: {this.props.review.remarks} </strong><br/>
        </span>
       </li>
    );
  }
}
