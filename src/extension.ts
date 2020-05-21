// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Timer from './Timer';
import {GoogleCharts} from 'google-charts';
import Dateobj from './Dateobj';




// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const statusBar =vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	//Get info about days
	let dateArr : Array<Dateobj> = [];
	const tmpArr : Array<Dateobj> = [];
	dateArr = context.globalState.get('date_list',tmpArr);
	//Get info about full work time
	let counter : number =  context.globalState.get('full_time',0);
	const t  = new Timer(counter,dateArr,  statusBar,context);
	t.updateDaily(context);
	t.startTimer(context);
	statusBar.show();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "time-calculator" is now active!');
	let accurate_dates : Array<number> = [0, 0, 0, 0 ,0];
	
	


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('time-calculator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		let date = new Date();

		// Display a message box to the /3600
		let akk : string   = context.globalState.get('jopa','NIKITOS')
		vscode.window.showInformationMessage('Privet ot pacanov from time-calculator!' + akk );
		
		
		
		
	});
	let showTime = vscode.commands.registerCommand('time-calculator.showTime',() => {
		let all_seconds : number;
		all_seconds = context.globalState.get('full_time',0);
		let time = {
			seconds: Math.floor(all_seconds % 60),
			minutes: Math.floor((all_seconds / 60) % 60),
			hours: Math.floor(all_seconds / 3600 ) 
		};

		vscode.window.showInformationMessage(
												'Work time as VS Code: ' +
												time.hours.toString() + 
												' hours ' +
												 time.minutes.toString() + 
												 ' minutes ' + 
												 time.seconds.toString() +
												  ' seconds ' 
												  
												 
												   )
	})

	let nullifyTime = vscode.commands.registerCommand('time-calculator.nullifyTime', () => {
		t.setNull();
		vscode.window.showInformationMessage('Nullified');
	});

	let showChart = vscode.commands.registerCommand('time-calculator.showChart', () => {
		const panel = vscode.window.createWebviewPanel(
			'Work activity',
			'Work activity',
			vscode.ViewColumn.One,
			{
				enableScripts : true
			}
			
		);
			
		
		
	

		const webCont  = (arr : Array<Dateobj>, accurate_time : Array<number>) => {
			return `<html>
			<head>
			  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
			  <script type="text/javascript">
			  	
				google.charts.load('current', {'packages':['bar']});
				google.charts.setOnLoadCallback(drawStuff);
				
				function drawStuff() {
				  var data = new google.visualization.arrayToDataTable([
					['Day', 'Work Time(hours)'],
					['${arr[1].dateString}', ${(arr[1].timeSeconds - arr[0].timeSeconds)/3600}],
					['${arr[2].dateString}', ${(arr[2].timeSeconds - arr[1].timeSeconds)/3600}],
					['${arr[3].dateString}', ${(arr[3].timeSeconds - arr[2].timeSeconds)/3600}],
					['${arr[4].dateString}', ${(arr[4].timeSeconds - arr[3].timeSeconds)/3600}]
					 
					
				  ]);
		  
				  var options = {
					width: 800,
					chart: {
					  title: 'Your code activity last 5 days',
					  subtitle: 'Hours per day'
					},
					bars: 'horizontal', // Required for Material Bar Charts.
					series: {
					  0: { axis: 'worktime' }, // Bind series 0 to an axis named 'distance'.
					  
					},
					axes: {
					  x: {
						distance: {label: 'parsecs'}, // Bottom x-axis.
						
					  }
					}
				  };
		  
				var chart = new google.charts.Bar(document.getElementById('dual_x_div'));
				chart.draw(data, options);
			  };
			  </script>
			</head>
			<body>
			  <div id="dual_x_div" style="width: 1500px; height: 500px; padding: 40px;"></div>
			</body>
		  </html>`
		}
		panel.webview.html = webCont (dateArr, accurate_dates)

		



	});
	

	context.subscriptions.push(disposable);
	context.subscriptions.push(showTime);
	context.subscriptions.push(nullifyTime);
	context.subscriptions.push(showChart);
	
}

// this method is called when your extension is deactivated
export function deactivate(context: vscode.ExtensionContext) {

	context.globalState.update('jopa','SEREGA')

	
}
