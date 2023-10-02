// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {FarcasterRestrictedNft} from "../src/FarcasterRestrictedNft.sol";

import {Script, console2} from "../lib/forge-std/src/Script.sol";

import {FileReader} from "./FileReader.s.sol";

contract FarcasterRestrictedNftDeployer is Script, FileReader {
    string stringifiedFunctionLogic;

    FarcasterRestrictedNft public farcasterRestrictedNft;

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        string memory s = readJavascriptFunctionFile("get-farcaster-likes-flat.js");

        console2.log(s);

        farcasterRestrictedNft = new FarcasterRestrictedNft(
            "FarcasterRestrictedNft",
            "FRN",
            address(0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C), // replace with mumbai functionsOracleProxy (not definitely it - 0xeA6721aC65BCeD841B8ec3fc5fEdeA6141a0aDE4)
            stringifiedFunctionLogic,
            347 
        );

        vm.stopBroadcast();
    }
}
