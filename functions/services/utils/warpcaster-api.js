// utils/warpcaster-api.js

const baseUrl = 'https://api.warpcast.com';
const version = 'v2';

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

module.exports = { warpcaster };
