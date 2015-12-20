import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as loaivaiActions from '../../actions/loaivaiActions';
import * as layoutActions from '../../actions/layoutActions';
import {THead, TBody, TFoot} from '../table/row';
import {Pagination} from '../table/pagination';
import {isLoaded, loadList as loadLV} from '../../actions/loaivaiActions';
import EditLV from './Editor/EditLV';
import {ViewLV} from './Editor/ViewFull';
import {Style} from '../Style';
import Modal from '../layout/Modal';

@connect(
  state =>({
    listLV: state.loaivai.list,
    paging: state.loaivai.paging,
    error: state.loaivai.error,
    loading: state.loaivai.loading,
    meta: state.meta.loaivai,
    reload: state.loaivai.reloadList
  }),
  {...loaivaiActions, ...layoutActions})

export default
class List extends Component{
  static propTypes = {
    listLV: PropTypes.array,
    error: PropTypes.object,
    paging: PropTypes.object,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    reload: PropTypes.bool,
    loadList:PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
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
      opt.page = 0;
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
      this.props.openModal(true);
      this.setState({idEdit: id, openEdit: true, openView: false});
    }
  }
  editModal() {
    this.props.openModal(!this.state.openEdit);
    this.setState({openEdit: !this.state.openEdit})
  }
  render(){
    const {listLV, paging, meta} = this.props;
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
                <table id="example" className="table display preline dataTable" cellSpacing="0" width="100%" role="grid" aria-describedby="example_info" style={{"width": "100%"}}>
                  <thead>
                    <THead meta={meta} sort={options.sort} sortFunc={::this.sortField} ></THead>
                  </thead>
                  <tfoot>
                    <TFoot meta={meta} ></TFoot>
                  </tfoot>
                  <tbody>
                    {listLV && listLV.map((item, index) =>{
                      return(
                        <TBody item={item} index={index} sort={options.sort} meta={meta} paging={paging} key={index} view={::this.viewItemFull} edit={::this.editItem}></TBody>
                      )
                    })}
                  </tbody>
                </table>
                {openView?
                  <Modal  modalStyle={Style.content_50}
                  overlayStyle= {Style.overlay}
                  close={::this.viewModal}
                  overlayClassName='modaldumb modalOverlay modalOverlay--after-open '
                  modalClassName='dumb modalContent modalContent--after-open '
                  >
                    <ViewLV meta={meta} item={itemView} close={::this.viewModal} edit={::this.editItem}></ViewLV>
                  </Modal> : null}
                  {openEdit?
                  <Modal  modalStyle={Style.content_40}
                  overlayStyle= {Style.overlay}
                  close={::this.editModal}
                  overlayClassName='modaldumb modalOverlay modalOverlay--after-open '
                  modalClassName='dumb modalContent modalContent--after-open '
                  >
                    <EditLV id={idEdit} close={::this.editModal} ></EditLV>
                  </Modal> : null}
                <div className="dataTables_info" id="example_info" role="status" aria-live="polite">Hiển thị từ {paging && paging.page * paging.page_size+ 1} đến {paging && paging.page * paging.page_size+ listLV.length} của {paging && paging.total}  mục.</div>
                <Pagination load={::this.paginationLoad} paging={paging}></Pagination>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
