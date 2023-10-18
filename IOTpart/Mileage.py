import json
#
#pip install web3
import time
# is imported because we want to introduce a delay between each data reading and sending it to the blockchain.
#from web3 import Web3
from web3 import Web3
#import Web3 from 'web3'
#const Web3 = require('web3')
# import the Web3 class from the web3 library in Python.
#  The Web3 class is a Python interface for interacting with Ethereum blockchain nodes. 
web3 = Web3(Web3.HTTPProvider('http://127.0.0.1:9545/'))
#web3 = Web3(Web3.HTTPProvider('http://192.168.248.168:9545/'))

# Define the contract address and ABI       
contract_address ='0x8F09173110646f02696aF763f58fc382421B2C49'
                  # 0x8F09173110646f02696aF763f58fc382421B2C49
#with open('Loginn.json', 'r') as f:
 #   contract_abi = json.load(f)
jsonfile=json.load(open('D:/React_App_Web_Cars_Diagnostic/client/src/contracts/Loginn.json'))
contract_abi=jsonfile['abi']
contract_instance = web3.eth.contract(address=contract_address, abi=contract_abi)
# Create a contract instance
#The contract instance provides a Python object that represents the contract on the blockchain.
#Once we have an instance of the contract,we can use it to call functions on the contract,
#access its variables, and send transactions to the contract.
#while True :
#used to continuously read data from the sensor and send it to the blockchain until 
# the program is interrupted or terminated.
#This allows the application to operate continuously and provide real-time data to the blockchain.
# Send the mileage data to the blockchain
mileage = 123456789
registration = "car1"
contract_instance.functions.setMileage(registration, mileage).transact({'from': web3.eth.accounts[0]})

time.sleep(1.0)  # wait for 10 seconds before checking mileage again




