// import fetch from 'isomorphic-unfetch';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {  
    const { email } = await request.json();

    if (!email) {
        return NextResponse.json({
            error: "Email is required"
        }, {
            status: 400
        })
    }

    try { 
        const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
        const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
        const DATACENTER = process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER;
        const data = {
            email_address: email,
            status: 'subscribed',
        };
 
        const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
        const response = await fetch(`${url}&EMAIL=${email}`, {
            body: JSON.stringify({
                email
            }),
    
            headers: {
            'Content-Type': 'application/json',
            },
    
            method: 'POST',
        })

        if (response.status >= 400) {
            return NextResponse.json({
                error: "There was an error subscribing to the newsletter. Hit us up mooment.marketing@gmail.com and we'll add you the old fashioned way :(."
            }, {
                status: 400
            });
        }
        return NextResponse.json({
            message: 'Subscribed successful',
        }, {
            status: 200,
        })
    }
    catch (err: any) { 
        return NextResponse.json({
            error: err.message || err.toString(),
        }, {
            status: 500,
        })
    } 
};