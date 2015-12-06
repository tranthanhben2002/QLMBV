import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import{initObject, renderField, preprocess, setValue, checkRequire, preprocessPost} from '../../../meta';
import * as khachhangActions from '../../../actions/khachhang/khachhangActions';

@connect(state =>({
  error: state.khachhang.postError,
  message: state.khachhang.message,
  item: state.khachhang.editItem
}), {...khachhangActions})
export default class EditKH extends Component {
  static propTypes = {
    id: PropTypes.string,
    item: PropTypes.object,
    meta: PropTypes.object,
    error: PropTypes.object,
    message: PropTypes.bool,
    postItem: PropTypes.func.isRequired,
    getItem: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }
  state = {
    item: initObject(this.props.meta) || {},
    edited: false
  }
  componentWillMount() {
    if(this.props.id){
      this.props.getItem(this.props.id);
    }else{
      this.props.reset();
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.item){
      this.setState({
        item: nextProps.item,
        edited: false
      })
    }else{
      this.setState({
        item: initObject(this.props.meta) || {},
        edited: false
      })
    }
  }
  handleChange(){
    let obj = this.state.item;
    let addr = event.target.dataset.addr;
    let value = event.target.value;
    this.setState({
      item: setValue(obj, addr, value),
      edited: true,
      submited: false
    })
  }
  onSubmit(){
    if(checkRequire(this.props.meta, this.state.item)){
      this.setState({
        submited: true
      })
    }else {
      this.props.postItem(preprocessPost(this.state.item, this.props.meta));
    }
  }
  onClose(){
    if(this.state.edited){
      let cf = confirm("Bạn chưa lưu thay đổi, bạn có muốn Close không?");
      if(cf) {
        this.props.close();
      }
    }else{
      this.props.close();
    }
  }
  render() {
    const {item, edited, submited} = this.state;
    const {meta, error, message} = this.props;
    const metaPP = preprocess(meta);
    const fieldRender = renderField(item, metaPP, this, true) || [];
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h4>Khách Hàng</h4>
          </div>
          <div className="col-md-8 flex-right">
          {submited ? <p className='help-block required'>
              {checkRequire(metaPP, item)}&nbsp;&nbsp;
            </p>:null}
          <button className='btn btn-warning' onClick={::this.onSubmit} disabled={(edited? '':'disabled')}>
          {"Sửa"}
          </button>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 boder-right">
                {fieldRender}
              </div>
              <div className="col-md-6">
                Huong dan hay note gi cung duoc
              </div>
            </div>
          </div>
        </div>
        <br/>
        <hr/>
        <div className="row">
          <div className="col-md-6">
          <button className='btn btn-warning' onClick={::this.onSubmit} disabled={(edited? '':'disabled')}>
          {"Sửa"}
          </button>
          {(message && !edited)? (message === true?
            <p className='help-block success'>
            {"Cập nhật thành công!!"}
            </p>:
            <p className='help-block required'>
            {"Cập nhật thất bại!"}
            </p>
            ):null}
          {submited ? <p className='help-block required'>
              {checkRequire(metaPP, item)}
            </p>:null}

          </div>
          <div className="col-md-6">
            <button className ='btn  pull-right' onClick={::this.onClose}>Đóng</button>
          </div>
        </div>
      </div>
    );
  }
}
