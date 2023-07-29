
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface SignFormProps {
    isOpen: boolean,
    closeModal: () => void
}

export const SignFormModal = ({ isOpen, closeModal }: SignFormProps) => {
  const handleSignIn = () => {
    alert("FUck")
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' onClose={closeModal} className="relative z-[2000000000000]">
            <Transition.Child 
              as={Fragment} 
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
                <div className='fixed inset-0 bg-black bg-opacity-10'></div>
            </Transition.Child>

            <div className='fixed inset-0'>
              <div className='flex h-full w-full items-center justify-center'>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0 scale-75"
                  enterTo="opacity-100 scale-100"
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-75'
                >
                  <Dialog.Panel className="relative overflow-y-auto  md:w-[500px] rounded-lg shadow-menu h-[50%] bg-white px-4">
                    <button type="button" onClick={closeModal} className="absolute top-4 right-4 border-2 border-[#2f3542] rounded hover:bg-[#2f3542] hover:text-white transition"><CloseRoundedIcon /></button>
                    <div className='w-full h-[10%] flex justify-between items-center pt-5'>
                      <span className='font-black uppercase text-2xl tracking-wider text-[#2f3542]'>Đăng nhập</span>
                    </div>
                    <div className='w-full pt-7'>
                      <form onSubmit={handleSignIn}> 
                      <div className='w-full'>
                        <label htmlFor="username" className='font-normal text-[#646464]'>Email</label>
                        <input type='email' name="username" placeholder='Email' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required/> 
                        <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'></span>
                      </div>
                      <div className='w-full mb-1'>
                        <label htmlFor="password" className='font-normal text-[#646464]'>Mật khẩu</label>
                        <input type='password' name="password" placeholder='Mật khẩu' className='w-full py-3 pl-4 bg-[#e8e9ec] rounded-lg outline-[#d1d1d1]' required/> 
                        <span className='block w-full text-right text-md leading-4 h-5 text-[#e74c3c] pt-2'></span>
                      </div>
                      <div className='w-full flex justify-between items-center'>
                        <div>Chưa có tải khoản? <span className='font-bold underline cursor-pointer'>Đăng ký ngay</span></div>
                        <span className='linkHover italic cursor-pointer'>Quên mật khẩu?</span>
                      </div>
                      <button type='submit' className='mt-5 uppercase w-full py-4 font-bold rounded-lg bg-dark-yellow hover:bg-light-yellow transition'>Đăng nhập</button>
                      
                      </form>
                      <div className='w-full h-auto flex justify-center items-center mt-4'>
                        <div className='flex-1 h-[1px] bg-[#d1d1d1]'></div>
                        <p className='font-normal text-[#a09898] text-[14px] mx-2 '>Hoặc đăng nhập bằng</p>
                        <div className='flex-1 h-[1px] bg-[#d1d1d1]'></div>
                      </div>
                      <div className='flex justify-center items-center w-full mt-3'>

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
