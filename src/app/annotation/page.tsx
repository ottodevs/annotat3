"use client"
import Link from 'next/link'
import * as LitJsSdk from "@lit-protocol/lit-node-client";;

const accessControlConditions = [
  {
    contractAddress: "0xb18bb99c7849D39a27395dE2f412cc470f76947E",
    standardContractType: "ERC721",
    chain: "mumbai",
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0"
    }
  }
];

export default function Annotation() {
  const handleLit = async () => {
    try {
      console.log('lit protocol client');
      const client = new LitJsSdk.LitNodeClient({ alertWhenUnauthorized: false });
      await client.connect();
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "mumbai" });
      const result = await client.saveSigningCondition({
        accessControlConditions,
        chain: "mumbai",
        authSig,
        resourceId: {
            baseUrl: "empty",
            role: "none",
            orgId: "some",
            extraData: "other",
            path: "no_path"
        }
      });
      console.log('encryption complete: ', result)
      // TODO: submit encrypted data to ceramic
    } catch (err) {
      console.log('error while creating stream:', err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start p-24 min-h-full">
      Annotation Page
      <Link href="/home">Home</Link>
      <Link href="/statistics">Statistics</Link>
      <Link href="/library">Library</Link>
      <Link href="/profile">Profile</Link>
      <h1>Encrypt and submit annotation</h1>
        <button onClick={handleLit}>Encrypt with Lit & submit to ceramic</button>
    </main>
  )
}
