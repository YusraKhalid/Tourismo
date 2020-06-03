import React, { Component } from 'react';
import classnames from 'classnames';

export default class Trip extends Component {

  render() {
    const reviewClassName = classnames({
        review: this.props.review
    });
    return (
        <div>
        {/* <div class="row"> */}
          <div class="col-md-4" data-aos="/fade-up" data-aos-delay="100">
            <div class="testimonial">
                <div className='reviews'>
              {/* <div class="reviewer-dp"> */}
                <img src={this.props.review.reviewer_dp} alt="Image placeholder" width='70px' height='70px' className="rounded-circle reviewer-dp"/>
                {/* </div> */}
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
              {/* <blockquote> */}
                <div className='review-remarks'>
                    <p>&ldquo;{this.props.review.remarks}&rdquo;</p>
                </div>
              {/* </blockquote> */}
              <p><em>&mdash; {this.props.review.username}</em></p>
              </div>
            </div>
          </div>
          {/* </div> */}

{/* 
        <li className={reviewClassName}>
        <span className="text">
            <div ><img className='reviewer-dp' src={this.props.review.reviewer_dp}></img></div>
            <h4>Reviewer: {this.props.review.username}</h4>
            <strong>Rating: {this.props.review.rating}</strong> <br/>
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
       </li> */}
       </div>
    );
  }
}
