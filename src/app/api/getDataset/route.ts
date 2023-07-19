import { NextResponse } from "next/server";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../../__generated__/definition.js";

import {
  authenticateCeramic,
  authenticateCeramicKey,
} from "../../../util/authentication";

console.log("definition", definition);

export async function GET() {
  const ceramic = "http://localhost:7007";
  const compose = new ComposeClient({ ceramic, definition });
  const did = await authenticateCeramicKey(ceramic, compose);
  compose.setDID(did);

  const datasetResponse = await compose.executeQuery(`
    query {
      datasetIndex(first: 100){
        edges {
            node {
              id,
              name,
              type,
              userId
                  }
            }
      }
    }
    `);

  console.log("datasetResponse", datasetResponse);
  return NextResponse.json({ datasetResponse });
}
