// SPDX-License-Identifier UNLICENSED
pragma solidity ^0.8.13;

/* solhint-disable no-console */

import {Script} from "../lib/forge-std/src/Script.sol";

/**
 * @notice - This contract runs the utils/reader.js script
 * 			 It is used to read the js code deployed to the contract for Chainlink functions
 */
contract FileReader is Script {
    function readJavascriptFunctionFile(string memory message) public returns (string memory) {
        string[] memory cmd = new string[](3);

        cmd[0] = "node";
        cmd[1] = "script/utils/reader.js";
        cmd[2] = message;

        bytes memory res = vm.ffi(cmd);

        string memory sigString = string(res);

        return sigString;
    }
}
