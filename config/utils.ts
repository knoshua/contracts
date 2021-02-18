import { BigNumber } from 'ethers'
import { IGetMessengerWrapperDefaults } from './interfaces'
import {
  CHAIN_IDS,
  DEFAULT_MESSENGER_WRAPPER_GAS_LIMIT,
  ARB_CHAIN_ADDRESS,
  DEFAULT_MESSENGER_WRAPPER_SUB_MESSAGE_TYPE,
  DEFAULT_MESSENGER_WRAPPER_GAS_PRICE,
  DEFAULT_MESSENGER_WRAPPER_GAS_CALL_VALUE
} from './constants'

export const getMessengerWrapperDefaults = (
  chainId: BigNumber,
  l1BridgeAddress: string,
  l2BridgeAddress: string,
  l1MessengerAddress: string
): IGetMessengerWrapperDefaults[] => {
  let defaults: IGetMessengerWrapperDefaults[] = []

  defaults.push(
    l1BridgeAddress,
    l2BridgeAddress,
    DEFAULT_MESSENGER_WRAPPER_GAS_LIMIT,
    l1MessengerAddress
  )

  if (isChainIdArbitrum(chainId)) {
    defaults.push(
      ARB_CHAIN_ADDRESS,
      DEFAULT_MESSENGER_WRAPPER_SUB_MESSAGE_TYPE,
      DEFAULT_MESSENGER_WRAPPER_GAS_PRICE,
      DEFAULT_MESSENGER_WRAPPER_GAS_CALL_VALUE
    )
  } else if (isChainIdOptimism(chainId)) {
    // Nothing unique here. This conditional statement exists for consistency.
  } else if (isChainIdXDai(chainId)) {
    defaults.push(
      chainId.toString()
    )
  }

  return defaults
}

export const isChainIdOptimism = (chainId: BigNumber): boolean => {
  if (
    chainId.eq(CHAIN_IDS.OPTIMISM.TESTNET_1) ||
    chainId.eq(CHAIN_IDS.OPTIMISM.SYNTHETIX_DEMO) ||
    chainId.eq(CHAIN_IDS.OPTIMISM.HOP_TESTNET)
  ) {
    return true
  }

  return false
}

export const isChainIdArbitrum = (chainId: BigNumber): boolean => {
  if (
    chainId.eq(CHAIN_IDS.ARBITRUM.TESTNET_2) ||
    chainId.eq(CHAIN_IDS.ARBITRUM.TESTNET_3)
  ) {
    return true
  }

  return false
}

export const isChainIdXDai = (chainId: BigNumber): boolean => {
  if (
    chainId.eq(CHAIN_IDS.XDAI.SOKOL)
  ) {
    return true
  }

  return false
}

// Create an array of strings for each supported chain ID
export const getAllSupportedChainIds = (obj): string[] =>
  obj && typeof obj === 'object'
    ? Object.values(obj)
        .map(getAllSupportedChainIds)
        .reduce((a, b) => a.concat(b), [])
        .filter(a => typeof a === 'string')
    : [obj]
