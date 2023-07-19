"use client"

import Link from 'next/link'
// import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { useCeramicContext } from '@/context/ceramic.context';
import { useEffect, useState } from 'react';
import { authenticateCeramic } from '@/util/authentication';
import { Wagmi } from '@/components/wagmi.component';
import { Button } from '@/components/ui/button';


type Profile = {
  did: string
}

export default function HomePage() {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [profile, setProfile] = useState<Profile | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean>(false);

  //runs on useeffect
  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
    if (localStorage.getItem("did")) {
      setAuth(true);
    }
  };

  //sign in with Ethereum
  const authenticate = async () => {
    await authenticateCeramic(ceramic, composeClient);
    if (localStorage.getItem("did")) {
      setAuth(true);
    }
  };

  //use this method to encrypt a string
  const encrypt = async (input: string) => {
    const result = await fetch("/api/encrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const item = await result.json();
    return item.message;
  };

  //use this method to decrypt a string
  const decrypt = async (input: string) => {
    const result = await fetch("/api/decrypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const item = await result.json();
    return item.message;
  };

  const test = async () => {
    try {
      const datasets = await composeClient.executeQuery(`
      query {
        node(id: "did:pkh:eip155:1:0x514e3b94f0287caf77009039b72c321ef5f016e6") {
            ... on CeramicAccount {
            id
            datasetList(first: 100) {
                edges {
                node {
                    id
                    name
                  textClassificationRecords(first: 100){
                    edges{
                      node{
                        id
                     	  annotation_id
                        annotator
                        created_at
                        filename
                        _id
                        lead_time
                        review
                        sentiment
                        stars
                        type
                        uid
                        updated_at
                        url
                      }
                    }
                  }
                }
              }
            }
          } 
        }
      }
      `);
      console.log(datasets);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const grabDataset = async () => {
    try {
      const dataset = await composeClient.executeQuery(`
      query {
        node(id: "kjzl6kcym7w8y5nw29y15r5v92wv5vkcfk4oaajjez2satfxk5b735wqdw5d46r") {
            ... on Dataset {
            id
            textClassificationRecords(first: 20) {
                edges {
                node {
                    id
                    annotation_id
                    annotator
                    created_at
                    filename
                    _id
                    lead_time
                    review
                    sentiment
                    stars
                    type
                    uid
                    updated_at
                    url
                }
              }
            }
          } 
        }
      } 
      `);
      console.log(dataset);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("did")) {
      handleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define the Navbar component
const Navbar = ({ auth, authenticate }) => {
  return (
    <nav className="flex justify-between items-center p-8">
      <Link href="/">Home</Link>
      {auth ? (
        <button
          onClick={() => {
            alert("You are already authenticated");
          }}
        >
          Authenticated
        </button>
      ) : (
        <button
          onClick={() => {
            authenticate();
          }}
        >
          Authenticate ceramic
        </button>
      )}
    </nav>
  )
}

  return (
    <main className="flex flex-col items-center justify-start p-24 min-h-full">
      <Navbar auth={auth} authenticate={authenticate} />
      Homepage
      <Wagmi />
      <Link href="/annotation">Start annotating</Link>
      <div style={{ display: "relative", flexDirection: "column" }}>
          {auth ? (
            <button
              onClick={() => {
                alert("You are already authenticated");
              }}
              style={{ margin: "auto", alignContent: "center" }}
            >
              Authenticated
            </button>
          ) : (
            <button
              onClick={() => {
                authenticate();
              }}
              style={{ margin: "auto", alignContent: "center" }}
            >
              Authenticate ceramic
            </button>
          )}
          <Button
            onClick={() => {
              grabDataset();
            }}
            style={{ margin: "auto", alignContent: "center" }}
          >
            Test Button
          </Button>
        </div>
    </main>
);
}

