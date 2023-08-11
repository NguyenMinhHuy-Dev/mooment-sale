
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SignInForm from '../Auth/SignInForm';
import SignUpForm from '../Auth/SignUpForm';

interface SignFormProps {
    isOpen: boolean,
    closeModal: () => void,

    isOpenSignIn: boolean,
    switchToSignIn: () => void

    isOpenSignUp: boolean,
    switchToSignUp: () => void
}

export const SignFormModal = ({ isOpen, closeModal, isOpenSignIn, switchToSignIn, isOpenSignUp, switchToSignUp }: SignFormProps) => {


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
                  <Dialog.Panel className="relative overflow-y-auto  md:w-[500px] rounded-lg shadow-menu min-h-[50%] bg-white px-4">
                    <button type="button" onClick={closeModal} className="absolute top-4 right-4 border-2 border-[#2f3542] rounded hover:bg-[#2f3542] hover:text-white transition"><CloseRoundedIcon /></button>

                    {isOpenSignIn && ( 
                      <SignInForm switchToSignUp={switchToSignUp} closeModal={closeModal}/> 
                    )}

                    {isOpenSignUp && (
                      <SignUpForm switchToSignIn={switchToSignIn} />
                    )}

                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
        </Dialog>
    </Transition>
  )
}
