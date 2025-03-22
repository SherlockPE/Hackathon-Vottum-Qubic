export function NFTsPage() {
  const mockNFTs = [
    {
      id: 1,
      name: "Bored Ape #7928",
      collection: "Bored Ape Yacht Club",
      image: "https://i.seadn.io/gae/5-iwCWfQUk2kXULgHcbK3BYNPBpPNaiVnh2Ux-HEAIbH86g6YlELfZwMuLo_3-L5kN92_EjPV-oRNGZK7Ba7LenLnEZuvS6W8OczPw?w=500&auto=format",
      price: 85.5,
      currency: "ETH",
    },
    {
      id: 2,
      name: "CryptoPunk #3100",
      collection: "CryptoPunks",
      image: "https://i.seadn.io/gae/QPHUQmfnKVbGoUVv9_isUbx4qgfvbdEaaMY4Bsgs9Y3V-PvgMIHYt71OzTdFnStVLAzx7Riss_vyJSL2i17YNXHoa-ek43qRAqABbw?w=500&auto=format",
      price: 120.75,
      currency: "ETH",
    },
    {
      id: 3,
      name: "Doodle #6914",
      collection: "Doodles",
      image: "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?w=500&auto=format",
      price: 5.3,
      currency: "ETH",
    },
    {
      id: 4,
      name: "Azuki #9605",
      collection: "Azuki",
      image: "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format",
      price: 12.1,
      currency: "ETH",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">NFTs</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search NFTs..."
          className="w-full p-3 rounded-lg bg-background-light border border-border text-text-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockNFTs.map((nft) => (
          <div
            key={nft.id}
            className="bg-background-light rounded-xl border border-border overflow-hidden hover:border-border-hover transition-colors"
          >
            <div className="aspect-square">
              <img
                src={nft.image}
                alt={nft.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <p className="text-sm text-text-secondary mb-1">{nft.collection}</p>
              <h3 className="font-medium text-text-primary mb-3">{nft.name}</h3>

              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Price</span>
                <span className="font-medium text-text-primary">
                  {nft.price} {nft.currency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
