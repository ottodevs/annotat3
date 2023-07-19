import { ComposeClient }from '@composedb/client'
// import {definition} from '../src/__generated__/definition.js';

// import { authenticateCeramic, authenticateCeramicKey} from "../src/util/authentication"

import { readFileSync, readdirSync } from 'fs';
import { fromString } from "uint8arrays/from-string";

import { DID } from 'dids';
import { getResolver } from "key-did-resolver";
import { Ed25519Provider } from "key-did-provider-ed25519";

 
export const definition = {"models":{"BasicProfile":{"id":"kjzl6hvfrbw6cazpgpzg4siy8tzn8h11py31grx93noxx6ivrke3b7ov2nzau26","accountRelation":{"type":"single"}},"Posts":{"id":"kjzl6hvfrbw6calc17qkqn6l24ei9jbcd1bb5h61uj9ipyelq6jcx1war0m1qgc","accountRelation":{"type":"list"}},"Following":{"id":"kjzl6hvfrbw6ca8otew2wdm9a25c2qzc6dlklfdv1sekzhtyff74oakabbfmfqo","accountRelation":{"type":"list"}}},"objects":{"BasicProfile":{"name":{"type":"string","required":true},"emoji":{"type":"string","required":false},"gender":{"type":"string","required":false},"username":{"type":"string","required":true},"description":{"type":"string","required":false},"posts":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6cazpgpzg4siy8tzn8h11py31grx93noxx6ivrke3b7ov2nzau26","property":"profileId"}}},"Posts":{"body":{"type":"string","required":true},"edited":{"type":"datetime","required":false},"created":{"type":"datetime","required":true},"profileId":{"type":"streamid","required":true},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6cazpgpzg4siy8tzn8h11py31grx93noxx6ivrke3b7ov2nzau26","property":"profileId"}}},"Following":{"profileId":{"type":"streamid","required":true},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6cazpgpzg4siy8tzn8h11py31grx93noxx6ivrke3b7ov2nzau26","property":"profileId"}}}},"enums":{},"accountData":{"basicProfile":{"type":"node","name":"BasicProfile"},"postsList":{"type":"connection","name":"Posts"},"followingList":{"type":"connection","name":"Following"}}}

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

 
console.log("res", res);

// TODO: add encryption logic here?