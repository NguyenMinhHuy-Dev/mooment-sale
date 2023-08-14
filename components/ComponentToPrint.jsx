import Image from "next/image";
import React, { useRef } from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => { 
  const defaultNumbers =' hai ba bốn năm sáu bảy tám chín';

  const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
  const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ');
  const chuHangTram = ('không một' + defaultNumbers).split(' ');

  function convert_block_three(number) {
    if(number == '000') return '';
    var _a = number + ''; //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
      case 0: return '';
      case 1: return chuHangDonVi[_a];
      case 2: return convert_block_two(_a);
      case 3: 
        var chuc_dv = '';
        if (_a.slice(1,3) != '00') {
          chuc_dv = convert_block_two(_a.slice(1,3));
        }
        var tram = chuHangTram[_a[0]] + ' trăm';
        return tram + ' ' + chuc_dv;
    }
  }

  function convert_block_two(number) {
    var dv = chuHangDonVi[number[1]];
    var chuc = chuHangChuc[number[0]];
    var append = '';
  
    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > 0 && number[1] == 5) {
      dv = 'lăm'
    }
  
    // Nếu số hàng chục lớn hơn 1
    if (number[0] > 1) {
      append = ' mươi';
      
      if (number[1] == 1) {
        dv = ' mốt';
      }
    }
  
    return chuc + '' + append + ' ' + dv; 
  }

  const dvBlock = '1 nghìn triệu tỷ'.split(' ');

  function to_vietnamese(number) {
    var str = parseInt(number) + '';
    var i = 0;
    var arr = [];
    var index = str.length;
    var result = [];
    var rsString = '';

    if (index == 0 || str == 'NaN') {
      return '';
    }

    // Chia chuỗi số thành một mảng từng khối có 3 chữ số
    while (index >= 0) {
      arr.push(str.substring(index, Math.max(index - 3, 0)));
      index -= 3;
    }

    // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != '' && arr[i] != '000') {
        result.push(convert_block_three(arr[i]));

        // Thêm đuôi của mỗi khối
        if (dvBlock[i]) {
          result.push(dvBlock[i]);
        }
      }
    }

    // Join mảng kết quả lại thành chuỗi string
    rsString = result.join(' ');

    // Trả về kết quả kèm xóa những ký tự thừa
    return rsString.replace(/[0-9]/g, '').replace(/ /g,' ').replace(/ $/,'');
  }

    return (
      <div className="w-full bg-white min-h-[600px] px-3" ref={ref}>
        <div className="w-full flex items-center justify-between">
          <Image 
            src="/logo-1.png"
            alt="logo Mooment"
            width={100}
            height={100} 
          />
          <div className="w-[300px] flex flex-col items-start">
            <div className="w-full uppercase text-[25px] tracking-widest font-black text-center">
              Mooment store
            </div>
            <span className="text-[14px] w-full flex items-center justify-between">Số hóa đơn: <strong>{props.data._id}</strong></span>
            <span className="text-[14px] w-full flex items-center justify-between">Ngày: <span>{(new Date(props.data.createdAt)).toLocaleString('vi-VN')}</span></span>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full">
            <span className="text-[14px]">Tên khách hàng&emsp;&emsp;</span>
            <span className="text-[14px]">: {props.data.customerName}</span>
          </div>
          <div className="w-full">
            <span className="text-[14px]">Số điện thoại&emsp;&emsp;&emsp; </span>
            <span className="text-[14px]">: {props.data.customerPhoneNumber}</span>
          </div>
          <div className="w-full">
            <span className="text-[14px]">Địa chỉ&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
            <span className="text-[14px]">: {props.data.customerAddress}</span>
          </div>
          <div className="w-full">
            <span className="text-[14px]">Ghi chú&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
            <span className="text-[14px]">: {props.data.note}</span>
          </div>
        </div>
        <div className="w-full mt-5">
          <table className="mytable2 w-full">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th>Tên sản phẩm</th>
                <th>Đơn vị tính</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Tổng tiền</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {props.data.orderDetail?.map((item, index) => (
                <tr key={item.name}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="text-center">Cái</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}</td>
                  <td className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</td>
                  <td></td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-right">Voucher giảm giá</td>
                <td className="text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.data.voucher)}</td>
                <td className="text-right"></td>
              </tr>
              <tr>
                <td colSpan={5} className="text-right">Phí vận chuyển</td>
                <td className="text-right">Miễn phí</td>
                <td className="text-right"></td>
              </tr>
              <tr>
                <td colSpan={5} className="text-right uppercase font-bold">Tổng tiền</td>
                <td colSpan={2} className="text-center">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.data.totalCost)}</td> 
              </tr>
              <tr>
                <td colSpan={7} className="italic">Bằng chữ: <span className="text-[13px] capitalize">{to_vietnamese(props.data.totalCost)} đồng</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  });