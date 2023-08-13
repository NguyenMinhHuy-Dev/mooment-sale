import React, { useState, useEffect } from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useAppSelector } from '@/redux/store'; 
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function UserOrder() {
    const [orders, setOrders] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const user: any = useAppSelector((state) => state.authReducer.value.user);
    
    const [tab, setTab] = useState(-1); 

    const getOrders = async (status: Number) => {
        // process.env.NEXT_PUBLIC_API_URL
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id + '/orders')
        .then((res) => res.json())
        .then((res) => {
            setOrders(res);
            setData(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => { 
        getOrders(tab);
    }, [])
    
    useEffect(() => {
        if (tab === -1) {
            setData(orders);
        }
        else {
            setData(orders.filter((order: any) => order.status === tab));
        }
    }, [tab])

    useEffect(() => {
        if (search === '') {
            setTab(-1);
            setData(orders);
        }
        else { 
            setTab(-1);
            setData(orders.filter((order: any) => 
                order._id.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 ||
                order._id.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
            ))
        } 
    }, [search])

    return (
        <div className='w-full h-full flex flex-col' >
            <div className='w-full flex justify-between mb-5 '>
                <h1 className='font-bold text-light-yellow text-[25px]'>Quản lý đơn hàng</h1>
            </div>
            <div className='w-full h-[50px] flex items-center justify-between '>
                <div onClick={() => setTab(-1)} className={`mytab ${tab === -1 ? 'active' : ''}`}>
                    <span className='text-[16px] uppercase font-semibold'>Tất cả</span>
                </div>
                <div onClick={() => setTab(0)} className={`mytab ${tab === 0 ? 'active' : ''}`}>
                    <span className='text-[16px] uppercase font-semibold'>Mới</span>
                </div>
                <div onClick={() => setTab(1)} className={`mytab ${tab === 1 ? 'active' : ''}`}>
                    <span className='text-[16px] uppercase font-semibold'>Đang xử lý</span>
                </div>
                <div onClick={() => setTab(2)} className={`mytab ${tab === 2 ? 'active' : ''}`}>
                    <span className='text-[16px] uppercase font-semibold'>Đang giao</span>
                </div>
                <div onClick={() => setTab(3)} className={`mytab ${tab === 3 ? 'active' : ''}`}>
                    <span className='text-[16px] uppercase font-semibold'>Thành công</span>
                </div>
                <div onClick={() => setTab(4)} className={`mytab ${tab === 4 ? 'active' : ''}`}>
                    <span className='text-[16px] uppercase font-semibold'>Hủy</span>
                </div>
            </div>

            <div className='w-full my-3 pr-3 flex items-center bg-[#e8e9ec] rounded-[5px]'>
                <input type='text' placeholder='Tìm đơn hàng theo mã đơn hàng' className='w-full flex-1 bg-[#e8e9ec] rounded-[5px] py-2 px-3 outline-none text-[14px]' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <SearchRoundedIcon />
            </div>

            <div className='w-full mt-5 h-[370px] overflow-x-scroll overflow-y-auto pb-6'>  
                <table className='mytable '>
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
                        {data?.map((item: any, index: any) => {
                            return (
                                <tr key={item._id}>
                                    <td className='text-[13px] text-center font-bold'>{index + 1}</td>
                                    <td className='overflow-hidden break-words max-w-[120px] text-[13px]'><p>{item._id}</p></td>
                                    <td className='text-[13px] text-left'>{item.customerName}</td>
                                    <td className='text-[13px] text-left'>{item.customerEmail}</td>
                                    <td className='text-[13px] text-center'>{item.customerPhoneNumber}</td>
                                    <td className='text-[13px] text-left'>{item.note}</td>
                                    <td className='text-[13px] text-left'>{item.createdAt}</td>
                                    <td className='text-[13px] font-bold text-center'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalCost)}</td>
                                    <td className={`text-[13px] font-bold text-center ${item.status === 0 ? 'text-[#e84393]' : item.status === 1 ? 'text-[#f1c40f]' : item.status === 2 ? 'text-[#9b59b6]' : item.status === 3 ? 'text-[#27ae60]' : 'text-[#e74c3c]'}`}>
                                        {item.status === 0 ? 'Mới' : item.status === 1 ? 'Đang xử lý' : item.status === 2 ? 'Đang giao' : item.status === 3 ? 'Thành công' : 'Hủy'}
                                    </td>
                                    <td className='text-[13px] max-w-[100px] text-center'><OpenInNewIcon className='cursor-pointer text-light-yellow' /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
