# SubDAO subgraphs

## Requirements:

- Install the graph globally `yarn global add @graphprotocol/graph-cli`


## Adding a new farm 

Replace the contract address and the contract name

```
 graph add 0x37865d8AeC84275F9473C4E05D77D6488279B46F --contract-name StakingRewardsSDAO
```

## Deploying the graphs

All the information available here: https://thegraph.com/docs/en/deploying/subgraph-studio/

```
npx graph auth --product hosted-service CODE
npx graph deploy --product hosted-service [USER]/[GRAPH]
> npx graph deploy --product hosted-service makerdao-dux/subdao-farms
```

## Deployment urls

https://api.thegraph.com/subgraphs/name/makerdao-dux/subdao-farms/graphql?

https://thegraph.com/hosted-service/subgraph/makerdao-dux/subdao-farms