const {warpcaster } = require('../utils/warpcaster-api');

const getFarcasterLikes = async (castHash) => {
  try {
    console.log('getLikes fn ---');
    const res = await warpcaster(`/cast-reactions?castHash=${castHash}&limit=25`);
    console.log('res in get likes ', res);

    // log all reactions
    const reactions = res.result.reactions;
    reactions.forEach((reaction) => {
      console.log(reaction);
    });

    return res;
  } catch (error) {
    console.error('Error in getFarcasterLikes:', error);
  }
};

module.exports = { getFarcasterLikes };
