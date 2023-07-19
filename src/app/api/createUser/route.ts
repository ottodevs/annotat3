import { NextResponse } from "next/server";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../../__generated__/definition.js";

import {
  authenticateCeramic,
  authenticateCeramicKey,
} from "../../../util/authentication";

console.log("definition", definition);

export async function POST(first_name, last_name) {
  const ceramic = "http://localhost:7007";
  const compose = new ComposeClient({ ceramic, definition });
  const did = await authenticateCeramicKey(ceramic, compose);
  compose.setDID(did);

  const resCreate = await compose.executeQuery(`
    mutation {
        createUser(input: {
          content: {
            first_name: """ ${first_name} """,
            last_name: """ ${last_name} """
          }
        })
        {
          document {
            first_name,
            last_name
          }
        }
      }
`);

  console.log("res", resCreate);
  return NextResponse.json({ resCreate });
}

// TODO: add encryption logic here?
