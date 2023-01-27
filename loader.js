const neo4j = require('neo4j-driver');
const fs = require('fs');

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "banking"));
const session = driver.session();

// Import accounts
const accounts = fs.readFileSync('./accounts.csv', 'utf-8').split('\n').slice(1);

accounts.forEach(account => {
    const fields = account.split(',');
    const name = fields[0];
    const address = fields[1];
    const postcode = fields[2];
    const accountNumber = fields[3];
    const sortCode = fields[4];

    session.run(`CREATE (a:Account {name: "${name}", address: "${address}", postcode: "${postcode}", accountNumber: "${accountNumber}", sortCode: "${sortCode}"})`);
});

// Import transactions
const transactions = fs.readFileSync('./transactions.csv', 'utf-8').split('\n').slice(1);

transactions.forEach(transaction => {
    const fields = transaction.split(',');
    const date = fields[0];
    const targetAccountNumber = fields[1];
    const sortCode = fields[2];
    const amount = fields[3];

    session.run(`
        MATCH (a:Account {accountNumber: "${targetAccountNumber}", sortCode: "${sortCode}"})
        CREATE (t:Transaction {date: "${date}", amount: "${amount}"})
        CREATE (a)-[:HAS_TRANSACTION]->(t)
    `);
});

session.close();
driver.close();
