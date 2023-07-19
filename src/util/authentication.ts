import { DIDSession } from "did-session";
// import { readFileSync, readdirSync } from 'fs';
// import { fromString } from "uint8arrays/from-string";

import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import type { CeramicApi } from "@ceramicnetwork/common"
import type { ComposeClient } from "@composedb/client";

// import { DID } from 'dids';
// import { getResolver } from "key-did-resolver";
// import { Ed25519Provider } from "key-did-provider-ed25519";

// If you are relying on an injected provider this must be here otherwise you will have a type error. 
declare global {
  interface Window {
    ethereum: any;
  }
}

/**
 * Checks localStorage for a stored DID Session. If one is found we authenticate it, otherwise we create a new one.
 * @returns Promise<DID-Session> - The User's authenticated sesion.
 */
export const authenticateCeramic = async (ceramic: CeramicApi, compose: ComposeClient) => {
  const sessionStr = localStorage.getItem('did') // for production you will want a better place than localStorage for your sessions.
  let session

  if(sessionStr) {
    session = await DIDSession.fromSession(sessionStr)
  }

  if(!session || (session.hasSession && session.isExpired)) {
    if (window.ethereum === null || window.ethereum === undefined) {
      throw new Error("No injected Ethereum provider found.");
    }

    // We enable the ethereum provider to get the user's addresses.
    const ethProvider = window.ethereum;
    // request ethereum accounts.
    const addresses = await ethProvider.enable({
      method: "eth_requestAccounts",
    });
    const accountId = await getAccountId(ethProvider, addresses[0])
    const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)

    /**
     * Create DIDSession & provide capabilities that we want to access.
     * @NOTE: Any production applications will want to provide a more complete list of capabilities.
     *        This is not done here to allow you to add more datamodels to your application.
     */
    // TODO: update resources to only provide access to our composities
    session = await DIDSession.authorize(authMethod, {resources: ["ceramic://*"]})
    // Set the session in localStorage.
    localStorage.setItem('did', session.serialize());
  }

  // Set our Ceramic DID to be our session DID.
  compose.setDID(session.did)
  ceramic.did = session.did
  return session
}

// export const  authenticateCeramicKey = async (ceramic: CeramicApi, compose: ComposeClient) => {
//   const seed = readFileSync('/home/slyracoon23/Documents/hackathon/augmentAI/annotat3/admin.sk', 'utf8')
//   const key = fromString(
//     seed,
//     "base16"
//   );
//   const did = new DID({
//     resolver: getResolver(),
//     provider: new Ed25519Provider(key)
//   })
//   await did.authenticate()
//   compose.setDID(did)
//   return did;
//   // compose.did = did
// }
