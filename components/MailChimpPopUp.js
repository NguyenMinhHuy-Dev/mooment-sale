'use client'
import Script from 'next/script'
import React from 'react' 

export default function MailChimpPopUp() {
  return (
    <>
        <Script id="mcjs">
            {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/b20d117330404a90801147d3f/1d24ba73d202403817eda5d3d.js");`}
        </Script>
    </>
  )
}
