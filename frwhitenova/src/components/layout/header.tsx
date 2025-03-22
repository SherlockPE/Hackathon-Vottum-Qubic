import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Swap", path: "/" },
    { name: "Tokens", path: "/tokens" },
    { name: "NFTs", path: "/nfts" },
    { name: "Pools", path: "/pools" },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img
            src="https://cryptologos.cc/logos/uniswap-uni-logo.png"
            alt="Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-text-primary">WhiteNova</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg",
                isActive(item.path)
                  ? "bg-background-lighter text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="hidden sm:inline-flex">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span>Ethereum</span>
          </div>
        </Button>

        <Button>Connect Wallet</Button>
      </div>
    </header>
  );
}
