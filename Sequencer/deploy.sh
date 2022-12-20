sleep 5
yarn
yarn build
yarn hardhat deploy --network l1

# tail -f -n 100 $path/logs/node.log
