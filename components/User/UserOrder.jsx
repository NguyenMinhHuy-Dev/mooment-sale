import React, { useState, useEffect, useRef } from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useAppSelector } from '@/redux/store';  
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import CenterFocusStrongRoundedIcon from '@mui/icons-material/CenterFocusStrongRounded';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; 

import ReactToPrint from "react-to-print";  
import { ComponentToPrint } from '../ComponentToPrint';

// type Order = {
//     [key: string]: any; // 👈️ variable key
//     name: string;
//   };

export default function UserOrder() {

    const searchParams = useSearchParams();

    const id = searchParams.get('id');
    
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({});
    const [hide, setHide] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState(-1); 

    const [loadingDetail, setLoadingDetail] = useState(false);

    const user = useAppSelector((state) => state.authReducer.value.user);
    
    let componentRef = useRef();

    const getOrders = async (status) => {
        // process.env.NEXT_PUBLIC_API_URL
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id + '/orders')
        .then((res) => res.json())
        .then((res) => {
            setOrders(res);
            if (id !== null) {
                setTab(-1);
                setSearch(id); 
                setData(res.filter((order) => 
                    order._id.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                    order._id.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
                ))
            }
            else {
                setData(res);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handlePrint = async ({ order }) => {
        var mywindow  = window.open('blank', 'PRINT');
    
        mywindow.document.write('<html><head><title>' + 'Đơn hàng - Mooment.com' + '</title>');
        mywindow.document.write('<style>');
        mywindow.document.write('* { margin: 0; padding: 0; box-sizing: border-box; }') 
        mywindow.document.write('body { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center }') 
        mywindow.document.write('.bill {width: 800px;min-height: 100px;background-color: #fff;border-radius: 10px;margin: 0 auto;position: relative;text-align: justify;padding: 10px 15px;}');
        mywindow.document.write('.bill-info {color: #000;font-size: 17px;display: block;}');
        mywindow.document.write('.bill-info.money {margin-top: 10px;font-size: 19px;text-align: right;}');
        mywindow.document.write('.line { width: 100%; height: 1px; background-color: #000; margin: 15px 0; }');
        mywindow.document.write('.bill table {width: 100%; border-collapse: collapse;}');
        mywindow.document.write('.bill table th,.bill table tr,.bill table td {background-color: #fff;border: 1px solid #000;}  ');
        mywindow.document.write('</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<div class="bill">');
        
        mywindow.document.write('</div>');
        mywindow.document.write('</body></html>');
    
        mywindow.focus();
        mywindow.print();
        // mywindow.close();
    }

    const handleOk = async (id, status) => {
        setLoadingDetail(true);
        await fetch(process.env.NEXT_PUBLIC_API_URL + '/orders/' + id, {
            method: "PUT",
            body: JSON.stringify({status}),
            headers: { 'Content-type': 'application/json' }
        })
        .then((res) => res.json())
        .then((res) => { 
            setHide(false);
            setLoadingDetail(false);
        })
        .catch((err) => { 
            setHide(false);
            setLoadingDetail(false);
        })
        await getOrders();
    }

    useEffect(() => { 
        getOrders(tab);
        
    }, [])
    
    useEffect(() => {
        if (tab === -1) {
            setData(orders);
        }
        else {
            setData(orders.filter((order ) => order.status === tab));
        }
    }, [tab])

    useEffect(() => {
        if (Object.keys(order).length === 0) {
            setHide(false);
        }
        else {
            setHide(true);
        }
        console.log(order)
    }, [order])

    useEffect(() => {
        if (search === '') {
            setTab(-1);
            setData(orders);
        }
        else { 
            setTab(-1);
            setData(orders.filter((order ) => 
                order._id.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                order._id.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
            ))
        } 
    }, [search])

    return (
        <div className='w-full h-full bg-white flex flex-col overflow-hidden' >
            
            <div className={`myorders relative bg-white ${hide} w-full h-full flex flex-col`}> 
                <div className='w-full flex justify-between mb-5 '>
                    <h1 className='font-bold text-light-yellow text-[25px]'>Đơn hàng của tôi</h1>
                </div>
                <div className='w-full h-[50px] flex items-center justify-between '>
                    <div onClick={() => setTab(-1)} className={`mytab ${tab === -1 ? 'active' : ''}`}>
                        <span className='text-[16px] uppercase font-semibold'>Tất cả {tab === -1 && <p className='font-medium inline-block text-[15px] text-light-red'>({data.length})</p>}</span>
                    </div>
                    <div onClick={() => setTab(0)} className={`mytab ${tab === 0 ? 'active' : ''}`}>
                        <span className='text-[16px] uppercase font-semibold'>Mới {tab === 0 && <p className='font-medium inline-block text-[15px] text-light-red'>({data.length})</p>}</span>
                    </div>
                    <div onClick={() => setTab(1)} className={`mytab ${tab === 1 ? 'active' : ''}`}>
                        <span className='text-[16px] uppercase font-semibold'>Đang xử lý {tab === 1 && <p className='font-medium inline-block text-[15px] text-light-red'>({data.length})</p>}</span>
                    </div>
                    <div onClick={() => setTab(2)} className={`mytab ${tab === 2 ? 'active' : ''}`}>
                        <span className='text-[16px] uppercase font-semibold'>Đang giao {tab === 2 && <p className='font-medium inline-block text-[15px] text-light-red'>({data.length})</p>}</span>
                    </div>
                    <div onClick={() => setTab(3)} className={`mytab ${tab === 3 ? 'active' : ''}`}>
                        <span className='text-[16px] uppercase font-semibold'>Thành công {tab === 3 && <p className='font-medium inline-block text-[15px] text-light-red'>({data.length})</p>}</span>
                    </div>
                    <div onClick={() => setTab(4)} className={`mytab ${tab === 4 ? 'active' : ''}`}>
                        <span className='text-[16px] uppercase font-semibold'>Hủy {tab === 4 && <p className='font-medium inline-block text-[15px] text-light-red'>({data.length})</p>}</span>
                    </div>
                </div>

                <div className='w-full my-3 pr-3 flex items-center bg-[#e8e9ec] rounded-[5px]'>
                    <input type='text' placeholder='Tìm đơn hàng theo mã đơn hàng' className='w-full flex-1 bg-[#e8e9ec] rounded-[5px] py-2 px-3 outline-none text-[14px]' value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <SearchRoundedIcon />
                </div>

                <div className='w-full mt-5 h-[370px] overflow-x-hidden overflow-y-auto pb-6'>  
                    <table className='mytable'>
                        <thead>
                            <tr>
                                <th className='w-[40px] text-center overflow-x-auto'>No</th>
                                <th className='min-w-[80px] text-left'>Mã đơn</th>
                                <th className='min-w-[140px] text-left'>Khách hàng</th>
                                <th className='min-w-[100px] text-left'>Email</th>
                                <th className='min-w-[100px] text-center'>Số điện thoại</th>
                                <th className='min-w-[100px] text-left'>Ghi chú</th>
                                <th className='min-w-[100px] text-left'>Ngày tạo</th>
                                <th className='min-w-[100px] text-center'>Tổng tiền</th>
                                <th className='min-w-[100px] text-center'>Trạng thái</th>
                                <th className=' text-center'></th> 
                            </tr>
                        </thead>
                        <tbody className=' overflow-y-auto'>
                            {data.sort((a , b ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())?.map((item , index ) => {
                                return ( 
                                    <tr key={item._id}>
                                        <td className='text-[13px] text-center font-bold'>{index + 1}</td>
                                        <td className='overflow-hidden break-words max-w-[120px] text-[13px]'><p>{item._id}</p></td>
                                        <td className='text-[13px] text-left'>{item.customerName}</td>
                                        <td className='text-[13px] text-left'>{item.customerEmail}</td>
                                        <td className='text-[13px] text-center'>{item.customerPhoneNumber}</td>
                                        <td className='text-[13px] text-left'>{item.note}</td>
                                        <td className='text-[13px] text-left'>{(new Date(item.createdAt)).toLocaleString('vi-VN')}</td>
                                        <td className='text-[13px] font-bold text-center'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalCost)}</td>
                                        <td className={`text-[13px] font-bold text-center ${item.status === 0 ? 'text-[#e84393]' : item.status === 1 ? 'text-[#f1c40f]' : item.status === 2 ? 'text-[#9b59b6]' : item.status === 3 ? 'text-[#27ae60]' : 'text-[#e74c3c]'}`}>
                                            {item.status === 0 ? 'Mới' : item.status === 1 ? 'Đang xử lý' : item.status === 2 ? 'Đang giao' : item.status === 3 ? 'Thành công' : 'Hủy'}
                                        </td>
                                        <td className='text-[13px] w-[50px] text-[#8e44ad]'>
                                            <CenterFocusStrongRoundedIcon className='cursor-pointer text-[#8e44ad]' onClick={(e) => setOrder(item)}/> 
                                        </td>
                                    </tr> 
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className={`absolute mydetailorder z-10 bg-white left-[100%] w-full h-full flex flex-col`}>
                    <div className='w-full h-[50px] flex items-center justify-between'>
                        <span className='text-[14px] select-none flex items-center cursor-pointer hover:text-light-yellow' onClick={(e) => setOrder({})}><KeyboardArrowLeftRoundedIcon /> Quay về</span>
                        <ReactToPrint 
                            trigger={() => <button className='px-5 py-1 mx-1 relative z-10 text-[14px] font-medium rounded-[5px] bg-white shadow-card'><PrintRoundedIcon /> In hóa đơn</button>} 
                            content={() => componentRef.current}
                        />
                    </div> 

                    {!loadingDetail ? (
                        <> 
                            <div className='w-full min-h-[527px] overflow-y-auto flex justify-between items-center'> 
                                <div className='w-[45%] h-full bg-light-gray rounded-[10px]'>  
                                    <div className='w-full bg-light-gray flex flex-col rounded-[10px] p-3'> 
                                        <span className='text-[14px] text-white'>Mã đơn hàng: <strong>{order._id}</strong></span>
                                        <span className='text-[14px] mb-4 text-white'>Ngày tạo: <strong>{(new Date(order.createdAt)).toLocaleString('vi-VN')}</strong></span>
                                        <h2 className='font-medium mb-1 text-[#ffffff] text-[14px] tracking-wide'>Thông tin khách hàng</h2>
                                        <input 
                                            placeholder="Họ và tên (Bắt buộc)" 
                                            className="w-[100%] py-2 pl-4 my-1 text-[13px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                            disabled
                                            value={order?.customerName}
                                            type="text" 
                                            name="fullName" 
                                        />
                                        
                                        <input 
                                            placeholder="Email (Bắt buộc)" 
                                            className="w-[100%] py-2 pl-4 my-1 text-[13px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                            disabled 
                                            value={order?.customerEmail}
                                            type="email" 
                                            name="email" 
                                        />
                                        <input 
                                            placeholder="Số điện thoại (Bắt buộc)" 
                                            className="w-[100%] py-2 pl-4 my-1 text-[13px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                            disabled
                                            value={order?.customerPhoneNumber}
                                            name="phoneNumber" 
                                        />

                                        <h2 className='font-medium mb-1 mt-4 text-[#fff] text-[14px] tracking-wide'>Địa chỉ nhận hàng</h2> 
                                        <textarea 
                                            
                                            className="w-[100%] resize-none  py-2 pl-4 my-1 text-[13px] text-white bg-[#4e4e4e] rounded-lg outline-none" 
                                            disabled
                                            value={order?.customerAddress}
                                            name="address" 
                                        />

                                        <h2 className='font-medium mb-1 mt-4 text-[#fff] text-[14px] tracking-wide'>Ghi chú cho đơn hàng</h2>
                                        <textarea 
                                            placeholder="Bạn muốn ghi chú gì cho đơn hàng?" 
                                            className="w-[100%] h-[100px] resize-none py-2 pl-4 my-1 text-[13px] text-white bg-[#4e4e4e]  rounded-lg outline-none"   
                                            disabled
                                            value={order?.note}
                                            name="note" 
                                        />
                                    </div> 
                                </div> 

                                <div className='w-[54%] h-full rounded-[10px]'> 
                                    <div className='w-full h-full bg-white flex flex-col'>  
                                        <h3 className='font-medium mb-1 text-[#757272] text-[16px] tracking-wide'>Sản phẩm</h3>  
                                        <ul className='w-full flex flex-col'>
                                            {order.orderDetail?.map((item) =>  
                                                    <li key={item._id + 'product'} className='flex w-full h-[85px] py-1 mb-5 rounded-[7px] bg-white'>
                                                        <div className='relative h-full aspect-square rounded-[7px] overflow-hidden'>
                                                            <Image
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                fill 
                                                            />
                                                        </div>
                                                        <div className='ml-2 flex-1 h-full flex flex-col'>
                                                            <div className='text-left w-full h-[40px] mb-1'>
                                                                <span className='font-medium text-[15px] leading-5 line-clamp-2 overflow-hidden whitespace-pre-wrap'> 
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                            <div className='w-full flex justify-between items-center mb-1'>
                                                                <span className='text-[13px] text-[#929292]'>Số lượng: {item.quantity}</span>
                                                                <span className='text-[13px] text-[#929292]'></span>
                                                                
                                                            </div>
                                                            <div className='w-full flex justify-between items-end'> 
                                                                <span className='text-[15px] text-[#929292] leading-[15px]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice)}</span>
                                                                <span className='font-bold text-black text-[16px] leading-[15px]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</span>
                                                            </div>
                                                        </div>
                                                        
                                                    </li>  
                                            )}
                                        </ul>   
                                        <h3 className='font-medium mb-1 mt-4 text-[#757272] text-[16px] tracking-wide'>Khuyến mãi cho đơn hàng</h3>  
                                            
                                        <div className='w-full flex items-center justify-between'> 
                                            <div className='flex items-center'> 
                                                <Image 
                                                    src="/logo-1.png"
                                                    alt="logo"
                                                    width={70}   
                                                    height={70}
                                                    className='object-contain' 
                                                />
                                                <div className='w-[2px] h-[80%] bg-[#e0e0e0]'></div>
                                                <div className='h-[80%] ml-2 flex flex-col justify-center'>
                                                    <h4 className='font-semibold text-[15px] text-black'>MÃ GIẢM GIÁ {order.voucher/1000}K</h4> 
                                                </div>
                                            </div>   
                                                <span className='font-medium cursor-default text-[15px] text-light-red mr-2'>Đã dùng</span>
                                        </div>

                                        <div className='w-full mb-1 mt-6 flex items-center justify-between'>
                                            <h3 className='font-medium text-[#757272] text-[16px] tracking-wide'>Phương thức thanh toán</h3> 
                                            <span>{order.payment}</span>
                                        </div>

                                        <div className='w-full h-[1px] mt-[40px] bg-[#d1d1d1]'></div>

                                        <div className='w-full mt-4'>
                                            
                                            <div className='w-full mt-2 flex items-end justify-between'>
                                                <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Voucher:</h3>  
                                                <span className='font-black text-[15px] text-black'>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.voucher)}</span>
                                            </div>
                                            <div className='w-full mt-2 flex items-end justify-between'>
                                                <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Phí vận chuyển:</h3>  
                                                <span className='font-black text-[15px] text-black'> 
                                                    Miễn phí
                                                </span>
                                            </div>
                                            <div className='w-full mt-2 flex items-end justify-between'>
                                                <h3 className='font-medium mb-1 text-[#757272] text-[14px] tracking-wide'>Thành tiền:</h3>  
                                                <span className='font-black text-[20px] text-light-red'>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalCost)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className='w-full mt-4 text-right'>
                                            {order.status === 2 &&
                                                <> 
                                                    <button onClick={() => handleOk(order._id, 4)} className='font-bold py-[10px] px-[15px] bg-light-red text-[15px] mr-3 rounded-[10px]'>Hủy</button>
                                                    <button onClick={() => handleOk(order._id, 3)} className='font-bold py-[10px] px-[15px] bg-light-yellow text-[15px] rounded-[10px]'>Đã nhận được hàng</button>
                                                    <span className='text-[13px] block text-light-red italic'>*Lưu ý: Chỉ bấm nhận hàng khi hàng đã được giao thành công</span>
                                                </>
                                            }
                                        </div> 
                                    </div>
                                </div>
                            </div>

                                                
                            <ComponentToPrint data={order} ref={componentRef} />   
                        </>
                    ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                            <span className='myloading'></span>
                        </div>
                    )}
                </div>      
                 
            </div>

            
        </div>
    )
}



































