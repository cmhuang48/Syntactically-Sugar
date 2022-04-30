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
        <h1 className="font-effect-shadow-multiple">{username}'s info</h1>
        <div className="column1">
        <div className="info">
        <p>User Name:</p>{username}
        <p>First Name:</p>{firstName}
        <p>Last Name:</p>{lastName}
        <p>Address 1:</p>{address1}
        <p>Address 2:</p>{address2}
        <p>City:</p>{city}
        <p>State:</p>{state}
        <p>Zip:</p>{zip}
        <p>Country:</p>{country}
        </div>
        </div>
        <div className="borderinfo">
        <form onSubmit={onSubmit}>
        <p> Username: </p>
          <input name='username' value={username} placeholder='Enter username' onChange={onChange} />
        <p> First Name: </p>
          <input name='firstName' value={firstName} placeholder='Enter first name' onChange={onChange} />
        <p>Last Name:</p>
          <input name='lastName' value={lastName} placeholder='Enter lastName' onChange={onChange} />
          <p>Address:</p>
          <input name='address1' value={address1} placeholder='Enter address1' onChange={onChange} />
        <p> Address 2:</p>
          <input name='address2' value={address2} placeholder='Enter address2' onChange={onChange} />
          <p> City:</p>
          <input name='city' value={city} placeholder='Enter city' onChange={onChange} />
        <p> State:</p>
          <input name='state' value={state} placeholder='Enter state' onChange={onChange} />
        <p> Zip:</p>
          <input name='zip' value={zip} placeholder='Enter zip' onChange={onChange} />
        <p> Country:</p>
          <input name='country' value={country} placeholder='Enter country' onChange={onChange} />
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