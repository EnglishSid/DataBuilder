//Using node.is write a script to generate sample data for the following data model and output the results to CSV files

//200 bank accounts with personal details and 200 transactions for each account, each account is owned by a person who works for 1 of 5 companies


const fs = require('fs');
const faker = require('faker');

// Array of company names
const companies = ['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'];

// Array of account holders
const accountHolders = [];
for (let i = 1; i <= 200; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const company = companies[Math.floor(Math.random() * companies.length)];
  const address = faker.address.streetAddress();
  const postcode = faker.address.zipCode();
  accountHolders.push([i, firstName, lastName, company, address, postcode]);
}

// Write account holders to CSV file
fs.writeFileSync('accountHolders.csv', 'id,firstName,lastName,company,address,postcode\n');
accountHolders.forEach(accountHolder => {
  fs.appendFileSync('accountHolders.csv', accountHolder.join(',') + '\n');
});

// Array of transactions
const transactions = [];
for (let i = 1; i <= 200; i++) {
  for (let j = 1; j <= 200; j++) {
    const accountId = i;
    const targetAccountId = Math.floor(Math.random() * 200) + 1;
    // Ensure target account is not the same as the current account
    if (accountId === targetAccountId) {
      continue;
    }
    const amount = Math.floor(Math.random() * 1000);
    const date = faker.date.recent().toISOString().slice(0, 10);
    transactions.push([j, accountId, targetAccountId, amount, date]);
  }
}

// Write transactions to CSV file
fs.writeFileSync('transactions.csv', 'id,accountId,targetAccountId,amount,date\n');
transactions.forEach(transaction => {
  fs.appendFileSync('transactions.csv', transaction.join(',') + '\n');
});
