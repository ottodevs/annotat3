import { ComposeClient }from '@composedb/client'
// import {definition} from '../src/__generated__/definition.js';

// import { authenticateCeramic, authenticateCeramicKey} from "../src/util/authentication"

import { readFileSync, readdirSync } from 'fs';
import { fromString } from "uint8arrays/from-string";

import { DID } from 'dids';
import { getResolver } from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";

 
export const definition = {"models":{"User":{"id":"kjzl6hvfrbw6c6o6cavisgaow8kj1mq982apr7z88h9allmvdzac23b7oufss69","accountRelation":{"type":"single"}},"Dataset":{"id":"kjzl6hvfrbw6c5xy4kbo1r6xxo4n4n6u2940ehnb0o2qnfh09nrom1t89vh5f27","accountRelation":{"type":"list"}},"BlipCaptionRecord":{"id":"kjzl6hvfrbw6c70pya30xxhbmi6622ft1d357rm8kb4w4hkq9to1cvg1lx2bgh1","accountRelation":{"type":"list"}}},"objects":{"User":{"last_name":{"type":"string","required":true},"first_name":{"type":"string","required":true},"author":{"type":"view","viewType":"documentAccount"},"datasets":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c5xy4kbo1r6xxo4n4n6u2940ehnb0o2qnfh09nrom1t89vh5f27","property":"userId"}}},"Dataset":{"name":{"type":"string","required":true},"type":{"type":"string","required":false},"userId":{"type":"streamid","required":true},"user":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c6o6cavisgaow8kj1mq982apr7z88h9allmvdzac23b7oufss69","property":"userId"}},"author":{"type":"view","viewType":"documentAccount"}},"BlipCaptionRecord":{"_id":{"type":"integer","required":true},"uid":{"type":"integer","required":true},"url":{"type":"string","required":true},"type":{"type":"string","required":true},"stars":{"type":"integer","required":true},"review":{"type":"string","required":true},"filename":{"type":"string","required":true},"annotator":{"type":"integer","required":true},"datasetId":{"type":"streamid","required":true},"lead_time":{"type":"float","required":true},"created_at":{"type":"string","required":true},"updated_at":{"type":"string","required":true},"annotation_id":{"type":"integer","required":true},"author":{"type":"view","viewType":"documentAccount"},"dataset":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5xy4kbo1r6xxo4n4n6u2940ehnb0o2qnfh09nrom1t89vh5f27","property":"datasetId"}}}},"enums":{},"accountData":{"user":{"type":"node","name":"User"},"datasetList":{"type":"connection","name":"Dataset"},"blipCaptionRecordList":{"type":"connection","name":"BlipCaptionRecord"}}}
console.log("definition", definition);


 const  authenticateCeramicKey = async (ceramic, compose) => {
    const seed = readFileSync('/home/slyracoon23/Documents/hackathon/augmentAI/annotat3/admin.sk', 'utf8')
    const key = fromString(
      seed,
      "base16"
    );
    const did = new DID({
      resolver: getResolver(),
      provider: new Ed25519Provider(key)
    })
    await did.authenticate()
  
  
    compose.setDID(did)
    return did;
    // compose.did = did
  }
  

const ceramic = 'http://localhost:7007'
const compose = new ComposeClient({ ceramic, definition })
const did = await authenticateCeramicKey(ceramic, compose)
compose.setDID(did)


// const resCreate = await compose.executeQuery(`
// mutation {
//     createUser(input: {
//       content: {
//         first_name: """ Ceramics""",
//         last_name: """ Node """
//       }
//     })
//     {
//       document {
//         first_name,
//         last_name
//       }
//     }
//   }
// `)


// const res = await compose.executeQuery(`
// query {
//     viewer {
//     user {
//         first_name,
//         last_name
//     }
//     }
// }
// `)

 
// console.log("res", res);


const resCreate = await compose.executeQuery(`
mutation {
    createDataset(input: {
      content: {
        name: """ name """,
        type: """ type """,
        userId: "k2t6wzhkhabz3jez7n6qgm688aaexsfd9sdpktrjqjf2i28jenve0jln6mbief"
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


const datasetResponse = await compose.executeQuery(`
query {
  datasetIndex(first: 10) {
    edges {
      node {
        name
      }
    }
  }
}
    `);

console.log("datasetResponse", datasetResponse);


// TODO: add encryption logic here?