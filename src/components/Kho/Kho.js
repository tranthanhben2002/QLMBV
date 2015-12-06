import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ListK from './List';
@connect(state =>({
  menuparse: state.layout.menuparse
}))
export default class Kho{
  static propTypes = {
    menuparse : PropTypes.object
  }
  render(){
    const {menuparse} = this.props;
    return <div className='inner '>
        <nav id="nav-header" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid mbv-nav">
            <div className="row">
              <div className="col-xs-3 visible-xs" ></div>
              <div className="col-xs-6 col-sm-4">
              <h4 style={{"lineHeight": "30px"}}>{menuparse[this.props.location.pathname]}</h4>
              </div>
              <div className="col-xs-3 col-sm-8">
                <div className="navbar-content pull-right">Logout</div>
              </div>
            </div>
          </div>
        </nav>
        <div id="body" className="">
        <div className="mbv-grid container-fluid" >
          <div className="row">
            <div className="col-xs-12">
              <div className="mbv-panel">
                <div className="mbv-panel-body">
                  <ListK></ListK>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  }
}
