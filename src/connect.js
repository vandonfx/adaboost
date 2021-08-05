import Web3 from 'web3';
// USER WALLET ADDRESS
let account

// WEB3JS Server
let  web3 = new Web3('https://bsc-dataseed3.ninicoin.io/')


// ABI OF TOKEN ADDRESS
let minABI = [
 //Dividend account info
  {
    "inputs": [
        {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
        }
    ],
    "name": "getAccountDividendsInfoAtIndex",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        },
        {
            "internalType": "int256",
            "name": "",
            "type": "int256"
        },
        {
            "internalType": "int256",
            "name": "",
            "type": "int256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
  //Number of eligible dividend holders
  {
    "inputs": [],
    "name": "getNumberOfDividendTokenHolders",
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
    //Marketing Wallet
    {
      "inputs": [],
      "name": "_marketingWalletAddress",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
    // balanceOf
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    // decimals
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    },
    //Total Dividends Distributed
    {
      "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "getAccountDividendsInfo",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        },
        {
            "internalType": "int256",
            "name": "",
            "type": "int256"
        },
        {
            "internalType": "int256",
            "name": "",
            "type": "int256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        },
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
      
    },
    {
      "inputs": [],
      "name": "getTotalDividendsDistributed",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
  ];
//ADABOOST TOKEN CONTRACT
 const tokenAddress = "0x59F946F6a661A83F6636EF14320173105ACa6fF9"

//ADA TOKEN CONTRACT
const adaTokenAddress = "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47"

//CONTRACT FOR TRACKING ADA TOKENS
let adaContract = new web3.eth.Contract(minABI,adaTokenAddress)
// CONTRACT FOR TRACKING ADABOOST TOKENS
let adaBoostContract = new web3.eth.Contract(minABI,tokenAddress)

// ADA REWARDS
let adaRewardsTracker

// ADA TOTAL REWARDS DISTRIBUTED
let adaTotalRewardsDistributed

// Marketing wallet
let marketingWallet

//Set account wallet address to variable
function getAccountInfo(){
   setTimeout(function(){
    account = document.getElementById("inputAddress").value
    connect()
   })
   
 
}
async function connect(){
  try{
  // Disable input textfield
  document.getElementById("inputAddress").disabled = true


    //Calculate how many ADABOOST tokens you have currently in wallet
    adaBoostContract = new web3.eth.Contract(minABI,tokenAddress)
    adaBoostContract.methods.balanceOf(account).call().then(result => {
    result = parseFloat(result)
    result = (result / (10**18)).toFixed(4)
   
        document.getElementById("ADABTotal").innerHTML = result + " ADAB"
    })
    
    //Get total dividends amount
    adaBoostContract.methods.getAccountDividendsInfo(account).call().then(result => {
      adaRewardsTracker = parseFloat(result[4])
      adaRewardsTracker = (adaRewardsTracker/ (10**18)).toFixed(4)
      document.getElementById("ADARewards").innerHTML = "~" + adaRewardsTracker + " ADA"
    })
    
    // GET TOTAL DIVIDENDS DISTRIBUTED BY CONTRACT
    adaBoostContract.methods.getTotalDividendsDistributed().call().then(result => {
      adaTotalRewardsDistributed = parseFloat(result)
      adaTotalRewardsDistributed = (adaTotalRewardsDistributed / (10**18)).toFixed(4)
      document.getElementById("ADATotalRewards").innerHTML = adaTotalRewardsDistributed + " ADA"
    })
    

// Update all balances on website
setInterval(function() {
  updateAmount()
  updateDistributions()
  updateRewards()
  loadJackpot()
}, 60000)

  }catch(error){
    document.getElementById("inputAddress").disabled = false
    alert("invalid address")
  }
}

// Update amount of AdaBoost tokens on website
async function updateAmount(){
 adaBoostContract.methods.balanceOf(account).call().then(result => {
   result = parseFloat(result)
   result = (result / (10**18)).toFixed(4)
   document.getElementById("ADABTotal").innerHTML = result + " ADAB"
 })
 
}

// Update Token Distributed Amount On Website
async function updateDistributions(){
  adaBoostContract.methods.getTotalDividendsDistributed().call().then(result => {
    adaTotalRewardsDistributed = parseFloat(result)
    adaTotalRewardsDistributed = (adaTotalRewardsDistributed / (10**18)).toFixed(4)
    document.getElementById("ADATotalRewards").innerHTML = adaTotalRewardsDistributed + " ADA"
  })
}

// Update Rewards Amount On Website
async function updateRewards(){
  adaBoostContract.methods.getAccountDividendsInfo(account).call().then(result => {
    adaRewardsTracker = parseFloat(result[4])
    adaRewardsTracker = (adaRewardsTracker/ (10**18)).toFixed(4)
    document.getElementById("ADARewards").innerHTML = "~" + adaRewardsTracker + " ADA"
  })
}

//Lottery Implementation Progressive Jackpot 5% of marketing wallet
async function loadJackpot(){
  adaBoostContract.methods._marketingWalletAddress().call().then(result => {
    marketingWallet = result
    adaContract.methods.balanceOf(marketingWallet).call().then(totalPrize => {
      totalPrize = parseFloat(totalPrize).toFixed(3)
      totalPrize = (totalPrize * 0.05).toFixed(3)
      document.getElementById("jackpot-amount").innerHTML =  totalPrize +" ADA"
    })

  })
  
}


//Gets marketing wallet address
async function getMarketingWallet(){
  return await adaBoostContract.methods._marketingWalletAddress().call()
}

// Retrieve number of holders
async function getListOfHolders(){
  return await adaBoostContract.methods.getNumberOfDividendTokenHolders().call()
}

// Get jackpot prize
async function getJackpot(){
  marketingWallet = await getMarketingWallet()
  return await adaContract.methods.balanceOf(marketingWallet).call()
}

//Get wallet address of winner
async function getWinnerWallet(walletIndex) {
  return await adaBoostContract.methods.getAccountDividendsInfoAtIndex(walletIndex).call()
}

export {
  connect,
  getAccountInfo,
  loadJackpot,
  getListOfHolders,
  getJackpot,
  getWinnerWallet
}