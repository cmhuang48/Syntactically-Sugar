import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}!</h3>
      <img src="https://64.media.tumblr.com/253352d1d269deb475da054150d11385/d439913b40336189-ce/s1280x1920/402e16c5e579e2a7acda2a24a258d764825dc228.pnj" className="homepic"/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
