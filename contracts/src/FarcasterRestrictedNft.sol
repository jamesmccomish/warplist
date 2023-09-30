// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "../lib/solbase/src/tokens/ERC721/ERC721.sol";

import {FarcasterLikesChainlinkFunction} from "./FarcasterLikesChainlinkFunction.sol";

contract FarcasterRestrictedNft is ERC721 {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address to, uint256 id) external {
        _mint(to, id);
    }

    function burn(uint256 id) external {
        _burn(id);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return "TODO";
    }
}
