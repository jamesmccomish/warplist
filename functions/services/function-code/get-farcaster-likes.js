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
  }
};

module.exports = { getFarcasterLikes };


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