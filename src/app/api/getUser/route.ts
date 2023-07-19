import { NextResponse } from 'next/server'
import { ComposeClient }from '@composedb/client'
import {definition} from './src/__generated__/definition.mjs';

import { authenticateCeramic } from "../../../util/authentication"
 
console.log("definition", definition);

export async function GET() {
    const ceramic = 'http://localhost:7007'
    const compose = new ComposeClient({ ceramic, definition })
    const session = await authenticateCeramic(ceramic, compose)

    const res = await compose.executeQuery(`
    query {
      viewer {
        user {
          first_name,
          last_name
        }
      }
    }
    `)
 
    return NextResponse.json({ res.data.viewer.user })
}

// TODO: add encryption logic here?