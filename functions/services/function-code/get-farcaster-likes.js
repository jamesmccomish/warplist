const { warpcaster } = require('../utils/warpcaster-api');

const getFarcasterLikes = async (castHash) => {
  try {
    console.log('getFarcasterLikes fn ---');
    const res = await warpcaster(`/cast-reactions?castHash=${castHash}&limit=10`);

    const reactions = res.result.reactions;

    // TODO handle errors and empty reactions

    // Filter only 'like' items
    const likeItems = reactions.filter(item => item.type === 'like');

    // Extract required properties 
    const filteredReactionData = likeItems.map(item => ({
      hash: item.hash,
      reactor: {
        fid: item.reactor.fid,
        username: item.reactor.username
      }
    }));

    console.log({ filteredReactionData });

    return filteredReactionData;
  } catch (error) {
    console.error('Error in getFarcasterLikes:', error);
    return []
  }
};

const checkMatchingAddress = async (likeItems, callerAddress) => {
  try {
    const hasMatchingAddress = await Promise.all(
      likeItems.map(async (item) => {
        try {
          const fid = item.reactor.fid;

          // Uncomment for production
          // const verificationResponse = await warpcaster(`/verifications?fid=${callerAddress}`);
          // Comment for production
          const verificationResponse = await warpcaster(`/verifications?fid=3`);
          const address = verificationResponse.result.verifications[0]?.address;

          console.log({ address });

          // Check if the address matches the callerAddress
          return address === callerAddress;
        } catch (verificationError) {
          console.error('Error in verification request:', verificationError);
          // Handle verification error, e.g., by returning false
          return false;
        }
      })
    );

    // Return 1 if there is a match, otherwise return 0
    return hasMatchingAddress.includes(true) ? 1 : 0;
  } catch (error) {
    console.error('Error in checkMatchingAddress:', error);
    return 0;
  }
};

module.exports = { getFarcasterLikes, checkMatchingAddress };


/** @dev reaction object example
 {
   type: 'like',
   hash: '0xa992bc3e5dc2f48f4d2a9b36635a0ea40108cdae',
   reactor: {
     fid: 12746,
     username: 'trustscore',
     displayName: 'TrustScore',
     pfp: { url: 'https://i.imgur.com/dINPUZe.png', verified: false },
     profile: { bio: [Object], location: [Object] },
     followerCount: 68,
     followingCount: 59,
     activeOnFcNetwork: false,
     viewerContext: { following: false, followedBy: false }
   },
   timestamp: 1686848253000,
   castHash: '0x92dc68040066319b2174c791f269af3ea5ac1bd1'
 }
*/