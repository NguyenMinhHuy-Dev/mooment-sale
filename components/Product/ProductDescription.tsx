import React from 'react'

export default function ProductDescription({ product }: any) {
  return (
    <div className='mygrid mt-[40px] min-h-[500px] flex bg-white rounded-[10px] shadow-header px-4'>
        {Object.keys(product).length !== 0 && 
            <>
                <div className='w-[70%] h-[500px]'>
                    <div className='w-full text-center'>
                        <h2 className='mygradienttitle uppercase text-[25px] tracking-widest'>Thông tin sản phẩm</h2>
                    </div>
                    <div className='w-full text-justify text-[15px]' dangerouslySetInnerHTML={{ __html: product.description }}>
                        {/* {product.description} */}
                    </div>
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
