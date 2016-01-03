import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as nhacungcapActions from '../../actions/nhacungcap/nhacungcapActions';

import {THead, TBody, TFoot} from '../table/rowForCN';
import {Pagination, PageShow} from '../table/pagination';
import * as layoutActions from '../../actions/layoutActions';
import Modal from '../layout/Modal';
import {ViewNCC} from './Editor/ViewFull';
import {Style} from '../Style';

@connect(
  state =>({
    listNCC: state.nhacungcap.list,
    paging: state.nhacungcap.paging,
    error: state.nhacungcap.error,
    meta: state.meta.congno.nhacungcap,
    loading: state.nhacungcap.loading,
    metaTTNCC: state.meta.thanhtoanNCC,
    reload: state.nhacungcap.reloadList
  }),
  {...nhacungcapActions, ...layoutActions})

export default
class List extends Component{
  static propTypes = {
    listNCC: PropTypes.array,
    error: PropTypes.object,
    paging: PropTypes.object,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    reload: PropTypes.bool,
    loadList:PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  }

  ComponentWillMount(){
    this.props.loadList(this.state.options);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.reload === true){
      this.props.loadList(this.state.options);
    }
  }
  state = {
    options :{
      page_size: 10,
      name: '',
      sort: 'id'
    },
    openView: false,
    openEdit: false,
    itemView: {},
    idEdit: ''
  }
  changePageSize(){
    let value = event.target.value;
    let opt = this.state.options;
    if(value !==this.state.pageSize){
      opt.page_size = value;
      opt.page = 0;
      this.props.loadList(opt);
      this.setState({options: opt});
    }
  }
  sortField(field){
    return ()=>{
      let opt = this.state.options;
      if(field !== opt.sort){
        opt.sort = field;
        this.props.loadList(opt);
        this.setState({options: opt});
      }else{
        opt.sort = "-" +field;
        this.props.loadList(opt);
        this.setState({options: opt});
      }
    }
  }
  searchField(){
    let value = event.target.value;
    let opt = this.state.options;
    if(value !== opt.name){
      opt.name = value;
      this.props.loadList(opt);
      this.setState({options: opt});
    }
  }
  paginationLoad(page){
    return () =>{
      let opt = this.state.options;
      opt.page = page;
      this.props.loadList(opt);
      this.setState({options: opt});
    }
  }
  viewItemFull(item){
    return ()=>{
      this.props.openModal(true);
      this.setState({itemView: item, openView: true});
    }
  }
  viewModal() {
    this.props.openModal(!this.state.openView);
    this.setState({openView: !this.state.openView})
  }
  editItem(id){
    return ()=>{
      console.log("id", id);
      this.props.openModal(true);
      this.setState({idEdit: id, openEdit: true});
    }
  }
  editModal() {
    this.props.openModal(!this.state.openEdit);
    this.setState({openEdit: !this.state.openEdit, openView: false})
  }
  render(){
    const {listNCC, paging, meta, metaTTNCC} = this.props;
    const {options, itemView, openView, openEdit, idEdit} = this.state;
    return (
      <div className="mbv-grid container-fluid" style={{"zIndex": "9999983"}}>
        <div className="row">
          <div className="col-xs-12">
            <div id="example_wrapper" className="dataTables_wrapper">
              <div className="dataTables_length" id="example_length" style={{"display": "inline-flex"}}>
                  <label className="line-height" style={{"display": "inline-flex"}}>
                  <span style={{"display": "inline-table"}}>{"Hiển thị "}</span>
                    <select name="example_length" aria-controls="example" className=" form-control" onChange={::this.changePageSize} value={this.state.options.page_size}>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>{" mục"}</label>
                </div>
              <div id="example_filter" className="dataTables_filter" style={{"display": "inline-flex", "float":"right"}}>
                <label className="line-height" style={{"display": "flex"}}>
                  <span style={{"display": "inline-table"}}>{"Tìm kiếm "}</span>
                  <input type="search" className="form-control " placeholder="Search Name" onChange={::this.searchField} aria-controls="example" value={options.name || ''}/>
                </label>
              </div>
              <table id="example" className="table display nowrap dataTable" cellSpacing="0" width="100%" role="grid" aria-describedby="example_info" style={{"width": "100%"}}>
                <thead>
                  <THead meta={meta} sort={options.sort} sortFunc={::this.sortField} ></THead>
                </thead>
                <tfoot>
                  <TFoot meta={meta} ></TFoot>
                </tfoot>
                <tbody>
                  {listNCC && listNCC.map((item, index) =>{
                    return(
                      <TBody item={item} index={index} sort={options.sort} meta={meta} paging={paging} key={index} view={::this.viewItemFull} ></TBody>
                    )
                  })}
                </tbody>
              </table>
              {openView?
                  <Modal  modalStyle={Style.content_80}
                  overlayStyle= {Style.overlay}
                  close={::this.viewModal}
                  overlayClassName='modaldumb modalOverlay modalOverlay--after-open '
                  modalClassName='dumb modalContent modalContent--after-open '
                  >
                    <ViewNCC meta={meta} item={itemView} metaTTNCC={metaTTNCC} close={::this.viewModal}></ViewNCC>
                  </Modal> : null}
              <PageShow paging={paging} length={listNCC &&listNCC.length} />
              <Pagination load={::this.paginationLoad} paging={paging}></Pagination>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
