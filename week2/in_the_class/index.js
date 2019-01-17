const fs = require('fs');
const chalk = require('chalk');

const args = process.argv;
const command = args[2];

fs.open('./todo.txt','a', (err, fd) => {
    if (err) {
        fs.writeFile('./todo.txt', '', (err) => {
        });
    }
});

switch(command) {
    case 'list':
        fs.readFile('./todo.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(chalk.red(err));
                return;
            } 
            fs.stat('./todo.txt', (err, stats) => {
                if (err) throw err;
                if(stats.size === 0) {
                    console.log(chalk.yellow('There are no tasks yet! :)'));
                }
                    const todo = data.split(',');  
                    const todoOnNewLines = todo.join('\n'); 
                    console.log(chalk.green(todoOnNewLines));
            });
        });
        break;

    case 'add':
        fs.stat('./todo.txt', (err, stats) => {
            if (err) throw err;
            if(stats.size === 0) {
                let newTaskToAdd = (args.splice(3)).join(',');
                fs.appendFile('./todo.txt', newTaskToAdd, () => {
                    if (err) {
                        console.log(chalk.red(err));
                        return;
                    }
                        console.log('Your new task added!');
                });
            } else {
                let newTaskToAdd = ',' + (args.splice(3)).join(',');
                fs.appendFile('./todo.txt', newTaskToAdd, () => {
                    if (err) {
                        console.log(chalk.red(err));
                        return;
                    }
                        console.log('Your new task added!')
                });
            };
        });
        break;

    case 'reset':
        fs.writeFile('./todo.txt', '', (err, data) => {
            if (err) {
                console.log(chalk.red(err));
                return;
            } 
        });
        break;

    case 'remove':
        fs.readFile('./todo.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(chalk.red(err));
                return;
            } 
            let lengthListOfTasks = (data.split(',')).length - 1;
            if(lengthListOfTasks<args[3]) {
                console.log(chalk.red('You have less tasks, choose another item to delete'))
            } else {
                let newArray=data.split(',')
                newArray.splice(args[3]-1,1).join(',');
                fs.writeFile('./todo.txt', newArray, () => {
                    if (err) { 
                        console.log(chalk.red(err));
                        return;
                    } 
                        console.log(chalk.green('File updated'));
                    });
            }
        }); 
        break;

    case 'update':
        fs.readFile('./todo.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(chalk.red(err));
                return;
            } 
            let lengthListOfTasks = (data.split(',')).length - 1;
            if(lengthListOfTasks<args[3]) {
                console.log(chalk.red('You have less tasks, choose another item to update'))
            } else {
                let newArray=data.split(',')
                newArray.splice(args[3]-1,1, args[4]).join(',');
                fs.writeFile('./todo.txt', newArray, () => {
                    if (err) { 
                        console.log(chalk.red(err));
                        return;
                    } 
                        console.log(chalk.green('File updated'));
                    });
            }
        }); 
    break;

    case 'help':
        console.log(chalk.yellow('To run ToDo application, please use following keys:', '\n', '\n',
        chalk.cyan('$ node index.js list'), ' - to display currently planned items', '\n',
        chalk.cyan('$ node index.js add'), ' - to add new tasks', '\n',
        chalk.cyan('$ node index.js remove *'), ' - to remove done task (*-listed number of item)', '\n',
        chalk.cyan('$ node index.js update * "new task"'), ' - to update task for a new one (*-listed number of item)', '\n',
        chalk.cyan('$ node index.js reset'), ' - to clear all items', '\n',
        chalk.cyan('$ node index.js help'), ' - to show help', '\n',));
    break;

    default:
        console.log('Sorry, wrong command!!!',chalk.bgGreen('Add "help" for info'));
};

