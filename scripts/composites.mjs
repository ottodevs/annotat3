import { readFileSync } from 'fs';
import { CeramicClient } from '@ceramicnetwork/http-client'
import {
  createComposite,
  readEncodedComposite,
  writeEncodedComposite,
  writeEncodedCompositeRuntime,
} from "@composedb/devtools-node";
import { Composite } from "@composedb/devtools";
import { DID } from 'dids';
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays/from-string";

const ceramic = new CeramicClient("http://localhost:7007");

/**
//  * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
export const writeComposite = async () => {
  await authenticate()

  //Note: the lines below are commented out because we are accessing existing/already deployed streams

  const userComposite = await createComposite(
    ceramic,
    "../models/user.graphql"
  );

  const datasetSchema = readFileSync("../models/dataset.graphql", {
    encoding: "utf-8",
  }).replace("$USER_ID", userComposite.modelIDs[0])

  const dataSetComposite = await Composite.create({
    ceramic,
    schema: datasetSchema,
  });

  const blipCaptionRecordSchema = readFileSync("../models/blipCaptionRecord.graphql", {
    encoding: "utf-8",
  }).replace("$DATASET_ID", dataSetComposite.modelIDs[1])

  const blipCaptionRecordComposite = await Composite.create({
    ceramic,
    schema: blipCaptionRecordSchema,
  });

  // const datasetConnectSchema = readFileSync("./composites-newer/03-DatasetConnect.graphql", {
  //   encoding: "utf-8",
  // }).replace("$TEXTCLASSIFICATION_ID", textClassificationComposite.modelIDs[1])
  //   .replace("$DATASET_ID", dataSetComposite.modelIDs[1])

  // const dataSetConnectComposite = await Composite.create({
  //   ceramic,
  //   schema: datasetConnectSchema,
  // });

  // const userConnectSchema = readFileSync("./composites-newer/04-UserConnect.graphql", {
  //   encoding: "utf-8",
  // }).replace("$DATASET_ID", dataSetComposite.modelIDs[1])
  //   .replace("$USER_ID", userComposite.modelIDs[0])

  // const userConnectComposite = await Composite.create({
  //   ceramic,
  //   schema: userConnectSchema,
  // });

  const composite = Composite.from([
    userComposite,
    dataSetComposite,
    blipCaptionRecordComposite
    // dataSetConnectComposite,
    // userConnectComposite
  ]);

  console.log("writing composite to Ceramic")
  // const composite = await createComposite(ceramic, './composites/basicProfile.graphql')
  await writeEncodedComposite(composite, "./src/__generated__/definition.json");
  console.log('creating composite for runtime usage')
  await writeEncodedCompositeRuntime(
    ceramic,
    "./src/__generated__/definition.json",
    "./src/__generated__/definition.js"
  );
  console.log('deploying composite')
  const deployComposite = await readEncodedComposite(ceramic, './src/__generated__/definition.json')

  await deployComposite.startIndexingOn(ceramic)
  console.log("composite deployed & ready for use");
}


/**
 * Authenticating DID for publishing composite
 * @return {Promise<void>} - return void when DID is authenticated.
 */
const authenticate = async () => {
  const seed = readFileSync('../admin.sk', 'utf8').replace(/\n/g, '')
  const key = fromString(
    seed,
    "base16"
  );
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(key)
  })
  await did.authenticate()
  ceramic.did = did
}


writeComposite().catch((error) => {
  console.error(error);
  process.exit(1);
}
);
