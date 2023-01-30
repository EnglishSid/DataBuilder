// Load account holders
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:///accountHolders.csv" AS row
CREATE (:AccountHolder { id: toInteger(row.id), firstName: row.firstName, lastName: row.lastName, company: row.company, address: row.address, postcode: row.postcode });

// Load transactions
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:///transactions.csv" AS row
MATCH (a:AccountHolder { id: toInteger(row.accountId) }), (b:AccountHolder { id: toInteger(row.targetAccountId) })
CREATE (a)-[:TRANSFERRED { id: toInteger(row.id), amount: toInteger(row.amount), date: row.date }]->(b);



LOAD CSV WITH HEADERS FROM "file:///transactions.csv" AS row
MERGE (t:Tranaction {sid:toInteger(row.accountId) ,tid: toInteger(row.targetAccountId), amount: toInteger(row.amount), date: row.date })


// create the relationships 
MATCH (n:Transaction)
with n
MATCH (a1:AccountHolder),(a2:AccountHolder)
where a1.id=n.sid AND a2.id=n.tid
MERGE (a1)-[:SENT]->(n)-[:RECEIVED]->(a2)