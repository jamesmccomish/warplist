// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { ERC1155 } from "solbase/tokens/ERC1155/ERC1155.sol";
//import { MockERC1155 } from "solbase-test/utils/mocks/MockERC1155.sol";
import { PRBTest } from "prb-test/PRBTest.sol";

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
