import { log } from "matchstick-as"
import {
  RewardPaid as RewardPaidEvent,
  Staked as StakedEvent,
  Withdrawn as WithdrawnEvent

} from "../generated/StakingRewardsDAI/StakingRewardsDAI"
import {
  RewardPaid,
  Staked,
  Withdrawn
} from "../generated/schema"

import { getFarm } from "./getFarm"

export function handleRewardPaid(event: RewardPaidEvent): void {
  const farm = getFarm(event.address)


  // log user and reward
  log.debug("handleRewardPaid user: {}", [event.params.user.toHexString()])
  log.debug("handleRewardPaid reward: {}", [event.params.reward.toString()])
  // log hash
  log.debug("handleRewardPaid hash : {}", [event.transaction.hash.toHexString()])
  let entity = new RewardPaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.reward = event.params.reward
  entity.farm = farm.id;
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  farm.totalRewardsPaid = farm.totalRewardsPaid.plus(event.params.reward);
  farm.save();
}

export function handleStaked(event: StakedEvent): void {
  const farm = getFarm(event.address)


  let entity = new Staked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.farm = farm.id;
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  farm.totalStaked = farm.totalStaked.plus(event.params.amount);
  farm.save();
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  const farm = getFarm(event.address)

  let entity = new Withdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.farm = farm.id;
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  farm.totalStaked = farm.totalStaked.minus(event.params.amount);
  farm.save();
}
