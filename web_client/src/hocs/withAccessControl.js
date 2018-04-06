import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { checkCredentials } from '../lib/check-auth';

const withAccessControl = (WrappedComponent) => {
  class AccessControl extends Component {
    componentWillMount() {
      // console.log("RESTRICTED COMPONENT WILL MOUNT")
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps)
      }
    }

    checkAuthentication(params) {
      const { history, dispatch, } = params
      console.log("CHECKING AUTHENTICATION")
      // console.log(dispatch)
      if(!checkCredentials(dispatch)) {
        // console.log("credentials not found")
        // console.log(params)
        history.replace({ 
          pathname: '/login', 
          redirect: params.location.pathname,
        })
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return withRouter(connect()(AccessControl))
}

export default withAccessControl
