# Warplist

> Turn any Warpcast post into a whitelist for an NFT mint.

This project is intended to allow a creator on Farcater to cast about an upcoming NFT mint, and reward any follower who likes it with whitelist for the mint.

## How it works
- Creator casts about an upcoming NFT mint
- Cast hash is recorded and stored in a javascript function which is stored and deployed onchain.
- Creator deploys a modified ERC721 contract of type `FarcasterRestrictedNft` which has the .js source code written to storage.
- When the time comes to mint, a follower calls the `whitelistMint`` function, the contract calls the Chainlink function to verify the msg.sender has liked the contract.

## Hackathon
This project was created for the Chainlink Smartcon Hackathon 2023. It is a work in progress and is not yet ready for production.

- See [FarcasterRestrictedNft.sol](./contracts/src/FarcasterRestrictedNft.sol) for the modified ERC721 contract.
- See [get-farcaster-likes.js](./functions/services/function-code-flat/get-farcaster-likes-flat.js) for the Chainlink function. (This was flattened to be inlined on the contract - an alternative was to host this fn to be called by chainlink.)
- See frontend to run basic landing page where you can enter a cast hash to check who liked (and has been permitted WL) for the cast.

## Current limitations
- Frontend needs updated to:
    - Allow creator to connect wallet & Farcaster to cast directly from the site.
    - Link to a script to deploy the NFT contract, linked to a Chainlink subscription.
- Better way to search for the address of the Farcaster user based on FID.
- General code quality & conversion to typescript...