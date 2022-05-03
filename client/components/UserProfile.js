import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store';

class UserProfile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: this.props.auth.username,
      firstName: this.props.auth.firstName ? this.props.auth.firstName : '', 
      lastName: this.props.auth.lastName ? this.props.auth.lastName : '', 
      address1: this.props.auth.address1 ? this.props.auth.address1 : '', 
      address2: this.props.auth.address2 ? this.props.auth.address2 : '', 
      city: this.props.auth.city ? this.props.auth.city : '', 
      state: this.props.auth.state ? this.props.auth.state : '', 
      zip: this.props.auth.zip ? this.props.auth.zip : '', 
      country: this.props.auth.country ? this.props.auth.country : ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    this.props.updateUser(this.state);
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { username, firstName, lastName, address1, address2, city, state, zip, country } = this.state;
    const { onChange, onSubmit } = this;
    return (
    <div className= "row">
        <h1 className="font-effect-shadow-multiple">{username[0].toUpperCase() + username.slice(1)}'s info</h1>
        <div className="column1">
        <div className="info">
        <p>User Name:{username}</p>
        <p>First Name:{firstName}</p>
        <p>Last Name:{lastName}</p>
        <p>Address 1:{address1}</p>
        <p>Address 2:{address2}</p>
        <p>City:{city}</p>
        <p>State:{state}</p>
        <p>Zip:{zip}</p>
        <p>Country:{country}</p>
        </div>
        </div>
        <div className="borderinfo">
        <form onSubmit={onSubmit}>
        <p> Username:
          <input name='username' value={username} placeholder='Enter username' onChange={onChange} /></p>
        <p> First Name: 
          <input name='firstName' value={firstName} placeholder='Enter first name' onChange={onChange} /></p>
        <p>Last Name:
          <input name='lastName' value={lastName} placeholder='Enter lastName' onChange={onChange} /></p>
          <p>Address:
          <input name='address1' value={address1} placeholder='Enter address1' onChange={onChange} /></p>
        <p> Address 2:
          <input name='address2' value={address2} placeholder='Enter address2' onChange={onChange} /></p>
          <p> City:
          <input name='city' value={city} placeholder='Enter city' onChange={onChange} /></p>
        <p> State:
          <input name='state' value={state} placeholder='Enter state' onChange={onChange} /></p>
        <p> Zip:
          <input name='zip' value={zip} placeholder='Enter zip' onChange={onChange} /></p>
        <p> Country:
          <input name='country' value={country} placeholder='Enter country' onChange={onChange} /></p>
        </form>
        <br />
        <button> Update </button>
        </div>
      </div>
    );
  }
};

const mapState = ({ auth }) => ({ auth });

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    }
  };
};

export default connect(mapState, mapDispatch)(UserProfile);