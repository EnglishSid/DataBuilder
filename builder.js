const faker = require('faker');
const fs = require('fs');

const accounts = [];
const transactions = [];

// Generate 100 random bank accounts
for (let i = 0; i < 100; i++) {
    const name = faker.name.findName();
    const address = faker.address.streetAddress();
    const postcode = faker.address.zipCode();
    const accountNumber = faker.random.number({min: 1000000000, max: 9999999999}).toString();
    const sortCode = `${faker.random.number({min: 10, max: 99})}-${faker.random.number({min: 10, max: 99})}-${faker.random.number({min: 10, max: 99})}`;
    accounts.push({name, address, postcode, accountNumber, sortCode});
}

// Generate 200 random transactions for each account
accounts.forEach(account => {
    for (let i = 0; i < 200; i++) {
        const date = faker.date.past();
        const targetAccountNumber = faker.random.number({min: 1000000000, max: 9999999999}).toString();
        const targetSortCode = `${faker.random.number({min: 10, max: 99})}-${faker.random.number({min: 10, max: 99})}-${faker.random.number({min: 10, max: 99})}`;
        const amount = faker.random.number({min: 1, max: 10000});
        transactions.push({accountNumber: account.accountNumber, sortCode: account.sortCode, date, targetAccountNumber, targetSortCode, amount});
    }
});

// Write the accounts data to a CSV file
const accountsCSV = accounts.map(account => `${account.name},${account.address},${account.postcode},${account.accountNumber},${account.sortCode}`).join('\n');
fs.writeFileSync('accounts.csv', `name,address,postcode,accountNumber,sortCode\n${accountsCSV}`);

// Write the transactions data to a CSV file
const transactionsCSV = transactions.map(transaction => `${transaction.accountNumber},${transaction.sortCode},${transaction.date},${transaction.targetAccountNumber},${transaction.targetSortCode},${transaction.amount}`).join('\n');
fs.writeFileSync('transactions.csv', `accountNumber,sortCode,date,targetAccountNumber,targetSortCode,amount\n${transactionsCSV}`);
