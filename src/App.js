/* eslint-disable jsx-a11y/heading-has-content */
import logo from './icon-only.png';
import './style.css';
import  {getAccountInfo} from './connect';
import React from 'react';


function Apps() {
 
  return (
    
    <div id="particles-js">
      <div class= "main" id="main">
        <p id="winner"></p>
        <h1 id="jackpot-winner"></h1>
        <div class="wrapper">
        <h1 id="jackpot-label">Countdown Timer</h1>
        <p id="timer-label">Timer here</p>
        <h1 id="jackpot-label">Progressive Jackpot Amount</h1>
        <p id="jackpot-amount"></p>
        </div>
        
      </div>
      <div class="main" id="main">
        <div class="wrapper">
          <div class="logo-wrap">
            <h1>AdaBoost <br></br><span>Earnings Dashboard</span></h1>
            <img class="logo" src={logo} alt="Can't display Logo"/>
          </div>
          <div class="token-wrap">
            <div class="token-info-wrap">
              <div class="">
                <h3>Total $ADABoost Supply</h3>
                <p>100,000,000,000</p>
              </div>
              <div class="">
                <h3>Total $ADA Rewarded</h3>
                <p id="ADATotalRewards"></p>
              </div>
            </div>

            <div class="dash-wrap">
              <div class="enterWallet">
                <h3>Please paste your wallet address below</h3>
                <input id="inputAddress" type="text" onPaste={getAccountInfo}/>
              </div>

              <div class="stats-wrap">
                <div class="">
                  <h3>Your $ADABoost Balance</h3>
                  <p id="ADABTotal"></p>
                </div>
                <div class="">
                  <h3>$ADA Earned</h3>
                  <p id="ADARewards"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div> 
  );
}



export {
  Apps
}
