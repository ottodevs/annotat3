# Development

## Setup and ceramic development

- Install deps: `pnpm install`
- Run local ceramic node: `./node_modules/@ceramicnetwork/cli/bin/ceramic.js daemon`
- Generate private key: `./node_modules/@composedb/cli/bin/run.js did:generate-private-key`
- Generate public DID from private key: `./node_modules/@composedb/cli/bin/run.js did:from-private-key [your-private-key]`
    - Save this public key into `~/.ceramic/daemon.config.json`, within the existing `admin-dids` array.
- Confirmation spin on testnet: `./node_modules/@ceramicnetwork/cli/bin/ceramic.js --network=testnet-clay`

## Compile the composite schema

- `composedb composite:create composites/blipCaptionRecord.graphql --output=src/__generated__/blipCaptionRecord.json --did-private-key=[your-private-key]`

Order for compiling:
- 




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contract Deployments

- Mumbai
    - Escrow with 0xE13F6360eCD6dF96290d5581fAC6ab57B9c5fa56 as admin deployed to 0x4621c9c6dAF8eB5E55a3F50a1aE04F0AeA250809
        ```sh
             hardhat verify --network mumbai 0x4621c9c6dAF8eB5E55a3F50a1aE04F0AeA250809 "0xE13F6360eCD6dF96290d5581fAC6ab57B9c5fa56"
            Successfully submitted source code for contract
            contracts/Escrow.sol:Escrow at 0x4621c9c6dAF8eB5E55a3F50a1aE04F0AeA250809
            for verification on the block explorer. Waiting for verification result...

            Successfully verified contract Escrow on the block explorer.
            https://mumbai.polygonscan.com/address/0x4621c9c6dAF8eB5E55a3F50a1aE04F0AeA250809#code
        ```
    - Token Annotoken [ANN] deployed to 0x276ee636F8080034b98253d232d941C8FfcD35C9
        ```sh
             hardhat verify --network mumbai 0x276ee636F8080034b98253d232d941C8FfcD35C9 "Annotoken" "ANN"
            Successfully submitted source code for contract
            contracts/Token.sol:Token at 0x276ee636F8080034b98253d232d941C8FfcD35C9
            for verification on the block explorer. Waiting for verification result...

            Successfully verified contract Token on the block explorer.
            https://mumbai.polygonscan.com/address/0x276ee636F8080034b98253d232d941C8FfcD35C9#code
        ```