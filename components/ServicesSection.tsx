import React from 'react';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

export default function ServicesSection() {
  return (
    <div className='mygrid rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 w-full h-[180px]'>
        <div className='services-item '>
            <LocalShippingRoundedIcon className='icon' />
            <div className='services-item-info'>
                <span>MIỄN PHÍ VẬN CHUYỂN</span>
                <p>
                    Miễn phí vận chuyển cho các đơn hàng trong nội thành thành phố Hồ Chí Minh
                </p>
            </div>
        </div>
        <div className='services-item '>
            <ChangeCircleRoundedIcon className='icon' />
            <div className='services-item-info'>
                <span>HOÀN TRẢ DỄ DÀNG</span>
                <p>
                    Có thể yêu cầu hoàn trả lại điền đảm bảo a-z nếu có vấn đề với một mặt hàng
                </p>
            </div>
        </div>
        <div className='services-item '>
            <MonetizationOnRoundedIcon className='icon' />
            <div className='services-item-info'>
                <span>THANH TOÁN ĐẢM BẢO</span>
                <p>
                    Cam kết sử dụng các biện pháp bảo mật khi thanh toán
                </p>
            </div>
        </div>
        <div className='services-item '>
            <VerifiedUserRoundedIcon className='icon' />
            <div className='services-item-info'>
                <span>BẢO HÀNH</span>
                <p>
                    Đổi mới 100% cho các sản phẩm bị lỗi do nhà sản xuất trong 7 ngày đầu
                </p>
            </div>
        </div>
    </div>
  )
}
