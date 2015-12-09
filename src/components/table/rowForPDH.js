import React, {Component, PropTypes} from 'react';
import {formatDate, numeral} from '../../meta';

export class THead extends Component {
  static propTypes = {
    meta: PropTypes.object
  }
  render(){
    let thList = [];
    for(let key in this.props.meta){
      let classField = '';
      let field = this.props.meta[key];
      if(field.view === false){
        continue;
      }
      thList.push(
        <th className={classField} key={field.name} tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" >{field.label}</th>
      );
    }
    return (
      <tr role="row">
        <th key="stt" tabIndex="0" aria-controls="example" >#</th>
        {thList}
        <th key="control" className="group-edit">
          <button className="btn btn-success btn-table btn-in-th" title="Add" >
            <i className="fa fa-plus"/>
          </button>
        </th>
      </tr>
    )
  }
}
export class TBody extends Component {
  static propTypes = {
    meta: PropTypes.object,
    sort: PropTypes.string,
    item: PropTypes.object,
    // view: PropTypes.func.isRequired,
    // edit: PropTypes.func.isRequired
  }
  render(){
    const {meta, sort, item, index, paging, view, edit} = this.props;
    let trList = [];
    for(let key in meta){
      let classField = '';
      let field = meta[key];
      if(field.view === false){
        continue;
      }
      if(field.sort){
        if(sort === field.name){
          classField = "sorting_1";
        }else if(sort === "-"+field.name){
          classField = "sorting_1";
        }
      }

      if(field.type === "content"){
        classField += " dt-content";
      }
      if(field.up){
        classField += " uppercase";
      }
      if(field.type === "date"){
        trList.push(
          <td className={classField} key={field.name} >{formatDate(item[key])}</td>
        );
      }else if(field.type ==="number"){
        // classField += " dt-body-right";
        trList.push(
        <td className={classField} key={field.name} >{numeral(item[key]).format('0,0')+(field.unit|| '')}</td>
        );
      }else{
        trList.push(
        <td className={classField} key={field.name} >{item[key]}</td>
        );
      }

    }
    return (
      <tr role="row" className={index%2===1 ? "even":"odd"}>
        <td>{paging.page*paging.page_size+1+index}</td>
        {trList}
        <td key='control' className="group-edit">
          <button className="btn btn-warning btn-table" title="View full" onClick={view?  view(item): function(){}}>
            <i className="fa fa-eye"/>
          </button>
          <button className="btn btn-success btn-table" title="Edit" onClick={edit?  edit(item.id): function(){}}>
            <i className='fa fa-pencil fa-fw'/>
          </button>
        </td>
      </tr>
    )
  }
}

export class TFoot extends Component {
  static propTypes = {
    meta: PropTypes.object
  }
  render(){
    const {meta} = this.props;
    let thList = [];
    for(let key in meta){
      let field = meta[key];
      let classField = '';
      if(field.view === false){
        continue;
      }
      // if(field.type === "number"){
      //   classField += " dt-body-right";
      // }
      thList.push(
        <th className={classField} key={field.name} tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" >{field.label}</th>
        );
    }
    return (
      <tr role="row">
        <th key="stt" tabIndex="0" aria-controls="example" >#</th>
        {thList}
        <th key="control"></th>
      </tr>
    )
  }
}
