// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "../lib/solbase/src/tokens/ERC721/ERC721.sol";

import {FarcasterLikesChainlinkFunction, FunctionsRequest} from "./FarcasterLikesChainlinkFunction.sol";

contract FarcasterRestrictedNft is ERC721, FarcasterLikesChainlinkFunction {
    using FunctionsRequest for FunctionsRequest.Request;

    uint256 public currentId;

    mapping(uint256 => address) public requestIdToMinter;

    constructor(
        string memory _name,
        string memory _symbol,
        address _router,
        string memory _farcasterApiCallLogic,
        uint64 _subscriptionId
    ) ERC721(_name, _symbol) FarcasterLikesChainlinkFunction(_router, _farcasterApiCallLogic, _subscriptionId) {}

    /// -----------------------------------------------------------------------
    /// ERC721 FUNCTIONS
    /// -----------------------------------------------------------------------
    function whitelistMint() external {
        // Init our request with the logic needed to call the Farcaster api
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(farcasterApiCallLogic);

        string[] memory args = new string[](1);
        args[0] = addressToString(msg.sender);
        req.setArgs(args);

        // Send req to chainlink fn
        bytes32 assignedReqID = _sendRequest(req.encodeCBOR(), uint32(347), 100000, "fun-polygon-mumbai-1"); // TODO fix gasLimit
        requestIdToMinter[uint256(assignedReqID)] = msg.sender;
    }

    function burn(uint256 id) external {
        _burn(id);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return "TODO";
    }

    /// -----------------------------------------------------------------------
    /// ERC721 FUNCTIONS
    /// -----------------------------------------------------------------------

    /**
     * @notice Callback that is invoked once the DON has resolved the request or hit an error
     *
     * @param requestId The request ID, returned by sendRequest()
     * @param response Aggregated response from the user code
     * @param err Aggregated error from the user code or from the execution pipeline
     * Either response or error parameter will be set, but never both
     */
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        // finalise the mint given a correct response
        uint256 isValidMinter = abi.decode(response, (uint256));

        if (isValidMinter == 1) _mint(requestIdToMinter[uint256(requestId)], currentId++);
    }

    function addressToString(address _pool) public pure returns (string memory _uintAsString) {
        uint256 _i = uint256(uint160(_pool));
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}
