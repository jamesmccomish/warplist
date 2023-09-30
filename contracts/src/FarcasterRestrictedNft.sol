// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "../lib/solbase/src/tokens/ERC721/ERC721.sol";

import {FarcasterLikesChainlinkFunction, Functions} from "./FarcasterLikesChainlinkFunction.sol";

contract FarcasterRestrictedNft is ERC721, FarcasterLikesChainlinkFunction {
    using Functions for Functions.Request;

    uint256 public currentId;

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
        // TODO here we should call the chainlink fn to check if the user is allowed to mint (using msg.sender as an arg)

        Functions.Request memory req;
        req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, farcasterApiCallLogic);
        //req.addArgs(args);

        bytes32 assignedReqID = sendRequest(req, subscriptionId, type(uint32).max); // TODO fix gasLimit
        latestRequestId = assignedReqID;
        //return assignedReqID;

        // _mint(to, id);
    }

    // Maintain interface
    function mint(address to) external {
        // _mint(to, currentId);
        // currentId++;
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
        super.fulfillRequest(requestId, response, err);

        // TODO
        // finalise the mint given a correct response

        (address to, uint256 id) = abi.decode(response, (address, uint256));

        _mint(to, id);
    }
}
