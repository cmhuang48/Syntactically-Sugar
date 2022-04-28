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
      <div>
        <h1>User Info TBD</h1>
        <form onSubmit={onSubmit}>
          <input name='username' value={username} placeholder='Enter username' onChange={onChange} />
          <input name='firstName' value={firstName} placeholder='Enter first name' onChange={onChange} />
          <input name='lastName' value={lastName} placeholder='Enter lastName' onChange={onChange} />
          <input name='address1' value={address1} placeholder='Enter address1' onChange={onChange} />
          <input name='address2' value={address2} placeholder='Enter address2' onChange={onChange} />{address2}
          <input name='city' value={city} placeholder='Enter city' onChange={onChange} />
          <input name='state' value={state} placeholder='Enter state' onChange={onChange} />
          <input name='zip' value={zip} placeholder='Enter zip' onChange={onChange} />
          <input name='country' value={country} placeholder='Enter country' onChange={onChange} />
          <button>Save</button>
        </form>
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