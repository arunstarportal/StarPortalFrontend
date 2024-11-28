export const COMPOUND = {
  mainnet: {
    address: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
    abi: [
      {
        inputs: [],
        name: "Absurd",
        type: "error",
      },
      {
        inputs: [],
        name: "AlreadyInitialized",
        type: "error",
      },
      {
        inputs: [],
        name: "BadAmount",
        type: "error",
      },
      {
        inputs: [],
        name: "BadAsset",
        type: "error",
      },
      {
        inputs: [],
        name: "BadDecimals",
        type: "error",
      },
      {
        inputs: [],
        name: "BadDiscount",
        type: "error",
      },
      {
        inputs: [],
        name: "BadMinimum",
        type: "error",
      },
      {
        inputs: [],
        name: "BadNonce",
        type: "error",
      },
      {
        inputs: [],
        name: "BadPrice",
        type: "error",
      },
      {
        inputs: [],
        name: "BadSignatory",
        type: "error",
      },
      {
        inputs: [],
        name: "BorrowCFTooLarge",
        type: "error",
      },
      {
        inputs: [],
        name: "BorrowTooSmall",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientReserves",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidInt104",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidInt256",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidUInt104",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidUInt128",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidUInt64",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidValueS",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidValueV",
        type: "error",
      },
      {
        inputs: [],
        name: "LiquidateCFTooLarge",
        type: "error",
      },
      {
        inputs: [],
        name: "NegativeNumber",
        type: "error",
      },
      {
        inputs: [],
        name: "NoSelfTransfer",
        type: "error",
      },
      {
        inputs: [],
        name: "NotCollateralized",
        type: "error",
      },
      {
        inputs: [],
        name: "NotForSale",
        type: "error",
      },
      {
        inputs: [],
        name: "NotLiquidatable",
        type: "error",
      },
      {
        inputs: [],
        name: "Paused",
        type: "error",
      },
      {
        inputs: [],
        name: "SignatureExpired",
        type: "error",
      },
      {
        inputs: [],
        name: "SupplyCapExceeded",
        type: "error",
      },
      {
        inputs: [],
        name: "TimestampTooLarge",
        type: "error",
      },
      {
        inputs: [],
        name: "TooManyAssets",
        type: "error",
      },
      {
        inputs: [],
        name: "TooMuchSlippage",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferInFailed",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferOutFailed",
        type: "error",
      },
      {
        inputs: [],
        name: "Unauthorized",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "absorber",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "collateralAbsorbed",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "usdValue",
            type: "uint256",
          },
        ],
        name: "AbsorbCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "absorber",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "basePaidOut",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "usdValue",
            type: "uint256",
          },
        ],
        name: "AbsorbDebt",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "collateralAmount",
            type: "uint256",
          },
        ],
        name: "BuyCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bool",
            name: "supplyPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "transferPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "withdrawPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "absorbPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "buyPaused",
            type: "bool",
          },
        ],
        name: "PauseAction",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Supply",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "SupplyCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "TransferCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Withdraw",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "WithdrawCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "WithdrawReserves",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "absorber",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
        ],
        name: "absorb",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "accrueAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isAllowed",
            type: "bool",
          },
        ],
        name: "allow",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isAllowed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "allowBySig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approveThis",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseAccrualScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseBorrowMin",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseIndexScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseMinForRewards",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseScale",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseToken",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseTokenPriceFeed",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "baseTrackingAccrued",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseTrackingBorrowSpeed",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseTrackingSupplySpeed",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "borrowBalanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowKink",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowPerSecondInterestRateBase",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowPerSecondInterestRateSlopeHigh",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowPerSecondInterestRateSlopeLow",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        name: "buyCollateral",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "collateralBalanceOf",
        outputs: [
          {
            internalType: "uint128",
            name: "",
            type: "uint128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "extensionDelegate",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "factorScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint8",
            name: "i",
            type: "uint8",
          },
        ],
        name: "getAssetInfo",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "offset",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "priceFeed",
                type: "address",
              },
              {
                internalType: "uint64",
                name: "scale",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "borrowCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidateCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidationFactor",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "supplyCap",
                type: "uint128",
              },
            ],
            internalType: "struct CometCore.AssetInfo",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "getAssetInfoByAddress",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "offset",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "priceFeed",
                type: "address",
              },
              {
                internalType: "uint64",
                name: "scale",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "borrowCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidateCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidationFactor",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "supplyCap",
                type: "uint128",
              },
            ],
            internalType: "struct CometCore.AssetInfo",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "utilization",
            type: "uint256",
          },
        ],
        name: "getBorrowRate",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "getCollateralReserves",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "priceFeed",
            type: "address",
          },
        ],
        name: "getPrice",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getReserves",
        outputs: [
          {
            internalType: "int256",
            name: "",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "utilization",
            type: "uint256",
          },
        ],
        name: "getSupplyRate",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getUtilization",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "governor",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
        ],
        name: "hasPermission",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "initializeStorage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "isAbsorbPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isAllowed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isBorrowCollateralized",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isBuyPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isLiquidatable",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isSupplyPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isTransferPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isWithdrawPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "liquidatorPoints",
        outputs: [
          {
            internalType: "uint32",
            name: "numAbsorbs",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "numAbsorbed",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "approxSpend",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "_reserved",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxAssets",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "numAssets",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bool",
            name: "supplyPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "transferPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "withdrawPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "absorbPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "buyPaused",
            type: "bool",
          },
        ],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "pauseGuardian",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "priceScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        name: "quoteCollateral",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "storeFrontPriceFactor",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "supplyFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyKink",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyPerSecondInterestRateBase",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyPerSecondInterestRateSlopeHigh",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyPerSecondInterestRateSlopeLow",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "supplyTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "targetReserves",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalBorrow",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalsBasic",
        outputs: [
          {
            components: [
              {
                internalType: "uint64",
                name: "baseSupplyIndex",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "baseBorrowIndex",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "trackingSupplyIndex",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "trackingBorrowIndex",
                type: "uint64",
              },
              {
                internalType: "uint104",
                name: "totalSupplyBase",
                type: "uint104",
              },
              {
                internalType: "uint104",
                name: "totalBorrowBase",
                type: "uint104",
              },
              {
                internalType: "uint40",
                name: "lastAccrualTime",
                type: "uint40",
              },
              {
                internalType: "uint8",
                name: "pauseFlags",
                type: "uint8",
              },
            ],
            internalType: "struct CometStorage.TotalsBasic",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "totalsCollateral",
        outputs: [
          {
            internalType: "uint128",
            name: "totalSupplyAsset",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "_reserved",
            type: "uint128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "trackingIndexScale",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferAsset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferAssetFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userBasic",
        outputs: [
          {
            internalType: "int104",
            name: "principal",
            type: "int104",
          },
          {
            internalType: "uint64",
            name: "baseTrackingIndex",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "baseTrackingAccrued",
            type: "uint64",
          },
          {
            internalType: "uint16",
            name: "assetsIn",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "_reserved",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userCollateral",
        outputs: [
          {
            internalType: "uint128",
            name: "balance",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "_reserved",
            type: "uint128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userNonce",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawReserves",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  sepoliaUSDC: {
    address: "0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e",
    abi: [
      {
        inputs: [],
        name: "Absurd",
        type: "error",
      },
      {
        inputs: [],
        name: "AlreadyInitialized",
        type: "error",
      },
      {
        inputs: [],
        name: "BadAmount",
        type: "error",
      },
      {
        inputs: [],
        name: "BadAsset",
        type: "error",
      },
      {
        inputs: [],
        name: "BadDecimals",
        type: "error",
      },
      {
        inputs: [],
        name: "BadDiscount",
        type: "error",
      },
      {
        inputs: [],
        name: "BadMinimum",
        type: "error",
      },
      {
        inputs: [],
        name: "BadNonce",
        type: "error",
      },
      {
        inputs: [],
        name: "BadPrice",
        type: "error",
      },
      {
        inputs: [],
        name: "BadSignatory",
        type: "error",
      },
      {
        inputs: [],
        name: "BorrowCFTooLarge",
        type: "error",
      },
      {
        inputs: [],
        name: "BorrowTooSmall",
        type: "error",
      },
      {
        inputs: [],
        name: "InsufficientReserves",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidInt104",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidInt256",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidUInt104",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidUInt128",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidUInt64",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidValueS",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidValueV",
        type: "error",
      },
      {
        inputs: [],
        name: "LiquidateCFTooLarge",
        type: "error",
      },
      {
        inputs: [],
        name: "NegativeNumber",
        type: "error",
      },
      {
        inputs: [],
        name: "NoSelfTransfer",
        type: "error",
      },
      {
        inputs: [],
        name: "NotCollateralized",
        type: "error",
      },
      {
        inputs: [],
        name: "NotForSale",
        type: "error",
      },
      {
        inputs: [],
        name: "NotLiquidatable",
        type: "error",
      },
      {
        inputs: [],
        name: "Paused",
        type: "error",
      },
      {
        inputs: [],
        name: "SignatureExpired",
        type: "error",
      },
      {
        inputs: [],
        name: "SupplyCapExceeded",
        type: "error",
      },
      {
        inputs: [],
        name: "TimestampTooLarge",
        type: "error",
      },
      {
        inputs: [],
        name: "TooManyAssets",
        type: "error",
      },
      {
        inputs: [],
        name: "TooMuchSlippage",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferInFailed",
        type: "error",
      },
      {
        inputs: [],
        name: "TransferOutFailed",
        type: "error",
      },
      {
        inputs: [],
        name: "Unauthorized",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "absorber",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "collateralAbsorbed",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "usdValue",
            type: "uint256",
          },
        ],
        name: "AbsorbCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "absorber",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "borrower",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "basePaidOut",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "usdValue",
            type: "uint256",
          },
        ],
        name: "AbsorbDebt",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "collateralAmount",
            type: "uint256",
          },
        ],
        name: "BuyCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bool",
            name: "supplyPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "transferPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "withdrawPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "absorbPaused",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "buyPaused",
            type: "bool",
          },
        ],
        name: "PauseAction",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Supply",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "SupplyCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "TransferCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Withdraw",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "WithdrawCollateral",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "WithdrawReserves",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "absorber",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "accounts",
            type: "address[]",
          },
        ],
        name: "absorb",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "accrueAccount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isAllowed",
            type: "bool",
          },
        ],
        name: "allow",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isAllowed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "allowBySig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approveThis",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseAccrualScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseBorrowMin",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseIndexScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseMinForRewards",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseScale",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseToken",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseTokenPriceFeed",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "baseTrackingAccrued",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseTrackingBorrowSpeed",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "baseTrackingSupplySpeed",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "borrowBalanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowKink",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowPerSecondInterestRateBase",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowPerSecondInterestRateSlopeHigh",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "borrowPerSecondInterestRateSlopeLow",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
        ],
        name: "buyCollateral",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "collateralBalanceOf",
        outputs: [
          {
            internalType: "uint128",
            name: "",
            type: "uint128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "extensionDelegate",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "factorScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint8",
            name: "i",
            type: "uint8",
          },
        ],
        name: "getAssetInfo",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "offset",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "priceFeed",
                type: "address",
              },
              {
                internalType: "uint64",
                name: "scale",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "borrowCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidateCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidationFactor",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "supplyCap",
                type: "uint128",
              },
            ],
            internalType: "struct CometCore.AssetInfo",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "getAssetInfoByAddress",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "offset",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "address",
                name: "priceFeed",
                type: "address",
              },
              {
                internalType: "uint64",
                name: "scale",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "borrowCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidateCollateralFactor",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "liquidationFactor",
                type: "uint64",
              },
              {
                internalType: "uint128",
                name: "supplyCap",
                type: "uint128",
              },
            ],
            internalType: "struct CometCore.AssetInfo",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "utilization",
            type: "uint256",
          },
        ],
        name: "getBorrowRate",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
        ],
        name: "getCollateralReserves",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "priceFeed",
            type: "address",
          },
        ],
        name: "getPrice",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getReserves",
        outputs: [
          {
            internalType: "int256",
            name: "",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "utilization",
            type: "uint256",
          },
        ],
        name: "getSupplyRate",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getUtilization",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "governor",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "manager",
            type: "address",
          },
        ],
        name: "hasPermission",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "initializeStorage",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "isAbsorbPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isAllowed",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isBorrowCollateralized",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isBuyPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "isLiquidatable",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isSupplyPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isTransferPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isWithdrawPaused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "liquidatorPoints",
        outputs: [
          {
            internalType: "uint32",
            name: "numAbsorbs",
            type: "uint32",
          },
          {
            internalType: "uint64",
            name: "numAbsorbed",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "approxSpend",
            type: "uint128",
          },
          {
            internalType: "uint32",
            name: "_reserved",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maxAssets",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "numAssets",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bool",
            name: "supplyPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "transferPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "withdrawPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "absorbPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "buyPaused",
            type: "bool",
          },
        ],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "pauseGuardian",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "priceScale",
        outputs: [
          {
            internalType: "uint64",
            name: "",
            type: "uint64",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        name: "quoteCollateral",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "storeFrontPriceFactor",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "supplyFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyKink",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyPerSecondInterestRateBase",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyPerSecondInterestRateSlopeHigh",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "supplyPerSecondInterestRateSlopeLow",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "supplyTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "targetReserves",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalBorrow",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalsBasic",
        outputs: [
          {
            components: [
              {
                internalType: "uint64",
                name: "baseSupplyIndex",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "baseBorrowIndex",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "trackingSupplyIndex",
                type: "uint64",
              },
              {
                internalType: "uint64",
                name: "trackingBorrowIndex",
                type: "uint64",
              },
              {
                internalType: "uint104",
                name: "totalSupplyBase",
                type: "uint104",
              },
              {
                internalType: "uint104",
                name: "totalBorrowBase",
                type: "uint104",
              },
              {
                internalType: "uint40",
                name: "lastAccrualTime",
                type: "uint40",
              },
              {
                internalType: "uint8",
                name: "pauseFlags",
                type: "uint8",
              },
            ],
            internalType: "struct CometStorage.TotalsBasic",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "totalsCollateral",
        outputs: [
          {
            internalType: "uint128",
            name: "totalSupplyAsset",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "_reserved",
            type: "uint128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "trackingIndexScale",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferAsset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferAssetFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            internalType: "address",
            name: "dst",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userBasic",
        outputs: [
          {
            internalType: "int104",
            name: "principal",
            type: "int104",
          },
          {
            internalType: "uint64",
            name: "baseTrackingIndex",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "baseTrackingAccrued",
            type: "uint64",
          },
          {
            internalType: "uint16",
            name: "assetsIn",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "_reserved",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userCollateral",
        outputs: [
          {
            internalType: "uint128",
            name: "balance",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "_reserved",
            type: "uint128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userNonce",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "src",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawReserves",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "withdrawTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};

export const AAVE = {
  sepolia: {
    address: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
    abi: [
      {
        inputs: [
          {
            internalType: "contract IPoolAddressesProvider",
            name: "provider",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "backer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "fee",
            type: "uint256",
          },
        ],
        name: "BackUnbacked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "enum DataTypes.InterestRateMode",
            name: "interestRateMode",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "borrowRate",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint16",
            name: "referralCode",
            type: "uint16",
          },
        ],
        name: "Borrow",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "initiator",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "enum DataTypes.InterestRateMode",
            name: "interestRateMode",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "premium",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint16",
            name: "referralCode",
            type: "uint16",
          },
        ],
        name: "FlashLoan",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "totalDebt",
            type: "uint256",
          },
        ],
        name: "IsolationModeTotalDebtUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "collateralAsset",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "debtAsset",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "debtToCover",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "liquidatedCollateralAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "address",
            name: "liquidator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "receiveAToken",
            type: "bool",
          },
        ],
        name: "LiquidationCall",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint16",
            name: "referralCode",
            type: "uint16",
          },
        ],
        name: "MintUnbacked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amountMinted",
            type: "uint256",
          },
        ],
        name: "MintedToTreasury",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "RebalanceStableBorrowRate",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "repayer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "useATokens",
            type: "bool",
          },
        ],
        name: "Repay",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "liquidityRate",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "stableBorrowRate",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "variableBorrowRate",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "liquidityIndex",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "variableBorrowIndex",
            type: "uint256",
          },
        ],
        name: "ReserveDataUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "ReserveUsedAsCollateralDisabled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "ReserveUsedAsCollateralEnabled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint16",
            name: "referralCode",
            type: "uint16",
          },
        ],
        name: "Supply",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "enum DataTypes.InterestRateMode",
            name: "interestRateMode",
            type: "uint8",
          },
        ],
        name: "SwapBorrowRateMode",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint8",
            name: "categoryId",
            type: "uint8",
          },
        ],
        name: "UserEModeSet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "reserve",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Withdraw",
        type: "event",
      },
      {
        inputs: [],
        name: "ADDRESSES_PROVIDER",
        outputs: [
          {
            internalType: "contract IPoolAddressesProvider",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "BRIDGE_PROTOCOL_FEE",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "FLASHLOAN_PREMIUM_TOTAL",
        outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "FLASHLOAN_PREMIUM_TO_PROTOCOL",
        outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_NUMBER_RESERVES",
        outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_STABLE_RATE_BORROW_SIZE_PERCENT",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "POOL_REVISION",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "fee", type: "uint256" },
        ],
        name: "backUnbacked",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "interestRateMode",
            type: "uint256",
          },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
          { internalType: "address", name: "onBehalfOf", type: "address" },
        ],
        name: "borrow",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint8", name: "id", type: "uint8" },
          {
            components: [
              { internalType: "uint16", name: "ltv", type: "uint16" },
              {
                internalType: "uint16",
                name: "liquidationThreshold",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "liquidationBonus",
                type: "uint16",
              },
              { internalType: "address", name: "priceSource", type: "address" },
              { internalType: "string", name: "label", type: "string" },
            ],
            internalType: "struct DataTypes.EModeCategory",
            name: "category",
            type: "tuple",
          },
        ],
        name: "configureEModeCategory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "dropReserve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "balanceFromBefore",
            type: "uint256",
          },
          { internalType: "uint256", name: "balanceToBefore", type: "uint256" },
        ],
        name: "finalizeTransfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "receiverAddress", type: "address" },
          { internalType: "address[]", name: "assets", type: "address[]" },
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
          {
            internalType: "uint256[]",
            name: "interestRateModes",
            type: "uint256[]",
          },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "bytes", name: "params", type: "bytes" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "flashLoan",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "receiverAddress", type: "address" },
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes", name: "params", type: "bytes" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "flashLoanSimple",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getConfiguration",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "data", type: "uint256" },
            ],
            internalType: "struct DataTypes.ReserveConfigurationMap",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint8", name: "id", type: "uint8" }],
        name: "getEModeCategoryData",
        outputs: [
          {
            components: [
              { internalType: "uint16", name: "ltv", type: "uint16" },
              {
                internalType: "uint16",
                name: "liquidationThreshold",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "liquidationBonus",
                type: "uint16",
              },
              { internalType: "address", name: "priceSource", type: "address" },
              { internalType: "string", name: "label", type: "string" },
            ],
            internalType: "struct DataTypes.EModeCategory",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint16", name: "id", type: "uint16" }],
        name: "getReserveAddressById",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveData",
        outputs: [
          {
            components: [
              {
                components: [
                  { internalType: "uint256", name: "data", type: "uint256" },
                ],
                internalType: "struct DataTypes.ReserveConfigurationMap",
                name: "configuration",
                type: "tuple",
              },
              {
                internalType: "uint128",
                name: "liquidityIndex",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "currentLiquidityRate",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "variableBorrowIndex",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "currentVariableBorrowRate",
                type: "uint128",
              },
              {
                internalType: "uint128",
                name: "currentStableBorrowRate",
                type: "uint128",
              },
              {
                internalType: "uint40",
                name: "lastUpdateTimestamp",
                type: "uint40",
              },
              { internalType: "uint16", name: "id", type: "uint16" },
              {
                internalType: "address",
                name: "aTokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "stableDebtTokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "variableDebtTokenAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "interestRateStrategyAddress",
                type: "address",
              },
              {
                internalType: "uint128",
                name: "accruedToTreasury",
                type: "uint128",
              },
              { internalType: "uint128", name: "unbacked", type: "uint128" },
              {
                internalType: "uint128",
                name: "isolationModeTotalDebt",
                type: "uint128",
              },
            ],
            internalType: "struct DataTypes.ReserveData",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveNormalizedIncome",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getReserveNormalizedVariableDebt",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getReservesList",
        outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getUserAccountData",
        outputs: [
          {
            internalType: "uint256",
            name: "totalCollateralBase",
            type: "uint256",
          },
          { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
          {
            internalType: "uint256",
            name: "availableBorrowsBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentLiquidationThreshold",
            type: "uint256",
          },
          { internalType: "uint256", name: "ltv", type: "uint256" },
          { internalType: "uint256", name: "healthFactor", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getUserConfiguration",
        outputs: [
          {
            components: [
              { internalType: "uint256", name: "data", type: "uint256" },
            ],
            internalType: "struct DataTypes.UserConfigurationMap",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "getUserEMode",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "address", name: "aTokenAddress", type: "address" },
          {
            internalType: "address",
            name: "stableDebtAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "variableDebtAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "interestRateStrategyAddress",
            type: "address",
          },
        ],
        name: "initReserve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IPoolAddressesProvider",
            name: "provider",
            type: "address",
          },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "collateralAsset", type: "address" },
          { internalType: "address", name: "debtAsset", type: "address" },
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "debtToCover", type: "uint256" },
          { internalType: "bool", name: "receiveAToken", type: "bool" },
        ],
        name: "liquidationCall",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address[]", name: "assets", type: "address[]" },
        ],
        name: "mintToTreasury",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "mintUnbacked",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "address", name: "user", type: "address" },
        ],
        name: "rebalanceStableBorrowRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "interestRateMode",
            type: "uint256",
          },
          { internalType: "address", name: "onBehalfOf", type: "address" },
        ],
        name: "repay",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "interestRateMode",
            type: "uint256",
          },
        ],
        name: "repayWithATokens",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "interestRateMode",
            type: "uint256",
          },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint8", name: "permitV", type: "uint8" },
          { internalType: "bytes32", name: "permitR", type: "bytes32" },
          { internalType: "bytes32", name: "permitS", type: "bytes32" },
        ],
        name: "repayWithPermit",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "rescueTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "resetIsolationModeTotalDebt",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          {
            components: [
              { internalType: "uint256", name: "data", type: "uint256" },
            ],
            internalType: "struct DataTypes.ReserveConfigurationMap",
            name: "configuration",
            type: "tuple",
          },
        ],
        name: "setConfiguration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          {
            internalType: "address",
            name: "rateStrategyAddress",
            type: "address",
          },
        ],
        name: "setReserveInterestRateStrategyAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint8", name: "categoryId", type: "uint8" }],
        name: "setUserEMode",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "bool", name: "useAsCollateral", type: "bool" },
        ],
        name: "setUserUseReserveAsCollateral",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "uint8", name: "permitV", type: "uint8" },
          { internalType: "bytes32", name: "permitR", type: "bytes32" },
          { internalType: "bytes32", name: "permitS", type: "bytes32" },
        ],
        name: "supplyWithPermit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          {
            internalType: "uint256",
            name: "interestRateMode",
            type: "uint256",
          },
        ],
        name: "swapBorrowRateMode",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "protocolFee", type: "uint256" },
        ],
        name: "updateBridgeProtocolFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint128",
            name: "flashLoanPremiumTotal",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "flashLoanPremiumToProtocol",
            type: "uint128",
          },
        ],
        name: "updateFlashloanPremiums",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
        ],
        name: "withdraw",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    etherDepAbi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "pool",
            type: "address",
          },
          {
            internalType: "address",
            name: "onBehalfOf",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "referralCode",
            type: "uint16",
          },
        ],
        name: "depositETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
  },
};

export const UNISWAP = {
  sepolia: {
    address: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
    abi: [
      {
        inputs: [
          {
            components: [
              { internalType: "address", name: "permit2", type: "address" },
              { internalType: "address", name: "weth9", type: "address" },
              { internalType: "address", name: "seaportV1_5", type: "address" },
              { internalType: "address", name: "seaportV1_4", type: "address" },
              {
                internalType: "address",
                name: "openseaConduit",
                type: "address",
              },
              { internalType: "address", name: "nftxZap", type: "address" },
              { internalType: "address", name: "x2y2", type: "address" },
              { internalType: "address", name: "foundation", type: "address" },
              { internalType: "address", name: "sudoswap", type: "address" },
              {
                internalType: "address",
                name: "elementMarket",
                type: "address",
              },
              { internalType: "address", name: "nft20Zap", type: "address" },
              { internalType: "address", name: "cryptopunks", type: "address" },
              { internalType: "address", name: "looksRareV2", type: "address" },
              {
                internalType: "address",
                name: "routerRewardsDistributor",
                type: "address",
              },
              {
                internalType: "address",
                name: "looksRareRewardsDistributor",
                type: "address",
              },
              {
                internalType: "address",
                name: "looksRareToken",
                type: "address",
              },
              { internalType: "address", name: "v2Factory", type: "address" },
              { internalType: "address", name: "v3Factory", type: "address" },
              {
                internalType: "bytes32",
                name: "pairInitCodeHash",
                type: "bytes32",
              },
              {
                internalType: "bytes32",
                name: "poolInitCodeHash",
                type: "bytes32",
              },
            ],
            internalType: "struct RouterParameters",
            name: "params",
            type: "tuple",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      { inputs: [], name: "BalanceTooLow", type: "error" },
      { inputs: [], name: "BuyPunkFailed", type: "error" },
      { inputs: [], name: "ContractLocked", type: "error" },
      { inputs: [], name: "ETHNotAccepted", type: "error" },
      {
        inputs: [
          { internalType: "uint256", name: "commandIndex", type: "uint256" },
          { internalType: "bytes", name: "message", type: "bytes" },
        ],
        name: "ExecutionFailed",
        type: "error",
      },
      { inputs: [], name: "FromAddressIsNotOwner", type: "error" },
      { inputs: [], name: "InsufficientETH", type: "error" },
      { inputs: [], name: "InsufficientToken", type: "error" },
      { inputs: [], name: "InvalidBips", type: "error" },
      {
        inputs: [
          { internalType: "uint256", name: "commandType", type: "uint256" },
        ],
        name: "InvalidCommandType",
        type: "error",
      },
      { inputs: [], name: "InvalidOwnerERC1155", type: "error" },
      { inputs: [], name: "InvalidOwnerERC721", type: "error" },
      { inputs: [], name: "InvalidPath", type: "error" },
      { inputs: [], name: "InvalidReserves", type: "error" },
      { inputs: [], name: "InvalidSpender", type: "error" },
      { inputs: [], name: "LengthMismatch", type: "error" },
      { inputs: [], name: "SliceOutOfBounds", type: "error" },
      { inputs: [], name: "TransactionDeadlinePassed", type: "error" },
      { inputs: [], name: "UnableToClaim", type: "error" },
      { inputs: [], name: "UnsafeCast", type: "error" },
      { inputs: [], name: "V2InvalidPath", type: "error" },
      { inputs: [], name: "V2TooLittleReceived", type: "error" },
      { inputs: [], name: "V2TooMuchRequested", type: "error" },
      { inputs: [], name: "V3InvalidAmountOut", type: "error" },
      { inputs: [], name: "V3InvalidCaller", type: "error" },
      { inputs: [], name: "V3InvalidSwap", type: "error" },
      { inputs: [], name: "V3TooLittleReceived", type: "error" },
      { inputs: [], name: "V3TooMuchRequested", type: "error" },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "RewardsSent",
        type: "event",
      },
      {
        inputs: [
          { internalType: "bytes", name: "looksRareClaim", type: "bytes" },
        ],
        name: "collectRewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes", name: "commands", type: "bytes" },
          { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes", name: "commands", type: "bytes" },
          { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256[]", name: "", type: "uint256[]" },
          { internalType: "uint256[]", name: "", type: "uint256[]" },
          { internalType: "bytes", name: "", type: "bytes" },
        ],
        name: "onERC1155BatchReceived",
        outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "bytes", name: "", type: "bytes" },
        ],
        name: "onERC1155Received",
        outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          { internalType: "address", name: "", type: "address" },
          { internalType: "uint256", name: "", type: "uint256" },
          { internalType: "bytes", name: "", type: "bytes" },
        ],
        name: "onERC721Received",
        outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "int256", name: "amount0Delta", type: "int256" },
          { internalType: "int256", name: "amount1Delta", type: "int256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "uniswapV3SwapCallback",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ],
  },
};

export const LIDO = {
  sepolia: {
    address: "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af",
    abi: [
      {
        constant: false,
        inputs: [],
        name: "resume",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "stop",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "hasInitialized",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "STAKING_CONTROL_ROLE",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "_ethAmount", type: "uint256" }],
        name: "getSharesByPooledEth",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "isStakingPaused",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_sender", type: "address" },
          { name: "_recipient", type: "address" },
          { name: "_amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "_script", type: "bytes" }],
        name: "getEVMScriptExecutor",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_maxStakeLimit", type: "uint256" },
          { name: "_stakeLimitIncreasePerBlock", type: "uint256" },
        ],
        name: "setStakingLimit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "RESUME_ROLE",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_lidoLocator", type: "address" },
          { name: "_eip712StETH", type: "address" },
        ],
        name: "finalizeUpgrade_v2",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getRecoveryVault",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getTotalPooledEther",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "_newDepositedValidators", type: "uint256" }],
        name: "unsafeChangeDepositedValidators",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "PAUSE_ROLE",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getTreasury",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "isStopped",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getBufferedEther",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_lidoLocator", type: "address" },
          { name: "_eip712StETH", type: "address" },
        ],
        name: "initialize",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "receiveELRewards",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getWithdrawalCredentials",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getCurrentStakeLimit",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getStakeLimitFullInfo",
        outputs: [
          { name: "isStakingPaused", type: "bool" },
          { name: "isStakingLimitSet", type: "bool" },
          { name: "currentStakeLimit", type: "uint256" },
          { name: "maxStakeLimit", type: "uint256" },
          { name: "maxStakeLimitGrowthBlocks", type: "uint256" },
          { name: "prevStakeLimit", type: "uint256" },
          { name: "prevStakeBlockNumber", type: "uint256" },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_sender", type: "address" },
          { name: "_recipient", type: "address" },
          { name: "_sharesAmount", type: "uint256" },
        ],
        name: "transferSharesFrom",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "_account", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "resumeStaking",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getFeeDistribution",
        outputs: [
          { name: "treasuryFeeBasisPoints", type: "uint16" },
          { name: "insuranceFeeBasisPoints", type: "uint16" },
          { name: "operatorsFeeBasisPoints", type: "uint16" },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "receiveWithdrawals",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "_sharesAmount", type: "uint256" }],
        name: "getPooledEthByShares",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "token", type: "address" }],
        name: "allowRecoverability",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "owner", type: "address" }],
        name: "nonces",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "appId",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getOracle",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "eip712Domain",
        outputs: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getContractVersion",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getInitializationBlock",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_recipient", type: "address" },
          { name: "_sharesAmount", type: "uint256" },
        ],
        name: "transferShares",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "pure",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getEIP712StETH",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "", type: "address" }],
        name: "transferToVault",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { name: "_sender", type: "address" },
          { name: "_role", type: "bytes32" },
          { name: "_params", type: "uint256[]" },
        ],
        name: "canPerform",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ name: "_referral", type: "address" }],
        name: "submit",
        outputs: [{ name: "", type: "uint256" }],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getEVMScriptRegistry",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_recipient", type: "address" },
          { name: "_amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_maxDepositsCount", type: "uint256" },
          { name: "_stakingModuleId", type: "uint256" },
          { name: "_depositCalldata", type: "bytes" },
        ],
        name: "deposit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "UNSAFE_CHANGE_DEPOSITED_VALIDATORS_ROLE",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getBeaconStat",
        outputs: [
          { name: "depositedValidators", type: "uint256" },
          { name: "beaconValidators", type: "uint256" },
          { name: "beaconBalance", type: "uint256" },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "removeStakingLimit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_reportTimestamp", type: "uint256" },
          { name: "_timeElapsed", type: "uint256" },
          { name: "_clValidators", type: "uint256" },
          { name: "_clBalance", type: "uint256" },
          { name: "_withdrawalVaultBalance", type: "uint256" },
          { name: "_elRewardsVaultBalance", type: "uint256" },
          { name: "_sharesRequestedToBurn", type: "uint256" },
          { name: "_withdrawalFinalizationBatches", type: "uint256[]" },
          { name: "_simulatedShareRate", type: "uint256" },
        ],
        name: "handleOracleReport",
        outputs: [{ name: "postRebaseAmounts", type: "uint256[4]" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getFee",
        outputs: [{ name: "totalFee", type: "uint16" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "kernel",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getTotalShares",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" },
          { name: "_deadline", type: "uint256" },
          { name: "_v", type: "uint8" },
          { name: "_r", type: "bytes32" },
          { name: "_s", type: "bytes32" },
        ],
        name: "permit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "isPetrified",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getLidoLocator",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "canDeposit",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "STAKING_PAUSE_ROLE",
        outputs: [{ name: "", type: "bytes32" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getDepositableEther",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ name: "_account", type: "address" }],
        name: "sharesOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [],
        name: "pauseStaking",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getTotalELRewardsCollected",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      { payable: true, stateMutability: "payable", type: "fallback" },
      { anonymous: false, inputs: [], name: "StakingPaused", type: "event" },
      { anonymous: false, inputs: [], name: "StakingResumed", type: "event" },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: "maxStakeLimit", type: "uint256" },
          {
            indexed: false,
            name: "stakeLimitIncreasePerBlock",
            type: "uint256",
          },
        ],
        name: "StakingLimitSet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [],
        name: "StakingLimitRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "reportTimestamp", type: "uint256" },
          { indexed: false, name: "preCLValidators", type: "uint256" },
          { indexed: false, name: "postCLValidators", type: "uint256" },
        ],
        name: "CLValidatorsUpdated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, name: "depositedValidators", type: "uint256" },
        ],
        name: "DepositedValidatorsChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "reportTimestamp", type: "uint256" },
          { indexed: false, name: "preCLBalance", type: "uint256" },
          { indexed: false, name: "postCLBalance", type: "uint256" },
          { indexed: false, name: "withdrawalsWithdrawn", type: "uint256" },
          {
            indexed: false,
            name: "executionLayerRewardsWithdrawn",
            type: "uint256",
          },
          { indexed: false, name: "postBufferedEther", type: "uint256" },
        ],
        name: "ETHDistributed",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "reportTimestamp", type: "uint256" },
          { indexed: false, name: "timeElapsed", type: "uint256" },
          { indexed: false, name: "preTotalShares", type: "uint256" },
          { indexed: false, name: "preTotalEther", type: "uint256" },
          { indexed: false, name: "postTotalShares", type: "uint256" },
          { indexed: false, name: "postTotalEther", type: "uint256" },
          { indexed: false, name: "sharesMintedAsFees", type: "uint256" },
        ],
        name: "TokenRebased",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, name: "lidoLocator", type: "address" }],
        name: "LidoLocatorSet",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, name: "amount", type: "uint256" }],
        name: "ELRewardsReceived",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, name: "amount", type: "uint256" }],
        name: "WithdrawalsReceived",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "sender", type: "address" },
          { indexed: false, name: "amount", type: "uint256" },
          { indexed: false, name: "referral", type: "address" },
        ],
        name: "Submitted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, name: "amount", type: "uint256" }],
        name: "Unbuffered",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "executor", type: "address" },
          { indexed: false, name: "script", type: "bytes" },
          { indexed: false, name: "input", type: "bytes" },
          { indexed: false, name: "returnData", type: "bytes" },
        ],
        name: "ScriptResult",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "vault", type: "address" },
          { indexed: true, name: "token", type: "address" },
          { indexed: false, name: "amount", type: "uint256" },
        ],
        name: "RecoverToVault",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, name: "eip712StETH", type: "address" }],
        name: "EIP712StETHInitialized",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "sharesValue", type: "uint256" },
        ],
        name: "TransferShares",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "account", type: "address" },
          { indexed: false, name: "preRebaseTokenAmount", type: "uint256" },
          { indexed: false, name: "postRebaseTokenAmount", type: "uint256" },
          { indexed: false, name: "sharesAmount", type: "uint256" },
        ],
        name: "SharesBurnt",
        type: "event",
      },
      { anonymous: false, inputs: [], name: "Stopped", type: "event" },
      { anonymous: false, inputs: [], name: "Resumed", type: "event" },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "owner", type: "address" },
          { indexed: true, name: "spender", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, name: "version", type: "uint256" }],
        name: "ContractVersionSet",
        type: "event",
      },
    ],
  },
};

export const ROCKETPOOL = {
  holesky: {
    address: "0x320f3aAB9405e38b955178BBe75c477dECBA0C27",
    abi: [
      {
        inputs: [
          {
            internalType: "contract RocketStorageInterface",
            name: "_rocketStorageAddress",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "minipool",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        name: "DepositAssigned",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        name: "DepositReceived",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        name: "DepositRecycled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        name: "ExcessWithdrawn",
        type: "event",
      },
      {
        inputs: [],
        name: "assignDeposits",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "getBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getExcessBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getMaximumDepositAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getNodeBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getUserBalance",
        outputs: [{ internalType: "int256", name: "", type: "int256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "maybeAssignDeposits",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "nodeCreditWithdrawal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_totalAmount", type: "uint256" },
        ],
        name: "nodeDeposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "receiveVaultWithdrawalETH",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "recycleDissolvedDeposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "recycleExcessCollateral",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "recycleLiquidatedStake",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "withdrawExcessBalance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};

export const AssetsAddress = {
  USDC_Sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  USDC_AAVE: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
  USDC_UNI: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
  WETH_UNI: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  WETH_COMP: "0x2D5ee574e710219a521449679A4A7f2B43f046ad",
  WBTC: "0x29f2D40B0605204364af54EC677bD022dA425d03",
};

export const ERC20_ABI = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
