import React, { useState } from 'react'; 

export default function SubscribeFormSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMsg] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
        await fetch(`${url}&EMAIL=${email}`, {
            body: JSON.stringify({
              email
            }),
      
            headers: {
              'Content-Type': 'application/json',
            },
      
            method: 'POST',
          })
        // await jsonp(`${url}&EMAIL=${email}`, { param: 'c' }, (_: any, data: any) => {
        //     const { msg, result } = data
            
        //     setLoading(false);
        //     setMsg("Cảm ơn vì bạn đã đăng ký!");
        // }); 
    };

  return (
    <div className='mygrid SubscribeForm p-4 flex items-center mb-[50px] justify-center'> 
        {loading ? (
            <span className='loading-submit'>Đang đăng ký...</span>
        ) : (
            <form onSubmit={onSubmit}>
                <div className='SubscribeForm-container'>
                    <div className='SubscribeForm-container-left'>
                        <h2 className='font-bold text-black'>Đăng ký để nhận những khuyến mãi tốt nhất</h2> 
                        <div className="mygroup"> 
                            {message ? (
                                <span className='subscribe-msg'>{message}</span>
                            ) : (
                                
                                <input type="email" name="EMAIL" placeholder='Nhập email của bạn vào đây' className="required email" id="mce-EMAIL" required value={email} onChange={e => setEmail(e.target.value)} /> 
                            
                            )}
                        </div>
                    </div>
                    
                    <div className="SubscribeForm-container-right">
                        <div className="clear foot">
                            <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Đăng ký nhận tin"/> 
                        </div>
                    </div>
                </div>
            </form> 
        )}
    </div>
  )
}
