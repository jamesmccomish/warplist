// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.8.20;

import { PRBTest } from "prb-test/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";

import { AddressTestConfig } from "./AddressTestConfig.t.sol";
import { TokenTestConfig } from "./TokenTestConfig.t.sol";

// Config to setup basic tests
abstract contract BasicTestConfig is PRBTest, AddressTestConfig, TokenTestConfig {
    /// -----------------------------------------------------------------------
    /// Setup
    /// -----------------------------------------------------------------------

    constructor() { }
}
