"use client"

import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface AlertProps {
    isOpen: boolean,
    closeModal: () => void,
}

export const Loading = ({ isOpen, closeModal }: AlertProps) => {
    const quotes = ["Có một thứ tiền không mua được. Đó chính là sự nghèo khó!", "Đi một ngày đàng… rớt mất 200.000.", "Giang hồ độc ác vẫn không bằng mạng “lag” thất thường.", "Trên đường đời tấp nập, ta vô tình nhặt phải xấp đô la?", "Béo không phải tội mà là vượt trội về thể xác.", "Đàn ông bản lĩnh là phải bình tĩnh trước mặt gái xinh và không bị giật mình trước mặt trước gái xấu.", "Con gái sáng nắng, chiều mưa, buổi trưa giông tố.", "Từ nay sẽ tập sống lạnh lùng, chứ không thể cứ khùng hoài được.", "Ví tôi như củ hành tây, vì mỗi lần mở ra tôi đều khóc.", "Hồi nhỏ có ước mơ làm người mẫu, lớn lên cao m52.", "Muốn dẫn cậu đi Paris vì nhận ra tình yêu của chúng ta là hợp pháp.", "Bắc Đẩu thì có Nam Tào. Anh cho em hỏi đã có người nào hay chưa?", "Tính em chẳng thích lưng chừng, yêu vào chẳng sợ cắm sừng đâu anh.", "Em chẳng thích la cà, em chỉ thích mặn mà cùng anh.", "Em không muốn tiến thủ, chỉ muốn ngủ cùng anh.", "Anh đừng say rượu bia nữa, say em đi.", "Rớt môn tưng bừng, vui mừng đón Tết.", "Tết đến tưng bừng, vui mừng học lại.", "Có chí thì nên… gội đầu.", "Tết đến, xuân về, dọn nhà ê chề.", "Chơi hết đời trai trẻ rồi lặng lẽ đạp xích lô.", "Quay đầu là bờ, không ngờ là biển cả.", "Tương lai khóc hay cười tùy thuộc vào độ lười lúc trước.", "Tiền không thiếu nhưng nhiều không có.", "Dẫu đường đời nhiều sỏi đá, chỉ mong vấp ngã vẫn còn răng.", "Trời phật tuy không độ, nhưng mình được cái thái độ.", "Âm tính với covid nhưng dương tính với yêu anh.", "Điện thoại thì pin yếu, tim em thì thiếu anh.", "Chứng khoán xanh đỏ khóc cười, nhưng không khó đoán như người anh yêu.", "Em không thương bếp nghiện nhà, nhưng mà được cái thật thà thương anh.", "Con cóc là cậu ông trời, nghe tiếng cóc gọi được nhiều món ngon.", "Hãy đi lên bằng đôi chân mình…. nếu thang máy hỏng.", "Hồi nhỏ xấu xí, hay nói cười nhiều, lớn lên ít nói ít cười nhưng… vẫn xấu.", "Tiền là giấy, đốt là cháy. Tình là bụi, phủi là bay.", "Luôn đuổi theo ước mơ của mình bằng cách… tắt báo thức và ngủ tiếp.", "Yêu nhau gọi là duyên số, nhưng lấy nhau gọi là sự cố.", "Tiền không là tất cả. Bởi vì trên đời còn vàng và kim cương.", "Ta có thể cưỡng lại tất cả mọi thứ trên đời, trừ… sự cám dỗ.", "Lúc trước vợ được gọi là nương tử, còn giờ là sư tử.", "Dân chơi không sợ mưa rơi. Mưa rơi to quá dân chơi đi về."];
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const getQuote = () => {
            setInterval(function() {
                setQuote(quotes[Math.floor(Math.random()*quotes.length)])
            }, 4000)
        }
        getQuote();
    }, [])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative" onClose={() => {}}>
                <Transition.Child
                    as={Fragment} 
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 z-10 bg-black bg-opacity-10'> 
                    </div>
                </Transition.Child>

                <div className='fixed inset-0 z-[20000000000000000] '>
                    <div className='flex min-h-full items-center justify-center'>
                        <Transition.Child 
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0 scale-75"
                            enterTo="opacity-100 scale-100"
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-75'
                        >
                            <Dialog.Panel className="relative  w-[100vw] h-[100vh] shadow-menu bg-white">
                            <div className='mygrid top-[30px] rounded-[10px] h-[900px] bg-white flex items-center justify-center'>
                                <div className="preloader">
                                    <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                                            <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                                                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                                                <circle cx="43" cy="111" r="13" />
                                                <circle cx="102" cy="111" r="13" />
                                            </g>
                                            <g className="cart__lines" stroke="currentColor">
                                                <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset="-338" />
                                                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                                                    <circle className="cart__wheel-stroke" cx="43" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                                </g>
                                                <g className="cart__wheel2" transform="rotate(90,102,111)">
                                                    <circle className="cart__wheel-stroke" cx="102" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    
                                    <div className="preloader__text">
                                        <p className="preloader__msg">{quote}</p>
                                        <p className="preloader__msg preloader__msg--last">{quote}</p>
                                    </div>
                                </div>   
                            </div>  
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}