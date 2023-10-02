// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {FarcasterRestrictedNft} from "../src/FarcasterRestrictedNft.sol";

import {Script, console2} from "../lib/forge-std/src/Script.sol";

contract FarcasterRestrictedNftDeployer is Script {
    string logic = "return Functions.encodeUint256(1);";
    // "\nconst baseUrl = 'https://api.warpcast.com';\nconst version = 'v2';\n\nconst warpcaster = async (path) => {\n  const url = `${baseUrl}/${version}${path}`;\n\n  try {\n    const response = await Functions.makeHttpRequest(url, {\n      headers: {\n        'Content-Type': 'application/json', // Adjust headers as needed\n        // Add any other headers here\n      },\n    });\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! Status: ${response.status}`);\n    }\n\n    return await response.json();\n  } catch (error) {\n    if (error instanceof TypeError) {\n      console.error('Network error', error);\n    } else {\n      console.error('Unhandled error', error);\n    }\n  }\n};\n\nconst getFarcasterLikes = async (castHash) => {\n  try {\n    console.log('getFarcasterLikes fn ---');\n    const res = await warpcaster(`/cast-reactions?castHash=${castHash}&limit=10`);\n\n    const reactions = res.result.reactions;\n\n    // TODO handle errors and empty reactions\n\n    // Filter only 'like' items\n    const likeItems = reactions.filter(item => item.type === 'like');\n\n    // Extract required properties \n    const filteredReactionData = likeItems.map(item => ({\n      hash: item.hash,\n      reactor: {\n        fid: item.reactor.fid,\n        username: item.reactor.username\n      }\n    }));\n\n    console.log({ filteredReactionData });\n\n    return filteredReactionData;\n  } catch (error) {\n    console.error('Error in getFarcasterLikes:', error);\n  }\n};\n\n// TODO handle input of args to the function\ngetFarcasterLikes('0x92dc68040066319b2174c791f269af3ea5ac1bd1');\n\nreturn Functions.encodeUint256(1);\n";

    FarcasterRestrictedNft public farcasterRestrictedNft;

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        farcasterRestrictedNft = new FarcasterRestrictedNft(
            "FarcasterRestrictedNft",
            "FRN",
            address(0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C), // replace with mumbai functionsOracleProxy (not definitely it - 0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4)
            logic,
            347 
        );

        vm.stopBroadcast();
    }
}
