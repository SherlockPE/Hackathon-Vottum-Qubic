import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { TOKENS } from "../../lib/utils";

interface TokenSelectorProps {
  selectedToken?: typeof TOKENS[0] | null;
  onSelect: (token: typeof TOKENS[0]) => void;
  otherSelectedToken?: typeof TOKENS[0] | null;
}

export function TokenSelector({
  selectedToken,
  onSelect,
  otherSelectedToken
}: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = TOKENS.filter((token) => {
    // Filter out the other selected token to prevent selecting the same token twice
    if (otherSelectedToken && token.symbol === otherSelectedToken.symbol) {
      return false;
    }

    // Filter based on search query
    const query = searchQuery.toLowerCase();
    return (
      token.name.toLowerCase().includes(query) ||
      token.symbol.toLowerCase().includes(query)
    );
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-background-lighter px-3 py-1 text-sm h-10"
        >
          {selectedToken ? (
            <>
              <img
                src={selectedToken.logo}
                alt={selectedToken.name}
                className="h-5 w-5 rounded-full"
              />
              <span className="font-medium">{selectedToken.symbol}</span>
            </>
          ) : (
            <span className="text-text-primary">Select a token</span>
          )}
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="mb-4">Select a token</DialogTitle>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-text-secondary" />
          <Input
            placeholder="Search by name or symbol"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-2 max-h-72 overflow-y-auto pr-1">
          {filteredTokens.length > 0 ? (
            <div className="grid gap-2">
              {filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-background-lighter"
                  onClick={() => {
                    onSelect(token);
                    setSearchQuery("");
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={token.logo}
                      alt={token.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="text-left">
                      <p className="font-medium text-text-primary">{token.symbol}</p>
                      <p className="text-sm text-text-secondary">{token.name}</p>
                    </div>
                  </div>
                  {token.balance && (
                    <span className="text-sm font-medium text-text-primary">
                      {token.balance}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-text-secondary">No tokens found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
