import { NextResponse } from 'next/server'
 
export async function GET() {
    //   const res = await fetch('https://data.mongodb-api.com/...', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'API-Key': process.env.DATA_API_KEY,
    //     },
    //   })
    //   const data = await res.json()
    const data = "it works"
 
    return NextResponse.json({ data })
}

// TODO: add encryption logic here?