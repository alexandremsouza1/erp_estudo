import React, { Component } from "react";
import '../../../assets/css/Global/style.css'

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user" style={{"height": "250px"}}>
        <div className="image">
          <a src={this.props.bgImage} />
        </div>
        <div className="content">
          <div className="author">
            <a href="#">
              <img 
                src={this.props.avatar}
                alt="..."
                style={{"maxWidth": "80px", "maxHeight": "80px"}}
              />
              <h4 className="title" style={{"padding-top": "5px"}}>
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
