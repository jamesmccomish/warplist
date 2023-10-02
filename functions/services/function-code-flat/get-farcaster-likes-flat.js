
const baseUrl = 'https://api.warpcast.com';
const version = 'v2';

/// @dev uncomment for production
//const callerAddress = args[0];

const warpcaster = async (path) => {
  const url = `${baseUrl}/${version}${path}`;

  try {
    const response = await fetch(url, {
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

const getFarcasterLikes = async (castHash, callerAddress) => {
  try {
    const res = await warpcaster(`/cast-reactions?castHash=${castHash}&limit=100`);

    const reactions = res.result.reactions;

    // TODO handle errors and empty reactions

    // Filter only 'like' items
    const likeItems = reactions.filter(item => item.type === 'like');

    // console.log('likeItems', likeItems)

    // Check if there is at least one like with a matching address
    const hasMatchingAddress = await Promise.all(
      likeItems.map(async item => {
        try {
          const fid = item.reactor.fid;

          /// @dev uncomment for production
          //const verificationResponse = await warpcaster(`/verifications?fid=${callerAddress}`);
          /// @dev comment for production
          const verificationResponse = await warpcaster(`/verifications?fid=3`);
          const address = verificationResponse.result.verifications[0]?.address;

          //console.log({ address })

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
    console.error('Error in getFarcasterLikes:', error);
    // Handle the main error, e.g., by returning 0 or rethrowing the error
    return 0;
  }
};

/// @dev comment for production
// ---------------------------------------------
// Usage example
// ---------------------------------------------
const castHash = '0xcc1cb08481aa0b048588a59a608f27c7214ac79e'; // https://warpcast.com/nanditmehra/0x08049923
const callerAddress = '0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea';

getFarcasterLikes(castHash, callerAddress)
  .then(result => {
    // Handle the result (1 if there is a match, 0 otherwise)
    console.log(result);
  })
  .catch(error => {
    // Handle the error
    console.error(error);
  });
// ---------------------------------------------

/// @dev uncomment for production
// ---------------------------------------------
// production code
// ---------------------------------------------
// return Functions.encodeUint256(getFarcasterLikes(castHash, callerAddress)
//   .then(result => {
//     // Handle the result (1 if there is a match, 0 otherwise)
//     console.log(result);
//     return result
//   })
//   .catch(error => {
//     // Handle the error
//     console.error(error);
//   }));
// return Functions.encodeUint256(1);
// ---------------------------------------------
