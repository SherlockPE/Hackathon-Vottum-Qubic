import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokenAmount(amount: number | string, decimals = 6): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) return "0";

  // For small numbers, show more decimals
  if (Math.abs(num) < 0.001 && num !== 0) {
    return num.toExponential(2);
  }

  // For regular numbers, use fixed decimals
  return num.toFixed(decimals);
}

export function shortenAddress(address: string): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Mock token data
export const TOKENS = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    balance: "1.234",
    price: 3500,
    priceChange: 2.5,
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    balance: "1250.50",
    price: 1,
    priceChange: 0,
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "Dai",
    logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    balance: "500.75",
    price: 1,
    priceChange: 0.01,
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    balance: "45.67",
    price: 8.25,
    priceChange: -1.2,
  },
  {
    id: "wrapped-bitcoin",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png",
    balance: "0.056",
    price: 62000,
    priceChange: 1.8,
  },
];
