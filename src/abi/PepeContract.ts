import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './PepeContract.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: bigint] & {owner: string, spender: string, value: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: bigint] & {from: string, to: string, value: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, bigint>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: bigint], {spender: string, amount: bigint}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, bigint>(
        abi, '0x70a08231'
    ),
    blacklist: new Func<[_address: string, _isBlacklisting: boolean], {_address: string, _isBlacklisting: boolean}, []>(
        abi, '0x404e5129'
    ),
    blacklists: new Func<[_: string], {}, boolean>(
        abi, '0x16c02129'
    ),
    burn: new Func<[value: bigint], {value: bigint}, []>(
        abi, '0x42966c68'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: bigint], {spender: string, subtractedValue: bigint}, boolean>(
        abi, '0xa457c2d7'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: bigint], {spender: string, addedValue: bigint}, boolean>(
        abi, '0x39509351'
    ),
    limited: new Func<[], {}, boolean>(
        abi, '0x860a32ec'
    ),
    maxHoldingAmount: new Func<[], {}, bigint>(
        abi, '0x89f9a1d3'
    ),
    minHoldingAmount: new Func<[], {}, bigint>(
        abi, '0x1ab99e12'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    setRule: new Func<[_limited: boolean, _uniswapV2Pair: string, _maxHoldingAmount: bigint, _minHoldingAmount: bigint], {_limited: boolean, _uniswapV2Pair: string, _maxHoldingAmount: bigint, _minHoldingAmount: bigint}, []>(
        abi, '0x3aa633aa'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[recipient: string, amount: bigint], {recipient: string, amount: bigint}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[sender: string, recipient: string, amount: bigint], {sender: string, recipient: string, amount: bigint}, boolean>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    uniswapV2Pair: new Func<[], {}, string>(
        abi, '0x49bd5a5e'
    ),
}

export class Contract extends ContractBase {

    allowance(owner: string, spender: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [owner, spender])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    blacklists(arg0: string): Promise<boolean> {
        return this.eth_call(functions.blacklists, [arg0])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    limited(): Promise<boolean> {
        return this.eth_call(functions.limited, [])
    }

    maxHoldingAmount(): Promise<bigint> {
        return this.eth_call(functions.maxHoldingAmount, [])
    }

    minHoldingAmount(): Promise<bigint> {
        return this.eth_call(functions.minHoldingAmount, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }

    uniswapV2Pair(): Promise<string> {
        return this.eth_call(functions.uniswapV2Pair, [])
    }
}
