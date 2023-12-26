import { assertNotNull } from '@subsquid/util-internal'
import { lookupArchive } from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import { Approval, OwnershipTransferred, Transfer } from './model'
import * as PepeContract from './abi/PepeContract'

export const CONTRACT_ADDRESS = '0x6982508145454Ce325dDbE47a25d4ec3d2311933'.toLowerCase()

export const processor = new EvmBatchProcessor()
  .setDataSource({
    archive: lookupArchive('eth-mainnet'),
    chain: {
      url: 'https://rpc.ankr.com/eth',
      rateLimit: 10
    }
  })
  .setBlockRange({ from: 17046105 })
  .setFinalityConfirmation(75)
  .setFields({
    transaction: {
      hash: true,
    },
    log: {
      data: true,
      topics: true,
    },
  })
  .addLog({
    address: [ CONTRACT_ADDRESS ],
    topic0: [
      PepeContract.events.Approval.topic,
      PepeContract.events.OwnershipTransferred.topic,
      PepeContract.events.Transfer.topic,
    ],
  })
  export type Fields = EvmBatchProcessorFields<typeof processor>
  export type Context = DataHandlerContext<Store, Fields>
  export type Block = BlockHeader<Fields>
  export type Log = _Log<Fields>
  export type transactionhash = _Transaction<Fields>