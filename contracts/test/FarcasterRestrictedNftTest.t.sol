// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../lib/forge-std/src/Test.sol";

import "../src/FarcasterRestrictedNft.sol";

contract FarcasterRestrictedNftTest is Test {
    FarcasterRestrictedNft public farcasterRestrictedNft;

    function setUp() public {
        farcasterRestrictedNft = new FarcasterRestrictedNft('Test', 'T', address(1), 'abc',  uint64(347));
    }

    function testMint() public {
        // farcasterRestrictedNft.whitelistMint(address(this), 1);
        // assertEq(farcasterRestrictedNft.balanceOf(address(this)), 1);
    }
}
