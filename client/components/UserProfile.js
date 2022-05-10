import React from "react";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert'
import Box from "@material-ui/core/Box"

import { updateUser } from "../store";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.username,
      firstName: this.props.auth.firstName ? this.props.auth.firstName : "",
      lastName: this.props.auth.lastName ? this.props.auth.lastName : "",
      address1: this.props.auth.address1 ? this.props.auth.address1 : "",
      address2: this.props.auth.address2 ? this.props.auth.address2 : "",
      city: this.props.auth.city ? this.props.auth.city : "",
      state: this.props.auth.state ? this.props.auth.state : "",
      zip: this.props.auth.zip ? this.props.auth.zip : "",
      country: this.props.auth.country ? this.props.auth.country : "",
      alert:false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(){
    if(this.state.alert) setTimeout(()=>this.setState({alert:false}), 3000)
  }

  componentWillUnmount(){
    this.setState({alert:false})
  }

  onSubmit(ev) {
    const {id} = this.props.auth 
    ev.preventDefault();
    console.log(this.state)
    this.props.updateUser({id:id,...this.state});
    this.setState({alert:true})
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      alert
    } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="row">
        <h1 className="font-effect-shadow-multiple">
          {username[0].toUpperCase() + username.slice(1)}'s info
        </h1>
        <div className="borderinfo">
          <form onSubmit={onSubmit}>
            <p>
              Username: {}
              <input
                name="username"
                value={username}
                placeholder="Enter username"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              First Name: {}
              <input
                name="firstName"
                value={firstName}
                placeholder="Enter first name"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              Last Name: {}
              <input
                name="lastName"
                value={lastName}
                placeholder="Enter lastName"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              Address: {}
              <input
                name="address1"
                value={address1}
                placeholder="Enter address1"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              Address 2: {}
              <input
                name="address2"
                value={address2}
                placeholder="Enter address2"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              City: {}
              <input
                name="city"
                value={city}
                placeholder="Enter city"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              State: {}
              <input
                name="state"
                value={state}
                placeholder="Enter state"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              Zip: {}
              <input
                name="zip"
                value={zip}
                placeholder="Enter zip"
                onChange={onChange}
                className="input1"
              />
            </p>
            <p>
              Country: {}
              <input
                name="country"
                value={country}
                placeholder="Enter country"
                onChange={onChange}
                className="input1"
              />
            </p>
            <button className="submitButton">Update</button>
          </form>
          {alert?
            <Box sx={{ width: '100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10px' }} spacing={2}>
              <Alert severity="success">User information updated!</Alert>
            </Box>:null}
          <br />
        </div>
      </div>
    );
  }
}

const mapState = ({ auth }) => ({ auth });

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

export default connect(mapState, mapDispatch)(UserProfile);
