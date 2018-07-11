/**
 * blocktron-node test spec file
 * Written by: Sandeep Vattapparambil
 * Email: sandeepv68@gmail.com
 */

/**
 * Import extended blocktron-lib
 */
import blocktron from './src/lib/blocktron';

/**
 * Use a valid chain from actual node data
 */
let blockchain = {
    "chain": [{
            "index": 1,
            "timeStamp": 1531318682438,
            "transactions": [],
            "nonce": 1,
            "hash": "0",
            "previousHash": "0"
        },
        {
            "index": 2,
            "timeStamp": 1531318752644,
            "transactions": [{
                "transactionId": "5a67a730851511e8b0278be2d92e51cd",
                "amount": 50020,
                "sender": "SANDEEP3J23NJ23N",
                "receiver": "NEHANJK23NRJ2K3"
            }],
            "nonce": 43174,
            "hash": "0000c3552dd6cdd3e5c9a3ba801e035b71bcc9df6365876cc3790784847e5ae9",
            "previousHash": "0"
        },
        {
            "index": 3,
            "timeStamp": 1531318761127,
            "transactions": [{
                "transactionId": "6267d720851511e8b0278be2d92e51cd",
                "amount": 12.5,
                "sender": "00BLOCKTRON",
                "receiver": "384d0820851511e8b0278be2d92e51cd"
            }],
            "nonce": 95161,
            "hash": "00007e02d5c51ea841ddabe42380c00b319d053d1fe974e1378d662dae20d8bf",
            "previousHash": "0000c3552dd6cdd3e5c9a3ba801e035b71bcc9df6365876cc3790784847e5ae9"
        },
        {
            "index": 4,
            "timeStamp": 1531318783456,
            "transactions": [{
                    "transactionId": "6774b7b0851511e8b0278be2d92e51cd",
                    "amount": 12.5,
                    "sender": "00BLOCKTRON",
                    "receiver": "384d0820851511e8b0278be2d92e51cd"
                },
                {
                    "transactionId": "6d255250851511e8b0278be2d92e51cd",
                    "amount": 520,
                    "sender": "SANDEEP3J23NJ23N",
                    "receiver": "NEHANJK23NRJ2K3"
                },
                {
                    "transactionId": "6fe97b60851511e8b0278be2d92e51cd",
                    "amount": 52230,
                    "sender": "SANDEEP3J23NJ23N",
                    "receiver": "NEHANJK23NRJ2K3"
                },
                {
                    "transactionId": "72116470851511e8b0278be2d92e51cd",
                    "amount": 32230,
                    "sender": "SANDEEP3J23NJ23N",
                    "receiver": "NEHANJK23NRJ2K3"
                }
            ],
            "nonce": 53957,
            "hash": "0000f5dff3d8a3853c588a0ae0deca891ad4ad72c677180c95ff9bf935cdba34",
            "previousHash": "00007e02d5c51ea841ddabe42380c00b319d053d1fe974e1378d662dae20d8bf"
        },
        {
            "index": 5,
            "timeStamp": 1531318791360,
            "transactions": [{
                "transactionId": "74c3b330851511e8b0278be2d92e51cd",
                "amount": 12.5,
                "sender": "00BLOCKTRON",
                "receiver": "384d0820851511e8b0278be2d92e51cd"
            }],
            "nonce": 360,
            "hash": "0000fe7786666db0430aff9983bb9d0293f9b78673823211ce4ffe805435e7a7",
            "previousHash": "0000f5dff3d8a3853c588a0ae0deca891ad4ad72c677180c95ff9bf935cdba34"
        }
    ],
    "pendingTransactions": [{
        "transactionId": "7979c130851511e8b0278be2d92e51cd",
        "amount": 12.5,
        "sender": "00BLOCKTRON",
        "receiver": "384d0820851511e8b0278be2d92e51cd"
    }],
    "currentNodeUrl": "http://127.0.0.1:3001",
    "networkNodes": []
};

describe('Given a valid blockchain data', () => {
    test('It should validate the chain and return -> true', (done) => {
        let isValid = blocktron.isValidChain(blockchain);
        expect(isValid).toBe(true);
    });
});
