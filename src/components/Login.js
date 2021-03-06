import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions/userActions';
import {setValueLogin, validateEmail, parseError} from '../meta';


function checkRequire(user){
  user = user || {};
  if(!user.email){
    return "Vui lòng nhập email!"
  }else if(validateEmail(user.email)){
    return validateEmail(user.email);
  }
  if(!user.password){
    return "Vui lòng nhập password!"
  }
  return '';
}
class LoginPage extends Component {
  static propTypes = {
    error: PropTypes.object,
    login: PropTypes.func.isRequired
  }

  state = {
    user: {
      email:"",
      password:""
    },
    message:""
  }

  onSubmit(){
    event.preventDefault();
    let user = {};
    let refs = this.refs
    user.email = refs.email.getDOMNode().value.trim();
    user.password = refs.password.getDOMNode().value.trim();
    if(checkRequire(user)){
      this.setState({message: checkRequire(user)});
    }else{
      this.props.login(user);
    }
  }

  handleRequireEmail(){
    let mes = '';
    let user = this.state.user;
    if(!user.email){
      mes = "Vui lòng nhập email!"
    }else {
      mes = validateEmail(user.email);
    }
    this.setState({message: mes});
  }

  handleRequirePassword(){
    let mes = '';
    let user = this.state.user;
    if(!user.password){
      mes = "Vui lòng nhập password!"
    }
    this.setState({message: mes});
  }

  handleChange(event) {
    this.setState({ user: setValueLogin(event, this.state.user) });
  }

  render(){
    const {user, message}= this.state;
    let error = '';
    if(this.props.error){
      error = parseError(this.props.error.code);
    }
    let flag = checkRequire(user);
    return (
      <div className='page login'>
        <form onSubmit={::this.onSubmit}>
        <div className="logo"></div>
        <div className="login-block">
            <h1>Login</h1>
            <input id="username" type="email" data-addr='email' ref="email" placeholder='Email'
                  onChange={::this.handleChange} onBlur={::this.handleRequireEmail} />
            <input id="password" data-addr='password' ref="password" placeholder='Password'
                  type='password'
                  onChange={::this.handleChange} onBlur={::this.handleRequirePassword} />
            <button className='btn btn-success form-control' type='submit'  value='Login' disabled={flag ? 'disabled' : ''}>Submit</button>
        </div>
        </form>
      </div>
    )
  }
}
@connect (state =>({
  error: state.user.errorLogin
}))
export default class LoginPageContainer {
  static propTypes = {
    error: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  render(){
    const {error, dispatch} = this.props;
    return <LoginPage error={error} {...bindActionCreators(userActions, dispatch)}></LoginPage>
  }
}
