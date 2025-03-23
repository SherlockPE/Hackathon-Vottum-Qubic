import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ConnectLink from '../qubic/connect/ConnectLink'
import logo from '../../assets/logo/HM25.svg'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showNetworkMenu, setShowNetworkMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Networks for the dropdown
    const networks = [
        { id: 'mainnet', name: 'Mainnet', color: '#0288D1' },
        { id: 'testnet', name: 'Testnet', color: '#0277BD' },
        { id: 'devnet', name: 'Devnet', color: '#01579B' }
    ];

    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle dark/light mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        // Here you would implement actual theme switching logic
    };

    return (
        <div className={`fixed w-full z-10 top-0 border-b transition-all duration-300 ${
            scrolled
                ? 'border-blue-900/20 bg-blue-950 backdrop-blur-md bg-opacity-95 shadow-lg'
                : 'border-transparent bg-gradient-to-r from-blue-950 to-blue-900 bg-opacity-80 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    {/* Left side - Logo and Network selector */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center group">
                            <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                                <img src={logo} alt="msvault logo" className="h-9 w-auto relative" />
                            </div>
                        </Link>

                        {/* Network Selector */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 py-1 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 transition-colors text-sm font-medium text-white"
                                onClick={() => setShowNetworkMenu(!showNetworkMenu)}
                            >
                                <span className="flex items-center">
                                    <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: selectedNetwork.color }}></span>
                                    {selectedNetwork.name}
                                </span>
                                <svg className={`w-4 h-4 transition-transform ${showNetworkMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {showNetworkMenu && (
                                <div className="absolute mt-1 w-full bg-blue-900 rounded-xl border border-blue-800 shadow-xl z-50 py-1 animate-fadeIn">
                                    {networks.map(network => (
                                        <button
                                            key={network.id}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-800 transition-colors flex items-center ${
                                                selectedNetwork.id === network.id ? 'text-blue-400' : 'text-white'
                                            }`}
                                            onClick={() => {
                                                setSelectedNetwork(network);
                                                setShowNetworkMenu(false);
                                            }}
                                        >
                                            <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: network.color }}></span>
                                            {network.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center - Navigation and Search */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex space-x-1">
                            <NavLink
                                to="/"
                                className={({ isActive }) => {
                                    return `relative px-3 py-2 text-sm font-medium transition-colors group ${
                                        isActive
                                            ? 'text-blue-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`
                                }}
                                end
                            >
                                <span>Home</span>
                                <span className={({ isActive }) =>
                                    `absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                                        isActive ? 'scale-x-100' : ''
                                    }`
                                }></span>
                            </NavLink>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => {
                                    return `relative px-3 py-2 text-sm font-medium transition-colors group ${
                                        isActive
                                            ? 'text-blue-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`
                                }}
                            >
                                <span>Dashboard</span>
                                <span className={({ isActive }) =>
                                    `absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                                        isActive ? 'scale-x-100' : ''
                                    }`
                                }></span>
                            </NavLink>
                            <NavLink
                                to="/echo"
                                className={({ isActive }) => {
                                    return `relative px-3 py-2 text-sm font-medium transition-colors group ${
                                        isActive
                                            ? 'text-blue-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`
                                }}
                            >
                                <span>Echo</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </NavLink>
                            <NavLink
                                to="/burn"
                                className={({ isActive }) => {
                                    return `relative px-3 py-2 text-sm font-medium transition-colors group ${
                                        isActive
                                            ? 'text-blue-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`
                                }}
                            >
                                <span>Burn</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </NavLink>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="py-1.5 pl-10 pr-4 rounded-xl bg-blue-900 border border-blue-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 group-hover:w-64 transition-all duration-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right side - Theme Toggle, Notification Bell, and Connect Wallet */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-1.5 rounded-lg hover:bg-blue-900 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            )}
                        </button>

                        {/* Notification Bell */}
                        <button className="relative p-1.5 rounded-lg hover:bg-blue-900 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            <span className="animate-pulse absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-400"></span>
                        </button>

                        {/* Connect Wallet - now at the far right */}
                        <ConnectLink />
                    </div>
                </div>
            </div>

            {/* Mobile menu - shown below the navbar */}
            <div className="md:hidden border-t border-blue-900/30 bg-blue-950 bg-opacity-90 backdrop-blur-md">
                <div className="px-2 pt-2 pb-1">
                    {/* Mobile Search */}
                    <div className="relative mb-2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 pr-4 rounded-xl bg-blue-900 border border-blue-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-4 divide-x divide-blue-900/30">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `py-3 text-sm font-medium text-center transition-colors ${
                                isActive
                                    ? 'text-blue-400 border-t-2 border-blue-500'
                                    : 'text-gray-300 hover:text-white'
                            }`
                        }
                        end
                    >
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Home
                        </div>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `py-3 text-sm font-medium text-center transition-colors ${
                                isActive
                                    ? 'text-blue-400 border-t-2 border-blue-500'
                                    : 'text-gray-300 hover:text-white'
                            }`
                        }
                    >
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Dashboard
                        </div>
                    </NavLink>
                    <NavLink
                        to="/echo"
                        className={({ isActive }) =>
                            `py-3 text-sm font-medium text-center transition-colors ${
                                isActive
                                    ? 'text-blue-400 border-t-2 border-blue-500'
                                    : 'text-gray-300 hover:text-white'
                            }`
                        }
                    >
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Echo
                        </div>
                    </NavLink>
                    <NavLink
                        to="/burn"
                        className={({ isActive }) =>
                            `py-3 text-sm font-medium text-center transition-colors ${
                                isActive
                                    ? 'text-blue-400 border-t-2 border-blue-500'
                                    : 'text-gray-300 hover:text-white'
                            }`
                        }
                    >
                        <div className="flex flex-col items-center">
                            <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
                            </svg>
                            Burn
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header
