import React, { useState } from 'react';  

export default function SubscribeFormSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMsg] = useState(""); 

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('/api/subscribeUser', {
            body: JSON.stringify({
                email: email,
            }),

            headers: {
                'Content-Type': 'application/json',
            },

            method: 'POST',
        });   
        await setLoading(false); 
        await setMsg("Bạn đã đăng ký thành công!");
    };

    return (
        <div id="mysubscribeform" className=' mygrid p-4 flex items-center flex-col mb-[50px] justify-center'> 
            <h2 className='mytitlewithtextshadow font-black text-[40px] '>Mua sắm online thả ga với vô vàn ưu đãi tại Mooment</h2>
            
            {loading ? (
                <div className='shadow-xl mt-4 w-full min-h-[100px] p-6 flex items-center justify-center rounded-[10px] mygradientbackground'>
                    <span className='font-bold loader flex items-center'></span>
                    <span className='font-bold ml-2 px-2 py-1 bg-white rounded'>Đang đăng ký</span>
                </div>
            ) : (
                <>
                    {message ? (
                        <div className='shadow-xl mt-4 w-full h-[100px] p-6 flex items-center justify-center rounded-[10px] mygradientbackground'>
                            <span className='font-black text-[25px] text-white'>{message} 🎉🎉</span>
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className='shadow-xl mt-4 w-full h-[100px] p-6 flex items-center rounded-[10px] mygradientbackground'>
                            <input
                                placeholder='Đăng ký nhận ưu đãi với email'
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                // required
                                
                                className='flex-1 full px-2 py-4 outline-none border-2 border-[#464646] text-[16px] text-white bg-[#464646] rounded focus:border-[#000]'
                            />
                            <button type='submit' className=' inline-block px-4 py-4 text-[16px] uppercase bg-light-gray text-white font-bold  ml-4 rounded transition-all hover:bg-white hover:text-black'>Đăng ký</button>
                        </form> 
                    )}
                </>
            )}
        </div>
    )
}
