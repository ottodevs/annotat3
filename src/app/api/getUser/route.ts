import { NextResponse } from 'next/server'
import { ComposeClient }from '@composedb/client'
import {definition} from '../../../__generated__/definition.js';

import { authenticateCeramic, authenticateCeramicKey} from "../../../util/authentication"
 
console.log("definition", definition);

export async function GET() {
    const ceramic = 'http://localhost:7007'
    const compose = new ComposeClient({ ceramic, definition })
    const did = await authenticateCeramicKey(ceramic, compose)
    compose.setDID(did)


    const res = await compose.executeQuery(`
    query {
      viewer {
        user {
          id,
          first_name,
          last_name
        }
      }
    }
    `)

 
    console.log("res", res);
    return NextResponse.json({ res})
}

// TODO: add encryption logic here?