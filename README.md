# LocalDev
```bash
export SEQUENCER_CONTRACT_ADDRESS=0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
export SEQUENCER_L1_RPC=http://localhost:9545
export USING_BVM=true

geth --datadir data init genesis.json
geth --datadir data1 init genesis.json
geth --datadir data2 init genesis.json

geth --datadir data --password password.txt --unlock 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 --nodiscover --verbosity 4 

geth --datadir data1 --rpcport 8085 --port 30306 --password password.txt --unlock 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 --nodiscover --verbosity 4

geth --datadir data2 --rpcport 8086 --port 30307 --password password.txt --unlock 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc --nodiscover --verbosity 4

# new
geth attach data/geth.ipc 
miner.start(1)
personal.unlockAccount(eth.accounts[0],"",1800000)
eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[0], value: web3.toWei(1, "ether")})


admin.nodeInfo.id
geth attach data1/geth.ipc
admin.nodeInfo.enode
net.peerCount
admin.peers

admin.addPeer("enode://87d59831808622958b953f356f2b6157595eeccc45c7c20bc79257c2358555c042e710707804946ae8d42c831ab7f4d3efa81cfa214170ae352593f09162ce69@127.0.0.1:30303?discport=0")

eth.sendTransaction({from: eth.accounts[0], to: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", value: web3.toWei(1, "ether")})

eth.sendTransaction({from: eth.accounts[0], to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8", value: web3.toWei(1, "ether")})

eth.sendTransaction({from: eth.accounts[0], to: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc", value: web3.toWei(1, "ether")})
```

