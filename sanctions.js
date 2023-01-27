const faker = require('faker');
const fs = require('fs');

// Create a new CSV file
fs.writeFileSync('financialSanctions.csv', 'Name,Type,Country,SanctionDate,SanctionReason\n');

for (let i = 0; i < 1000; i++) {
    let name = faker.name.findName();
    let type = faker.random.arrayElement(["Person","Company"]);
    let country = faker.address.country();
    let sanctionDate = faker.date.between('2010-01-01', '2022-01-01');
    let sanctionReason = faker.random.words();

    // Append the data to the CSV file
    fs.appendFileSync('financialSanctions.csv', `${name},${type},${country},${sanctionDate},${sanctionReason}\n`);
}