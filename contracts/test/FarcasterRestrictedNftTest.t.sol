// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";

import "../src/FarcasterRestrictedNft.sol";

contract FarcasterRestrictedNftTest is Test {
    FarcasterRestrictedNft public farcasterRestrictedNft;

    function setUp() public {
        farcasterRestrictedNft = new FarcasterRestrictedNft('Test', 'T');
    }

    function testMint() public {
        farcasterRestrictedNft.mint(address(this), 1);
        assertEq(farcasterRestrictedNft.balanceOf(address(this)), 1);
    }
}
