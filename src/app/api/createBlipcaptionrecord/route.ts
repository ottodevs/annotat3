import { NextResponse } from "next/server";
import { ComposeClient } from "@composedb/client";
import { definition } from "../../../__generated__/definition.js";

import {
  authenticateCeramic,
  authenticateCeramicKey,
} from "../../../util/authentication";

console.log("definition", definition);

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const did = searchParams.get("did");
  const { 
    author, 
    annotation,
     annotator,
     created_at,
     filename,
      _id,
      lead_time,
      review,
      stars,
      type,
      uid,
      updated_at,
      url,
      datasetId
   } = await req.json();

  const ceramic = "http://localhost:7007";
  const compose = new ComposeClient({ ceramic, definition });
  // const did = await authenticateCeramicKey(ceramic, compose);
  compose.setDID(did);


  // Calling the function with dummy data
// const author = "did:example:123";
// const annotation_id = 1;
// const annotator = 1;
// const created_at = "2023-07-19T00:00:00Z";
// const filename = "example.jpg";
// const _id = 1;
// const lead_time = 1.0;
// const review = "Great!";
// const stars = 5;
// const type = "Type1";
// const uid = 1;
// const updated_at = "2023-07-19T00:00:00Z";
// const url = "http://example.com/image.jpg";
// const datasetId = "kjzl6kcym7w8y8o2hgjzhftlmbkm9vpas5pioydntxj6qk8nhj6jww1g5s7acis";


  const resCreate = await compose.executeQuery(`
    mutation {
      createBlipCaptionRecord(input: {
        content: {
          annotation_id: ${annotation_id},
          annotator: ${annotator},
          created_at: "${created_at}",
          filename: "${filename}",
          _id: ${_id},
          lead_time: ${lead_time},
          review: "${review}",
          stars: ${stars},
          type: "${type}",
          uid: ${uid},
          updated_at: "${updated_at}",
          url: "${url}",
          datasetId: "${datasetId}"
        }
      }) {
        document {
          annotation_id,
          annotator,
          created_at,
          filename,
          _id,
          lead_time,
          review,
          stars,
          type,
          uid,
          updated_at,
          url,
          datasetId
        }
      }
    }
  `);

  console.log("res", resCreate);
  return NextResponse.json({ resCreate });
}
