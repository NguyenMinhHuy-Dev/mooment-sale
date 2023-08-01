import React from 'react'

export default function ProductSkeleton() {
  return (
    <div className='myskeleton w-full rounded-[10px] drop-shadow-xl'>
        <div className=' relative w-full z-0 aspect-square rounded-[10px] overflow-hidden'> 
        </div> 

        <div className=' relative z-[1] py-2 w-full h-[100px]  flex flex-col justify-between rounded-[10px] mt-2 p-2 '>
            <div className=' w-full h-full rounded-[10px]'>

            </div>
        </div>
    </div>
  )
}
