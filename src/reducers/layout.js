const initialState = {
  menu: [
    [{
      label: 'Sản Phẩm',
      href: '/sanpham',
      icon: 'cubes'
    }, {
      label: 'Khách Hàng',
      href: '/khachhang',
      icon: 'folder-o',
      name: 'sanpham',
      sub: true,
      children: [{
        label: 'Danh Sách',
        href: '/khachhang/list',
        icon: 'list'
      },{
        label: 'Phiếu Mua Hàng',
        href: '/khachhang/pmh',
        icon: 'shopping-cart'
      },{
        label: 'Phiếu Xuất Hàng',
        href: '/khachhang/pxh',
        icon: 'truck'
      },{
        label: 'Hóa Đơn',
        href: '/khachhang/hdkh',
        icon: 'money'
      }]
    }, {
      label: 'Nhà Cung Cấp',
      href: '/nhacungcap',
      icon: 'file-o',
      name:"nhacungcap",
      sub:true,
      children: [{
        label: 'Danh Sách',
        href: '/nhacungcap/list',
        icon: 'list'
      },{
        label: 'Phiếu Đặt Hàng',
        href: '/nhacungcap/pdh',
        icon: 'shopping-cart'
      },{
        label: 'Phiếu Nhập Hàng',
        href: '/nhacungcap/pnh',
        icon: 'truck'
      },{
        label: 'Hóa Đơn',
        href: '/nhacungcap/hdncc',
        icon: 'money'
      }]
    },{
      label: 'Công Nợ',
      href: '/congno',
      icon: 'dollar'
    },{
      label: 'Thống Kê',
      href: '/thongke',
      icon: 'line-chart'
    },{
      label: 'Kho',
      href: '/kho',
      icon: 'database'
    }],
    [{
      label: 'Profile',
      href: '/profile',
      icon: 'user'
    }, {
      label: 'Logout',
      href: '/logout',
      icon: 'log-out'
    }]
  ],
  menuparse:{
    '/sanpham':'Sản Phẩm',
    '/khachhang/list':'Danh Sách Khách Hàng',
    '/khachhang/pmh':'Phiếu Mua Hàng',
    '/khachhang/pxh':'Phiếu Xuất Hàng',
    '/khachhang/hdkh':'Hóa Đơn Khách Hàng',
    '/nhacungcap/list':'Danh Sách Nhà Cung Cấp',
    '/nhacungcap/pdh':'Phiếu Đặt Hàng',
    '/nhacungcap/pnh':'Phiếu Nhập Hàng',
    '/nhacungcap/hdncc':'Hóa Đơn Nhà Cung Cấp',
    '/thongke':'Thống Kê',
    '/congno':'Công Nợ',
    '/profile':'Profile',
    '/nhanvien':'Nhân Viên',
    '/kho':'Kho'

  }
};
export default function layout(state = initialState, action = {}) {
  switch (action.type) {
    default: return state;
  }
}