import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ttkhActions from '../../actions/khachhang/ttkhActions';
import {THeadView, TBodyView, TFootView} from '../table/rowForTTKH';
import {Pagination, PageShow} from '../table/pagination';
import {isLoaded, loadList as loadTTKH} from '../../actions/khachhang/ttkhActions';
import * as layoutActions from '../../actions/layoutActions';
import * as giaodichActions from '../../actions/giaodichActions';
import Modal from '../layout/Modal';
import EditTTKH from './Editor/EditTTKH';
import {Style} from '../Style';
import {ViewTTKH} from './Editor/ViewFull';

@connect(
  state =>({
    listTTKH: state.thanhtoanKH.list,
    paging: state.thanhtoanKH.paging,
    error: state.thanhtoanKH.error,
    loading: state.thanhtoanKH.loading,
    reload: state.thanhtoanKH.reloadList,
    meta: state.meta.thanhtoanKH,
    listLV: state.giaodich.listLV,
    listK: state.giaodich.listK,
    listKH: state.giaodich.listKH,
  }),
  {...ttkhActions,...layoutActions, ...giaodichActions})

export default
class TTKH extends Component{
  static propTypes = {
    listTTKH: PropTypes.array,
    error: PropTypes.object,
    paging: PropTypes.object,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    loadList:PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  }

  static fetchData(store){
    if(!isLoaded(store.getState)){
      return store.dispatch(loadTTKH());
    }
  }
  componentWillMount(){
    this.props.loadLV();
    this.props.loadK();
    this.props.loadKH();
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
      sort: ''
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
      this.setState({idEdit: id, openEdit: true});
    }
  }
  editModal() {
    this.props.openModal(!this.state.openEdit);
    this.setState({openEdit: !this.state.openEdit, openView: false})
  }
  render(){
    const {listTTKH, paging, meta, listLV, listK, listKH} = this.props;
    const {options, itemView, openView, openEdit, idEdit} = this.state;
    let metagd = meta && meta.giaodich || {};

    return (
        <div className="mbv-grid container-fluid" style={{"zIndex": "9999983"}}>
          <div className="row">
            <div className="col-xs-12">
              <div id="example_wrapper" className="dataTables_wrapper">
                <div className="dataTables_length" id="example_length" style={{"display": "inline-flex"}}>
                  <label className="line-height" style={{"display": "flex"}}>Show
                    <select name="example_length" aria-controls="example" className=" form-control" onChange={::this.changePageSize} value={this.state.options.page_size}>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select> entries</label>
                </div>
                <div id="example_filter" className="dataTables_filter" style={{"display": "inline-flex", "float":"right"}}>
                  <label className="line-height" style={{"display": "flex"}}>Search:
                    <input type="search" className="form-control " placeholder="Search Name" onChange={::this.searchField} aria-controls="example" />
                  </label>
                </div>
                <table id="example" className="table display preline dataTable" cellSpacing="0" width="100%" role="grid" aria-describedby="example_info" style={{"width": "100%"}}>
                  <thead>
                    <THeadView meta={metagd} sort={options.sort} sortFunc={::this.sortField} />
                  </thead>
                  <tfoot>
                    <TFootView meta={metagd} />
                  </tfoot>
                  <tbody>
                    {listTTKH && listTTKH.map((item, index) =>{
                      return(
                        <TBodyView item={item} index={index} sort={options.sort} meta={metagd} paging={paging} key={index} listKH={listKH} view={::this.viewItemFull} edit={::this.editItem} />
                      );
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
                    <ViewTTKH meta={meta} item={itemView} listLV={listLV} listK={listK} close={::this.viewModal} edit={::this.editItem}></ViewTTKH>
                  </Modal> : null}
                  {openEdit?
                  <Modal  modalStyle={Style.content_80}
                  overlayStyle= {Style.overlay}
                  close={::this.editModal}
                  overlayClassName='modaldumb modalOverlay modalOverlay--after-open '
                  modalClassName='dumb modalContent modalContent--after-open '
                  >
                    <EditTTKH giaodichid={idEdit} close={::this.editModal} ></EditTTKH>
                  </Modal> : null}
                <PageShow paging={paging} length={listTTKH.length}></PageShow>
                <Pagination load={::this.paginationLoad} paging={paging}></Pagination>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
