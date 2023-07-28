"use client"

import React from 'react'
import { useEffect } from 'react'

export default function TawkTo() {
    useEffect(() => { 
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/64aed24294cf5d49dc632a18/1h55eal1m';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })(); 
    }, [])
  return (
    <></>
  )
}
