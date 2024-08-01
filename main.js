import chalk from 'chalk';
import inquirer from 'inquirer';
let balance = 1000;
let mypin = 1234;
console.log(chalk.bold.cyanBright(`\n\t Welcome to my ATM`));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.blueBright(`\n\ Enter your pin`),
        type: "number"
    }
]);
if (pinAnswer.pin === mypin) {
    console.log(chalk.bold.green(`\n\t Correct pin code!!!`));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: (chalk.bold.blueBright("please select option")),
            type: "list",
            choices: ['Check Balance', 'Deposit Money', 'Withdraw Money', 'Exit']
        }
    ]);
    switch (operationAns.operation) {
        case 'Check Balance':
            checkBalance();
            break;
        case 'Deposit Money':
            await depositMoney();
            break;
        case 'Withdraw Money':
            await withdrawMoney();
            break;
        case 'Exit':
            console.log('Thank you for using our ATM. Goodbye!');
    }
}
else {
    console.log(chalk.bold.redBright("\t Incorrect Pin Code!!!!"));
}
function checkBalance() {
    console.log(`Your current balance is: $${balance}`);
}
async function depositMoney() {
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount to deposit:',
            validate: (value) => {
                if (isNaN(value) || value <= 0) {
                    return 'Please enter a valid amount.';
                }
                return true;
            }
        }
    ]);
    balance += answers.amount;
    console.log(`You have successfully deposited $${answers.amount}. Your new balance is $${balance}.`);
}
async function withdrawMoney() {
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount to withdraw:',
            validate: (value) => {
                if (isNaN(value) || value <= 0) {
                    return 'Please enter a valid amount.';
                }
                else if (value > balance) {
                    return `You have insufficient funds. Your current balance is $${balance}.`;
                }
                return true;
            }
        }
    ]);
    balance -= answers.amount;
    console.log(`You have successfully withdrawn $${answers.amount}. Your new balance is $${balance}.`);
}
