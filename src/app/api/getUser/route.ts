import { NextResponse } from 'next/server'
import { ComposeClient }from '@composedb/client'
import {definition} from '../../../__generated__/definition.js';

// import { authenticateCeramic, authenticateCeramicKey} from "../../../util/authentication"
 
console.log("definition", definition);

export async function GET(req: { url: string }) {
    const {searchParams} = new URL(req.url);
    const did = searchParams.get("did");
    const ceramic = 'http://localhost:7007'
    const compose = new ComposeClient({ ceramic, definition })
    // const did = await authenticateCeramicKey(ceramic, compose)
    compose.setDID(did)


    const res = await compose.executeQuery(`
    query {
      userIndex(first: 100){
        edges {
          node {
          id,
          first_name,
          last_name
        }
      }
    }
  }
    `)

 
    console.log("res", res);
    return NextResponse.json({ res})
}

// TODO: add encryption logic here?