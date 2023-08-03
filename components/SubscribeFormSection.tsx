import React, { useState } from 'react'; 

export default function SubscribeFormSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMsg] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const res = await fetch('/api/subscribeUser', {
            body: JSON.stringify({
                email: email,
            }),

            headers: {
                'Content-Type': 'application/json',
            },

            method: 'POST',
        });
        // await jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_: any, data: any) => {
        //     const { msg, result } = data
            
        //     setLoading(false);
        //     setMsg("Cảm ơn vì bạn đã đăng ký!");
        // }); 

    };

    return (
        <div className='mygrid p-4 flex items-center flex-col mb-[50px] justify-center'> 
            {loading ? (
                <span className='loading-submit'>Đang đăng ký...</span>
            ) : (
                <>
                    <h2 className='mytitlewithtextshadow font-black text-[40px] '>Mua sắm online thả ga với vô vàn ưu đãi tại Mooment</h2>
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
                </>
            )}
        </div>
    )
}
