import { log } from "matchstick-as"

import {

  RewardPaid as RewardPaidEvent,
  Staked as StakedEvent,
  Withdrawn as WithdrawnEvent,
} from "../generated/StakingRewardsSDAO/StakingRewardsSDAO"

import {
  RewardPaid,
  Staked,
  Withdrawn
} from "../generated/schema"

import { getFarm } from "./getFarm"
import { getDepositor } from "./getDepositor"

export function handleRewardPaid(event: RewardPaidEvent): void {
  const farm = getFarm(event.address)



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

  // Update depositor
  const depositor = getDepositor(farm.id, event.params.user)
  depositor.amount = depositor.amount.plus(event.params.amount)
  depositor.save()

  // Update farm
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


  // Update depositor
  const depositor = getDepositor(farm.id, event.params.user)
  depositor.amount = depositor.amount.minus(event.params.amount)
  depositor.save()

  // Update farm
  farm.totalStaked = farm.totalStaked.minus(event.params.amount);
  farm.save();
}
