import { NextResponse } from "next/server";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../../__generated__/definition.js";

import {
  authenticateCeramic,
  authenticateCeramicKey,
} from "../../../util/authentication.js";

console.log("definition", definition);

export async function POST(name, type, userId) {
  const ceramic = "http://localhost:7007";
  const compose = new ComposeClient({ ceramic, definition });
  const did = await authenticateCeramicKey(ceramic, compose);
  compose.setDID(did);

  const resCreate = await compose.executeQuery(`
    mutation {
        createDataset(input: {
          content: {
            name: """ ${name} """,
            type: """ ${type} """,
            userId: """ ${userId} """
          }
        })
        {
          document {
            name,
            type,
            userId
          }
        }
      }
`);

  console.log("res", resCreate);
  return NextResponse.json({ resCreate });
}

// TODO: add encryption logic here?
