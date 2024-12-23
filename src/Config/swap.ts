import axios from "axios";
import { debounce } from "lodash";
import { BASE_URL } from ".";

const debounceDelay = 0.5 * 1000;

export const handleQuotingFrom = debounce(
  async (
    fromToken,
    toToken,
    fromTokenAmount,
    setSolanaQuote,
    setToTokenAmount,
    setGasEstimation,
    useCache = true
  ) => {
    if (!fromToken || !toToken || !fromTokenAmount || fromTokenAmount <= 0)
      return;

    const payload = {
      chainId: fromToken.asset_platform_id,
      fromToken: fromToken.contract_address,
      fromDecimal:
        fromToken.detail_platforms[fromToken.asset_platform_id].decimal_place,
      toToken: toToken.contract_address,
      toDecimal:
        toToken.detail_platforms[toToken.asset_platform_id].decimal_place,
      amountOfFromToken: fromTokenAmount,
      useCache: useCache,
    };

    try {
      const response = await axios.post(`${BASE_URL}/swap/quote`, payload);
      const data = response.data;

      console.log("data", data);

      if (response.status === 200) {
        if (fromToken.asset_platform_id === "solana") {
          setSolanaQuote(data);

          const rawOutAmount = data?.amount.outAmount || 0;
          const convertedOutAmount =
            Number(rawOutAmount) / 10 ** Number(payload.toDecimal);

          setToTokenAmount(convertedOutAmount.toString());

          return;
        }
        setToTokenAmount(data.amount.quote.outputAmount);
        setGasEstimation(data.amount.quote.gasEstimation);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  },
  debounceDelay
);

export const handleQuotingTo = debounce(
  async (
    fromToken,
    toToken,
    toTokenAmount,
    setSolanaQuote,
    setfromTokenAmount,
    setGasEstimation,
    useCache
  ) => {
    if (!fromToken || !toToken || !toTokenAmount || toTokenAmount <= 0) return;

    const payload = {
      chainId: toToken.asset_platform_id,
      fromToken: toToken.contract_address, // Reverse logic
      fromDecimal:
        toToken.detail_platforms[toToken.asset_platform_id].decimal_place,
      toToken: fromToken.contract_address,
      toDecimal:
        fromToken.detail_platforms[fromToken.asset_platform_id].decimal_place,
      amountOfFromToken: toTokenAmount,
      useCache: useCache,
    };

    try {
      const response = await axios.post(`${BASE_URL}/swap/quote`, payload);
      const data = response.data;

      if (response.status === 200) {
        if (toToken.asset_platform_id === "solana") {
          setSolanaQuote(data);

          const rawOutAmount = data?.amount.outAmount || 0;
          const convertedOutAmount =
            Number(rawOutAmount) / 10 ** Number(payload.toDecimal);

          setfromTokenAmount(convertedOutAmount.toString());

          return;
        }
        setfromTokenAmount(data.amount.quote.outputAmount);
        setGasEstimation(data.amount.quote.gasEstimation);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  },
  debounceDelay
);

const findTokenBalance = (token, userPortfolio) => {
  if (!token || !userPortfolio.data) return 0;

  let coin;
  Object.entries(userPortfolio.data).forEach(([chain, details]: any) => {
    if (chain === token.asset_platform_id) {
      coin = details.tokens.find(
        (item) => item.symbol === token.symbol.toUpperCase()
      );
    }
  });
  return coin?.balance || 0;
};

export const handleTokenSelection = (
  type,
  token,
  setFromToken,
  setFromTokenBalance,
  setToToken,
  setToTokenBalance,
  setIsTokenModalOpen,
  userPortfolio
) => {
  if (type === "from") {
    setFromToken(token);
    const balance = findTokenBalance(token, userPortfolio);
    setFromTokenBalance(balance);
  } else if (type === "to") {
    setToToken(token);
    setToTokenBalance(findTokenBalance(token, userPortfolio));
  }
  setIsTokenModalOpen(false);
};
