"use client";

import Link from "next/link";
// import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { useCeramicContext } from "@/context/ceramic.context";
import { useEffect, useState } from "react";
import { authenticateCeramic } from "@/util/authentication";
import { Wagmi } from "@/components/wagmi.component";

type Profile = {
  did: string;
};

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

  const getUserAPI = async () => {
    try {
      const user = await fetch(`/api/getUser?did=${localStorage.getItem("did")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const item = await user.json();
      console.log(item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDatasetAPI = async () => {
    try {
      const dataset = await fetch(`/api/getDataset?did=${localStorage.getItem("did")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const item = await dataset.json();
      console.log(item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getBlipcaptionrecordAPI = async () => {
    try {
      const blip = await fetch(`/api/getBlipcaptionrecord?did=${localStorage.getItem("did")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const item = await blip.json();
      console.log(item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createUserAPI = async (first_name, last_name) => {
    try {
      const resCreate = await fetch(`/api/createUser?did=${localStorage.getItem("did")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: first_name, last_name: last_name }),
      });
      const item = await resCreate.json();
      console.log(item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createDatasetAPI = async (name, type, userId) => {
    try {
      const resCreate = await fetch(`/api/createDataset?did=${localStorage.getItem("did")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, type: type, userId: userId }),
      });
      const item = await resCreate.json();
      console.log(item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createBlipcaptionrecordAPI = async (
    annotation_id, annotator, created_at, filename, _id, lead_time, review, stars, type, uid, updated_at, url ,datasetId) => {
    try {
      const resCreate = await fetch(`/api/createBlipcaptionrecord?did=${localStorage.getItem("did")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ annotation_id: annotation_id, annotator: annotator, created_at: created_at, filename: filename, _id: _id, lead_time: lead_time, review: review, stars: stars, type: type, uid: uid, updated_at: updated_at, url: url ,datasetId: datasetId}),
      });
      const item = await resCreate.json();
      console.log(item);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
      

//   const getUser = async () => {
//     try {
//       const user = await composeClient.executeQuery(`
//     query {
//       userIndex(first: 100){
//         edges {
//           node {
//           id,
//           first_name,
//           last_name
//         }
//       }
//     }
//   }
//     `);

//       console.log(user);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const getDataset = async () => {
//     try {
//       const dataset = await composeClient.executeQuery(`
//       query {
//         datasetIndex(first: 100){
//           edges {
//               node {
//                 id,
//                 name,
//                 type,
//                 userId
//                     }
//               }
//         }
//       }
//       `);
//       console.log(dataset);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const getBlipcaptionrecord = async () => {
//     try {
//       const blip = await composeClient.executeQuery(`
//       query {
//         blipCaptionRecordIndex(first: 100) {
//           edges {
//             node {
//               annotation_id,
//               annotator,
//               created_at,
//               filename,
//               _id,
//               lead_time,
//               review,
//               stars,
//               type,
//               uid,
//               updated_at,
//               url,
//               datasetId,
//               dataset {
//                 id, 
//                 name, 
//               }
//             }
//           }
//         }
//       }    
//       `);
//       console.log(blip);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const createUser = async (first_name, last_name) => {
//     try {
//       const resCreate = await composeClient.executeQuery(`
//     mutation {
//         createUser(input: {
//           content: {
//             first_name: """ ${first_name} """,
//             last_name: """ ${last_name} """
//           }
//         })
//         {
//           document {
//             first_name,
//             last_name
//           }
//         }
//       }
// `);
//       console.log(resCreate);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const createDataset = async (name, type, userId) => {
//     try {
//       const resCreate = await composeClient.executeQuery(`
//       mutation {
//           createDataset(input: {
//             content: {
//               name: """ ${name} """,
//               type: """ ${type} """,
//               userId: """ ${userId} """
//             }
//           })
//           {
//             document {
//               name,
//               type,
//               userId
//             }
//           }
//         }
//   `);
//       console.log(resCreate);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const createBlipcaptionrecord = async (
//     annotation_id, annotator, created_at, filename, _id, lead_time, review, stars, type, uid, updated_at, url ,datasetId) => {
//     try {

//     const resCreate = await composeClient.executeQuery(`
//     mutation {
//       createBlipCaptionRecord(input: {
//         content: {
//           annotation_id: ${annotation_id},
//           annotator: ${annotator},
//           created_at: "${created_at}",
//           filename: "${filename}",
//           _id: ${_id},
//           lead_time: ${lead_time},
//           review: "${review}",
//           stars: ${stars},
//           type: "${type}",
//           uid: ${uid},
//           updated_at: "${updated_at}",
//           url: "${url}",
//           datasetId: "${datasetId}"
//         }
//       }) {
//         document {
//           annotation_id,
//           annotator,
//           created_at,
//           filename,
//           _id,
//           lead_time,
//           review,
//           stars,
//           type,
//           uid,
//           updated_at,
//           url,
//           datasetId
//         }
//       }
//     }
//   `);
//   console.log(resCreate);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };


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

  return (
    <main className="flex flex-col items-center justify-start p-24 min-h-full">
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
        <button
          onClick={() => {
            grabDataset();
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          test model 
        </button>
        <br />

        <button
          onClick={() => {
            getUserAPI();
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          get user
        </button>
        <button
          onClick={() => {
            getDatasetAPI();
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          get dataset  
        </button> 
        <button
          onClick={() => {
            getBlipcaptionrecordAPI();
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          get blipcaptionrecord  
        </button>
        <button
          onClick={() => {
            createUserAPI("test", "test");
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          create user  
        </button>
        <button
          onClick={() => {
            createDatasetAPI("test", "test", "test");
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          create dataset 
        </button>
        <button
          onClick={() => {
            createBlipcaptionrecordAPI("")
          }}
          style={{ margin: "auto", alignContent: "center" }}
        >
          <br />
          create blipcaptionrecord  
        </button>
      </div>
    </main>
  );
}
