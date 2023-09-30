// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "../node_modules/@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";

// TODO
// - link to chainlink
// - add handler for allowing mints

contract FarcasterLikesChainlinkFunction is FunctionsClient {
    constructor(address router) FunctionsClient(router) {}

    // function handleOracleFulfillment(bytes32 requestId, bytes memory response, bytes memory err) external override {
    //     if (msg.sender != address(i_router)) {
    //         revert OnlyRouterCanFulfill();
    //     }
    //     fulfillRequest(requestId, response, err);
    // }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        // TODO
    }
}
