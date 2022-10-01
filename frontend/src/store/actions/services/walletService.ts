import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const ENDPOINT = 'http://localhost:8545';
// const ENDPOINT = 'http://j7a706.p.ssafy.io:8545';
const web3 = new Web3(
	new Web3.providers.HttpProvider(`${process.env.REACT_APP_ETH_URL}`)
);
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const MASTER_ADDR = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
const CONTRACT_ADDRESS = '0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab';
const con = new web3.eth.Contract(abi as AbiItem[], CONTRACT_ADDRESS);

export const createWalletWe3 = async (walletpassword) => {
	try {
		const payload = await web3.eth.personal.newAccount(walletpassword);

		return payload;
	} catch (err) {
		return err;
	}
};

export const getBalance = async (target_addr) => {
	try {
		const payload = await con.methods
			.balanceOf(target_addr)
			.call({ from: CONTRACT_ADDRESS });
		return payload;
	} catch (err) {
		return err;
	}
};

export const chargeClean = async (target_addr, value) => {
	try {
		const payload = await con.methods
			.transfer(target_addr, value)
			.send({ from: MASTER_ADDR });
		return payload;
	} catch (err) {
		return err;
	}
};

export const unlockAccount = async (account, password) => {
	//계정 UNLOCK
	//db에서 유저와 연동된 지갑주소를 가지고와서 account에 넣어준다.
	// password = "123";

	try {
		const payload = await web3.eth.personal.unlockAccount(account, password);
		return payload;
	} catch (err) {
		return false;
	}
};
export const lockAccount = (account) => {
	//계정 LOCK
	//투표가 끝나면 해당유저의 지갑주소를 LOCK하여 트랜잭션을 날리지 못하게 변경한다.
	web3.eth.personal.lockAccount(account).then(console.log);
};



export const sendClean = async (addr1, addr2, value) => {
	//계정 LOCK
	//투표가 끝나면 해당유저의 지갑주소를 LOCK하여 트랜잭션을 날리지 못하게 변경한다.




	try {
		const payload = await con.methods
			.approve(addr2, value)
			.send({ from: addr1 });

		const payload2 = await con.methods
			.transferFrom(addr1, addr2, value)
			.send({ from: addr2 });
		return payload2
	} catch (err) {
		return false;
	}
};
