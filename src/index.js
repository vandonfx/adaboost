import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  {Apps} from './App';
import reportWebVitals from './reportWebVitals';
import { MetamaskStateProvider } from 'use-metamask';
import {getListOfHolders, getJackpot, getWinnerWallet, loadJackpot} from './connect'
//Load jackpot amount here



// number of holders currently
let holders
let winner
let jackpot

// Display winner on page
async function displayWinner(){
    holders = await getListOfHolders()

    jackpot = parseInt(await getJackpot())
    jackpot = ((jackpot / (10**18)) * 0.05).toFixed(3)

    let index = randomGenerator(holders)
    winner = await getWinnerWallet(index)
    document.getElementById("jackpot-winner").innerHTML = "Won: " + jackpot + " ADA"
    document.getElementById("winner").innerHTML = winner[0] 

}

// Randomize Winner
function randomGenerator(totalHolders){
  const rndInt = Math.floor(Math.random() * totalHolders)
  return rndInt
}
// Show timer countdown
window.onload = async function(){
  console.log(winner)
  await loadJackpot()
  let countDownDate = new Date().getTime() + 5000
  let startCountDown = function(){
    let x = setInterval(function() {
      let now = new Date().getTime()
      let distance = countDownDate - now
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      document.getElementById("timer-label").innerHTML = days + "d " + hours + "h " +
      minutes + "m " + seconds + "s "
  
      // Once timer reaches the date, reset timer
      if(distance < 0) {
        clearInterval(x)
        setTimeout(() => {
          displayWinner()
          startCountDown()
          countDownDate = new Date().getTime() + (1000 * 60 * 60 * 24 * 7);
        }, 1000)
      }
    })
  }
  startCountDown()

}
ReactDOM.render(
  <MetamaskStateProvider>
    <Apps />
  </MetamaskStateProvider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
