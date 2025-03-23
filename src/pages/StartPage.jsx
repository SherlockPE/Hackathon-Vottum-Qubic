import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQubicConnect } from '../contexts/QubicConnectContext';
import { useHM25 } from '../contexts/HM25Context';
import videoBackground from '../assets/fondo.mp4'; // Asegúrate de que la ruta sea correcta

function StartPage() {
    const navigate = useNavigate();
    const { connected, toggleConnectModal } = useQubicConnect();
    const { balance } = useHM25();

    const [amountFrom, setAmountFrom] = useState('');
    const [amountTo, setAmountTo] = useState('');
    const [currencyFrom, setCurrencyFrom] = useState('ETH');
    const [currencyTo, setCurrencyTo] = useState('BTC');

    const currencies = ['ETH', 'BTC', 'USDT', 'BNB'];

    const handleConvert = () => {
        const conversionRates = {
            ETH: { BTC: 0.05, USDT: 2000, BNB: 5 },
            BTC: { ETH: 20, USDT: 40000, BNB: 100 },
            USDT: { ETH: 0.0005, BTC: 0.000025, BNB: 0.00025 },
            BNB: { ETH: 0.2, BTC: 0.01, USDT: 400 }
        };
        const rate = conversionRates[currencyFrom][currencyTo] || 1;
        setAmountTo(amountFrom * rate);
    };

    if (!connected) {
        return (
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover filter blur-lg"
                >
                    <source src={videoBackground} type="video/mp4" />
                </video>
                <div className="relative z-10 flex flex-col items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-opacity-50 rounded-lg">
                    <h2 className="text-3xl text-white mb-6 font-bold">WHITE NOVA</h2>
                    <p className="text-gray-200 mb-6 text-center">
                        You are not connected to a wallet. Please connect to proceed.
                    </p>
                    <button
                        className="bg-purple-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white font-medium shadow-lg"
                        onClick={toggleConnectModal}
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center p-4 max-w-md mx-auto">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover filter blur-lg"
            >
                <source src={videoBackground} type="video/mp4" />
            </video>
            <div className="relative z-10 flex flex-col items-center p-4 bg-gradient-to-r from-green-400 to-blue-500 bg-opacity-50 rounded-lg">
                <h2 className="text-3xl text-white mb-8 text-center font-bold">
                    Intercambia en cualquier momento<br />
                    y en cualquier lugar.
                </h2>

                {/* Cuadro de conversión */}
                <div className="w-full bg-gray-800 bg-opacity-75 rounded-xl p-4 mb-4 shadow-lg">
                    <div className="flex flex-col gap-3">
                        <span className="text-gray-400 text-sm">Cantidad a convertir</span>
                        <input
                            type="number"
                            value={amountFrom}
                            onChange={(e) => setAmountFrom(e.target.value)}
                            className="w-full bg-gray-900 px-4 py-3 rounded-lg text-white"
                            placeholder="Introduce la cantidad"
                        />
                        <select
                            value={currencyFrom}
                            onChange={(e) => setCurrencyFrom(e.target.value)}
                            className="w-full bg-gray-900 px-4 py-3 rounded-lg text-white"
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium shadow-md"
                            onClick={handleConvert}
                        >
                            Convertir
                        </button>
                        <div className="flex items-center justify-between bg-gray-900 px-4 py-3 rounded-lg">
                            <span className="text-white">Convertido</span>
                            <span className="text-gray-400">{amountTo} {currencyTo}</span>
                        </div>
                        <select
                            value={currencyTo}
                            onChange={(e) => setCurrencyTo(e.target.value)}
                            className="w-full bg-gray-900 px-4 py-3 rounded-lg text-white"
                        >
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Balance */}
                <div className="mt-8 text-gray-200 text-sm">
                    Balance disponible: {balance ?? 0} US$
                </div>
            </div>
        </div>
    );
}

export default StartPage;