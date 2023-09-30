// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.8.20;

import { MockERC20 } from "solbase-test/utils/mocks/MockERC20.sol";
import { MockERC721 } from "solbase-test/utils/mocks/MockERC721.sol";
import { MockERC1155 } from "solbase-test/utils/mocks/MockERC1155.sol";

// Create tokens for tests
abstract contract TokenTestConfig {
    MockERC20 public immutable mockErc20;
    MockERC721 public immutable mockErc721;
    MockERC1155 public immutable mockErc1155;

    string internal constant MOCK_ERC20_NAME = "MockERC20";
    string internal constant MOCK_ERC20_SYMBOL = "M20";
    uint8 internal constant MOCK_ERC20_DECIMALS = 18;

    string internal constant MOCK_ERC721_NAME = "MockERC721";
    string internal constant MOCK_ERC721_SYMBOL = "M721";

    /// -----------------------------------------------------------------------
    /// Setup
    /// -----------------------------------------------------------------------

    constructor() {
        mockErc20 = new MockERC20(MOCK_ERC20_NAME, MOCK_ERC20_SYMBOL, MOCK_ERC20_DECIMALS);
        mockErc721 = new MockERC721(MOCK_ERC721_NAME, MOCK_ERC721_SYMBOL);
        mockErc1155 = new MockERC1155();
    }
}
