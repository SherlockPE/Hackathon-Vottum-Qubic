import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const conversionRates = {
  Blockchain: 1,
  Ethereum: 0.03,
  Bitcoin: 0.00002,
  Litecoin: 0.004
};

export function CryptoConverter() {
  const [selectedCrypto, setSelectedCrypto] = React.useState("Select Crypto");
  const [inputValue, setInputValue] = React.useState("");
  const [convertedValue, setConvertedValue] = React.useState("");

  const handleSelect = (crypto: string) => {
    setSelectedCrypto(crypto);
    if (inputValue) {
      const rate = conversionRates[crypto];
      setConvertedValue((parseFloat(inputValue) * rate).toFixed(6));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (selectedCrypto !== "Select Crypto") {
      const rate = conversionRates[selectedCrypto];
      setConvertedValue((parseFloat(value) * rate).toFixed(6));
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button variant="default" size="default" onSelect={handleSelect} />
      <Input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter value"
      />
      {convertedValue && (
        <div className="text-lg">
          Converted Value: {convertedValue} {selectedCrypto}
        </div>
      )}
    </div>
  );
}