export function PoolsPage() {
  const mockPools = [
    {
      id: 1,
      token0: {
        symbol: "ETH",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      },
      token1: {
        symbol: "USDC",
        logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
      fee: "0.3%",
      tvl: "$245.8M",
      volume24h: "$28.4M",
      apy: "5.2%",
    },
    {
      id: 2,
      token0: {
        symbol: "ETH",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      },
      token1: {
        symbol: "WBTC",
        logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png",
      },
      fee: "0.3%",
      tvl: "$189.2M",
      volume24h: "$15.7M",
      apy: "4.8%",
    },
    {
      id: 3,
      token0: {
        symbol: "UNI",
        logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
      },
      token1: {
        symbol: "ETH",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      },
      fee: "0.3%",
      tvl: "$67.5M",
      volume24h: "$5.2M",
      apy: "7.1%",
    },
    {
      id: 4,
      token0: {
        symbol: "DAI",
        logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
      },
      token1: {
        symbol: "USDC",
        logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
      fee: "0.05%",
      tvl: "$124.3M",
      volume24h: "$12.8M",
      apy: "2.3%",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Pools</h1>
        <button className="bg-primary hover:bg-primary-hover text-white font-medium px-4 py-2 rounded-lg">
          + New Position
        </button>
      </div>

      <div className="bg-background-light rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search pools..."
            className="p-2 rounded-lg bg-background border border-border text-text-primary"
          />
          <select className="p-2 rounded-lg bg-background border border-border text-text-primary">
            <option>All Fee Tiers</option>
            <option>0.01%</option>
            <option>0.05%</option>
            <option>0.3%</option>
            <option>1%</option>
          </select>
        </div>

        <div className="divide-y divide-border">
          <div className="grid grid-cols-7 gap-4 p-4 text-text-secondary text-sm font-medium">
            <div className="col-span-2">Pool</div>
            <div className="text-right">Fee</div>
            <div className="text-right">TVL</div>
            <div className="text-right">Volume (24h)</div>
            <div className="text-right">APY</div>
            <div></div>
          </div>

          {mockPools.map((pool) => (
            <div key={pool.id} className="grid grid-cols-7 gap-4 p-4 hover:bg-background-lighter">
              <div className="col-span-2 flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <img
                    src={pool.token0.logo}
                    alt={pool.token0.symbol}
                    className="h-8 w-8 rounded-full border-2 border-background-light"
                  />
                  <img
                    src={pool.token1.logo}
                    alt={pool.token1.symbol}
                    className="h-8 w-8 rounded-full border-2 border-background-light"
                  />
                </div>
                <span className="font-medium text-text-primary">
                  {pool.token0.symbol}/{pool.token1.symbol}
                </span>
              </div>
              <div className="text-right font-medium text-text-primary">
                {pool.fee}
              </div>
              <div className="text-right font-medium text-text-primary">
                {pool.tvl}
              </div>
              <div className="text-right font-medium text-text-primary">
                {pool.volume24h}
              </div>
              <div className="text-right font-medium text-success">
                {pool.apy}
              </div>
              <div className="flex justify-end">
                <button className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded text-sm">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
