import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

export default function ImageFaded({ className, onLoad, crossOrigin: _, src, ...others }: any) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const img: any = imgRef.current;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                img.setAttribute("src", src);
            }
        });
        
        if (img) {
            observer.observe(img);
        }

        return () => {
            if (img) {
                observer.unobserve(img);
            }
        }
    }, [src]);

    return (
        <img 
            ref={imgRef}
            alt='image'
            className={className}
            style={{
                opacity: loaded ? '1' : '0',
                transition: 'all 0.4s ease-in'
            }}
            onLoad={(e) => {
                setLoaded(true)
                onLoad && onLoad(e);
            }}
            {...others}
        />
    )
}
