import React, { useState } from 'react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

export default function ProductDescription({ product }: any) {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className='mygrid mt-[40px] min-h-[500px] flex bg-white rounded-[10px] shadow-header px-4'>
            {Object.keys(product).length !== 0 && 
                <>
                    <div className={`w-[70%] relative ${isShow ? 'min-h-[500px]' : 'h-[500px]'} pb-[50px] overflow-hidden`}>
                        <div className='w-full text-center'>
                            <h2 className='mygradienttitle uppercase text-[25px] tracking-widest'>Thông tin sản phẩm</h2>
                        </div>
                        <div className='w-full text-justify text-[15px]' dangerouslySetInnerHTML={{ __html: product.description }}>
                            
                        </div>
                        {!isShow ? (

                            <div onClick={() => setIsShow(true)} className='absolute w-[100px] h-[35px] flex items-center justify-center text-[13px] font-bold  cursor-pointer rounded-[20px] backdrop-blur-xl bg-white shadow-card left-[50%]  bottom-[10px] z-10'>
                                <ExpandMoreRoundedIcon />
                                Xem thêm
                            </div>
                        ) : (
                            <div onClick={() => setIsShow(false)} className='absolute w-[100px] h-[35px] flex items-center justify-center text-[13px] font-bold  cursor-pointer rounded-[20px] backdrop-blur-xl bg-white shadow-card left-[50%]  bottom-[10px] z-10'>
                                <ExpandLessRoundedIcon />
                                Thu gọn
                            </div>
                        )}
                    </div>

                    <div className='w-[30%] text-center'>
                        <div className='w-full pt-[30px]'>
                            <div className='relative w-full h-full'>
                                <span className='absolute h-[25px] py-4 px-5 flex items-center justify-center rounded-full bg-white text-[14px] font-medium text-[#838383] shadow-card top-[-20px] left-[50%] -translate-x-[50%]'>Thông số kỹ thuật</span>
                                <div className=' w-full h-full py-2 px-3 rounded-[10px] bg-[#fff] shadow-md '> 
                                    <table className='mytable w-full h-full'>
                                        <tbody>
                                            
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Layout</th>
                                            <td>F13 WK/WKL</td>
                                        </tr>
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Chất liệu</th>
                                            <td>Nhôm</td>
                                        </tr> 
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Kết nối</th>
                                            <td>Type C</td>
                                        </tr>
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Mounting</th>
                                            <td>HPCB Gasket-sandwich</td>
                                        </tr>
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Plate</th>
                                            <td>PC</td>
                                        </tr>
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Mạch PCB</th>
                                            <td>Hotswap 5 pin, 1.6mm</td>
                                        </tr>
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Foam</th>
                                            <td>Plate / Switch / Case</td>
                                        </tr>
                                        <tr className='w-full flex items-center justify-between text-[14px]'>
                                            <th>Firmware</th>
                                            <td>QMK & VIA support</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
