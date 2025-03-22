import { TOKENS } from "../lib/utils";

export function TokensPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tokens</h1>

      <div className="bg-background-light rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <input
            type="text"
            placeholder="Search tokens..."
            className="w-full p-2 rounded-lg bg-background border border-border text-text-primary"
          />
        </div>

        <div className="divide-y divide-border">
          <div className="grid grid-cols-6 gap-4 p-4 text-text-secondary text-sm font-medium">
            <div>#</div>
            <div className="col-span-2">Token</div>
            <div className="text-right">Price</div>
            <div className="text-right">Change (24h)</div>
            <div className="text-right">TVL</div>
          </div>

          {TOKENS.map((token, index) => (
            <div key={token.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-background-lighter">
              <div className="text-text-secondary">{index + 1}</div>
              <div className="col-span-2 flex items-center gap-3">
                <img
                  src={token.logo}
                  alt={token.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <div className="font-medium text-text-primary">{token.name}</div>
                  <div className="text-sm text-text-secondary">{token.symbol}</div>
                </div>
              </div>
              <div className="text-right font-medium text-text-primary">
                ${token.price.toLocaleString()}
              </div>
              <div className={`text-right font-medium ${token.priceChange >= 0 ? 'text-success' : 'text-error'}`}>
                {token.priceChange >= 0 ? '+' : ''}{token.priceChange}%
              </div>
              <div className="text-right text-text-primary">
                ${(token.price * parseFloat(token.balance) * 1000).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
