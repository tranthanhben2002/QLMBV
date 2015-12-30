import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ttnccActions from '../../actions/nhacungcap/ttnccActions';
import {THeadView, TBodyView, TFootView} from '../table/rowForTTNCC';
import {Pagination, PageShow} from '../table/pagination';
import {isLoaded, loadList as loadTTNCC} from '../../actions/nhacungcap/ttnccActions';
import * as layoutActions from '../../actions/layoutActions';
import * as giaodichActions from '../../actions/giaodichActions';
import Modal from '../layout/Modal';
import EditTTNCC from './Editor/EditTTNCC';
import {Style} from '../Style';
import {ViewTTNCC} from './Editor/ViewFull';

@connect(
  state =>({
    listTTNCC: state.thanhtoanNCC.list,
    paging: state.thanhtoanNCC.paging,
    error: state.thanhtoanNCC.error,
    loading: state.thanhtoanNCC.loading,
    reload: state.thanhtoanNCC.reloadList,
    meta: state.meta.thanhtoanNCC,
    listLV: state.giaodich.listLV,
    listK: state.giaodich.listK,
    listNCC: state.giaodich.listNCC
  }),
  {...ttnccActions,...layoutActions, ...giaodichActions})

export default
class TTNCC extends Component{
  static propTypes = {
    listTTNCC: PropTypes.array,
    error: PropTypes.object,
    paging: PropTypes.object,
    meta: PropTypes.object,
    loading: PropTypes.bool,
    loadList:PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
  }

  static fetchData(store){
    if(!isLoaded(store.getState)){
      return store.dispatch(loadTTNCC({
        page_size: 10,
        id: '',
        sort: '',
        newtt: 't'
      }));
    }
  }
  componentWillMount(){
    this.props.loadLV();
    this.props.loadK();
    this.props.loadNCC();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.reload === true){
      this.props.loadList(this.state.options);
    }
  }
  state = {
    options :{
      page_size: 10,
      id: '',
      sort: '',
      newtt: 't'
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
    if(value !== opt.id){
      opt.id = value;
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
    const {listTTNCC, paging, meta, listLV, listK, listNCC} = this.props;
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
                    <input type="search" className="form-control " placeholder="Search GDID" onChange={::this.searchField} aria-controls="example" />
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
                    {listTTNCC && listTTNCC.map((item, index) =>{
                      return(
                        <TBodyView item={item} index={index} sort={options.sort} meta={metagd} paging={paging} key={index} view={::this.viewItemFull} listNCC={listNCC} edit={::this.editItem} />
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
                    <ViewTTNCC meta={meta} item={itemView} listLV={listLV} listK={listK} close={::this.viewModal} edit={::this.editItem}></ViewTTNCC>
                  </Modal> : null}
                  {openEdit?
                  <Modal  modalStyle={Style.content_80}
                  overlayStyle= {Style.overlay}
                  close={::this.editModal}
                  overlayClassName='modaldumb modalOverlay modalOverlay--after-open '
                  modalClassName='dumb modalContent modalContent--after-open '
                  >
                    <EditTTNCC giaodichid={idEdit} close={::this.editModal} ></EditTTNCC>
                  </Modal> : null}
                <PageShow paging={paging} length={listTTNCC.length}></PageShow>
                <Pagination load={::this.paginationLoad} paging={paging}></Pagination>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
