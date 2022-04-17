# 🥞 Envoys Frontend

## Run the project

1. Clone this repository
2. Run Command `yarn` in Terminal to install dependencies
3. * Be sure that prettier installed `npm install --save-dev eslint-config-prettier`
4. To run project in Development mode please run `yarn dev`

## Build for Production

1. Clone this repository
2. Run Command `yarn` in Terminal to install dependencies
3. Run Command `yarn build` in Terminal to build Production package
4. Run Command `yarn start` to execute Production version

## How to develop UI locally

1. Clone `@envoysvision/uikit` repository
2. In terminal go to `@envoysvision/uikit` folder and run `yarn link`
3. In terminal go to root foolder of this project and run `yarn link @envoysvision/uikit`
4. Now you can change uikit locally and it will be reflected immediatelly!

## Documentation

- [Info](doc/Info.md)
- [Cypress tests](doc/Cypress.md)


## MAINNET / TESTNET - Setting Up

1. First you need to add liquidity using Add Liquidity functionality for the following pairs:
   - EVT - BNB  
   - BUSD - BNB

2. Create Farms using 'add' function in MasterChef smart contract (You can use bscscan for this) using folowing sequence
   - EVT/BNB Farm must hame index in arrat - 1
   - BUSD/BNB Farm must hame index in arrat - 2

3. Copy 
