import { useState } from "react";
import { ArrowDown, Info, Settings } from "lucide-react";
import { formatTokenAmount, TOKENS } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TokenSelector } from "./token-selector";


export function SwapForm() {
  const [fromToken, setFromToken] = useState<typeof TOKENS[0] | null>(null);
  const [toToken, setToToken] = useState<typeof TOKENS[0] | null>(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);

    // Simple price conversion - just for demo purposes
    if (fromToken && toToken && value) {
      const fromTokenPrice = fromToken.price;
      const toTokenPrice = toToken.price;
      const convertedAmount = (parseFloat(value) * fromTokenPrice) / toTokenPrice;
      setToAmount(isNaN(convertedAmount) ? "" : String(convertedAmount));
    } else {
      setToAmount("");
    }
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToAmount(value);

    // Simple price conversion - just for demo purposes
    if (fromToken && toToken && value) {
      const fromTokenPrice = fromToken.price;
      const toTokenPrice = toToken.price;
      const convertedAmount = (parseFloat(value) * toTokenPrice) / fromTokenPrice;
      setFromAmount(isNaN(convertedAmount) ? "" : String(convertedAmount));
    } else {
      setFromAmount("");
    }
  };

  const handleSwapTokens = () => {
    const tempFromToken = fromToken;
    const tempFromAmount = fromAmount;

    setFromToken(toToken);
    setFromAmount(toAmount);

    setToToken(tempFromToken);
    setToAmount(tempFromAmount);
  };

  const handleMaxClick = () => {
    if (fromToken) {
      setFromAmount(fromToken.balance);

      // Update the "to" amount based on the new "from" amount
      if (toToken) {
        const fromTokenPrice = fromToken.price;
        const toTokenPrice = toToken.price;
        const convertedAmount = (parseFloat(fromToken.balance) * fromTokenPrice) / toTokenPrice;
        setToAmount(isNaN(convertedAmount) ? "" : String(convertedAmount));
      }
    }
  };

  // Calculate the exchange rate if both tokens are selected
  const exchangeRate = fromToken && toToken
    ? `1 ${fromToken.symbol} = ${formatTokenAmount(fromToken.price / toToken.price)} ${toToken.symbol}`
    : "";

  const isSwapDisabled = !fromToken || !toToken || !fromAmount || !toAmount;

  // Handler for opening the token selector dialog
  const handleTokenSelectorClick = () => {
    // This is intentionally empty because the TokenSelector component handles
    // the dialog opening via the DialogTrigger component
    console.log("Token selector clicked");
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-background-light shadow-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-text-primary">Swap</h2>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="rounded-full p-2 text-text-secondary hover:bg-background-lighter"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {isSettingsOpen && (
        <div className="mb-4 rounded-lg bg-background p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Slippage tolerance</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={slippage === "0.1" ? "bg-primary/20" : ""}
                onClick={() => setSlippage("0.1")}
              >
                0.1%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={slippage === "0.5" ? "bg-primary/20" : ""}
                onClick={() => setSlippage("0.5")}
              >
                0.5%
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={slippage === "1.0" ? "bg-primary/20" : ""}
                onClick={() => setSlippage("1.0")}
              >
                1.0%
              </Button>
              <div className="relative">
                <Input
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-16 h-8 text-center"
                />
                <span className="absolute right-2 top-1.5 text-text-secondary text-xs">%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Info className="h-3 w-3" />
            <span>
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </span>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-background p-4 mb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-text-secondary">You pay</span>
          {fromToken && (
            <button
              onClick={handleMaxClick}
              className="text-xs text-primary hover:underline"
            >
              Balance: {fromToken.balance}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Input
            value={fromAmount}
            onChange={handleFromAmountChange}
            placeholder="0"
            className="text-2xl font-medium border-none px-0 py-1 h-auto"
          />
          {fromToken ? (
            <TokenSelector
              selectedToken={fromToken}
              onSelect={setFromToken}
              otherSelectedToken={toToken}
            />
          ) : (
            <Button
              variant="outline"
              className="rounded-full text-sm bg-background-lighter hover:bg-background-light"
              onClick={handleTokenSelectorClick}
            >
              Select a token ▼
            </Button>
          )}
        </div>
        {fromToken && fromAmount && (
          <div className="text-xs text-text-secondary">
            ≈ ${formatTokenAmount(parseFloat(fromAmount) * fromToken.price, 2)}
          </div>
        )}
      </div>

      <div className="flex justify-center -my-3 relative z-10">
        <button
          onClick={handleSwapTokens}
          className="bg-background rounded-full p-2 border border-border hover:bg-background-lighter"
        >
          <ArrowDown className="h-4 w-4 text-text-primary" />
        </button>
      </div>

      <div className="rounded-lg bg-background p-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-text-secondary">You receive</span>
          {toToken && (
            <span className="text-xs text-text-secondary">
              Balance: {toToken.balance}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <Input
            value={toAmount}
            onChange={handleToAmountChange}
            placeholder="0"
            className="text-2xl font-medium border-none px-0 py-1 h-auto"
          />
          {toToken ? (
            <TokenSelector
              selectedToken={toToken}
              onSelect={setToToken}
              otherSelectedToken={fromToken}
            />
          ) : (
            <Button
              variant="outline"
              className="rounded-full text-sm bg-background-lighter hover:bg-background-light"
              onClick={handleTokenSelectorClick}
            >
              Select a token ▼
            </Button>
          )}
        </div>
        {toToken && toAmount && (
          <div className="text-xs text-text-secondary">
            ≈ ${formatTokenAmount(parseFloat(toAmount) * toToken.price, 2)}
          </div>
        )}
      </div>

      {exchangeRate && (
        <div className="flex items-center justify-between px-1 mb-4">
          <span className="text-sm text-text-secondary">Rate</span>
          <span className="text-sm text-text-primary">{exchangeRate}</span>
        </div>
      )}

      <Button
        className="w-full py-6 text-base font-medium"
        disabled={isSwapDisabled}
      >
        {!fromToken || !toToken
          ? "Select tokens"
          : !fromAmount || !toAmount
          ? "Enter an amount"
          : "Swap"}
      </Button>
    </div>
  );
}
