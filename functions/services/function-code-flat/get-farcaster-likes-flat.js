
const baseUrl = 'https://api.warpcast.com';
const version = 'v2';

const callerAddress = args[0];

const warpcaster = async (path) => {
  const url = `${baseUrl}/${version}${path}`;

  try {
    const response = await Functions.makeHttpRequest(url, {
      headers: {
        'Content-Type': 'application/json', // Adjust headers as needed
        // Add any other headers here
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error', error);
    } else {
      console.error('Unhandled error', error);
    }
  }
};

const getFarcasterLikes = async (castHash) => {
  try {
    console.log('getFarcasterLikes fn ---');
    const res = await warpcaster(`/cast-reactions?castHash=${castHash}&limit=10`);

    const reactions = res.result.reactions;

    // TODO handle errors and empty reactions

    // Filter only 'like' items
    const likeItems = reactions.filter(item => item.type === 'like');

    // check agains address here (callerAddress)

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

// TODO handle input of args to the function
getFarcasterLikes('0x92dc68040066319b2174c791f269af3ea5ac1bd1');

return Functions.encodeUint256(1);
