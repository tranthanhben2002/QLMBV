import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default
class View extends Component {
  static propTypes = {
    meta: PropTypes.object,
    item: PropTypes.object,
    type: PropTypes.string,
    close: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
  }
  render() {

    switch(type){
      case "khachhang":
        return <ViewKH {...this.props}></ViewKH>;
      case "pmh":
        return <ViewPMH {...this.props}></ViewPMH>;
      default:
        return (<div></div>);
    }
  }
}
export class ViewKH extends Component {
  static propTypes = {
    meta: PropTypes.object,
    item: PropTypes.object,
    close: PropTypes.func.isRequired
    // edit: PropTypes.func.isRequired
  }
  render(){
    const {meta, item, close} = this.props;
    console.log("viewKH", this.props);
    let info = [];
    for(const key in meta){
      const field = meta[key];
      info.push(
        <div className="info-group" key={key}>
          <div className="row">
            <div className="col-md-3 align-right">
              <span>{field.label + ": "}</span>
            </div>
            <div className="col-md-9">
              <p className={field.up? 'uppercase':''}>{(item[key]||'') + ' ' + (field.unit||'')}</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="info">
        <h3 className="info-header">Thông Tin Khách Hàng</h3>
        <hr/>
        <div className="row">
          <div className="col-md-12">
           {info}
          </div>
        </div>
            <hr/>
        <div className="row">
          <div className="col-md-6">
          <button className ='btn  btn-warning' onClick={()=>this.props.edit(item.khid)}>Edit</button>
          </div>
          <div className="col-md-6">
            <button className ='btn  pull-right' onClick={()=>this.props.close()}>Close</button>
          </div>
        </div>
      </div>);
  }
}
