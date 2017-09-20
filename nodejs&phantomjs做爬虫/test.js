
var program = require('commander');
var csv = require('csv');
var fs = require('fs');
var inquirer = require('inquirer');

program
  .version('0.0.1')
  .option('-l, --list [list]', 'list of customers in CSV file')
  .parse(process.argv)

var questions = [

	{
		type: 'input',
		name: 'query words',
		message: 'please key in query words!'��
		default: false
	},
	
	{
        type: 'list',
        name: 'size��9��biggest��3��big��2��middle��1��little',
		message: 'please select the size you want!',
		choices: [9,3,2,1]
     }

]

inquirer.prompt(questions).then(function(answers){
	console.log('\n you chioce��');
})
