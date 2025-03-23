import React from "react"
import lock from "../../../assets/lock.svg"
import unlocked from "../../../assets/unlocked.svg"
import ConnectModal from "./ConnectModal"
import {useQubicConnect} from "../../../contexts/QubicConnectContext"
import {useHM25} from "../../../contexts/HM25Context"
import {formatQubicAmount} from "../util"

const ConnectLink = () => {
    const {connected, showConnectModal, toggleConnectModal} = useQubicConnect()
    const {balance, fetchBalance, walletPublicIdentity} = useHM25()

    const handleBalanceClick = async (e) => {
        e.stopPropagation()
        if (walletPublicIdentity) {
            await fetchBalance(walletPublicIdentity)
        }
    }

    return (
        <>
            <div
                className="relative flex items-center"
                onClick={() => toggleConnectModal()}
            >
                {connected ? (
                    <div className="flex flex-col">
                        {/* Connected State */}
                        <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white transition-colors">
                            {balance != null && (
                                <span className="hidden sm:inline font-medium mr-1">
                                    {formatQubicAmount(balance)} QUBIC
                                </span>
                            )}
                            <div className="flex items-center gap-2">
                                <img src={lock} alt="Lock icon" className="w-4 h-4" />
                                <span className="font-medium text-sm truncate max-w-[120px]">
                                    {walletPublicIdentity ?
                                        `${walletPublicIdentity.substring(0, 4)}...${walletPublicIdentity.substring(walletPublicIdentity.length - 4)}`
                                        : "Wallet"
                                    }
                                </span>
                            </div>
                        </button>
                    </div>
                ) : (
                    /* Not Connected State */
                    <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold transition-colors shadow-sm shadow-blue-600/20">
                        <img src={unlocked} alt="unlocked" className="w-4 h-4" />
                        <span className="text-sm">Connect Wallet</span>
                    </button>
                )}
            </div>

            <ConnectModal
                open={showConnectModal}
                onClose={() => toggleConnectModal()}
            />
        </>
    )
}

export default ConnectLink
