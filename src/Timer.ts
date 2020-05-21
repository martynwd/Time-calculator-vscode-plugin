// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Dateobj from './Dateobj';

const ARR_SIZE = 5;

class Timer {
    counter :number;
    dateArr : Array<Dateobj>;
    statusBar : vscode.StatusBarItem;

    constructor (counter_ : number , dateArr_ : Array<Dateobj>, statusBar_ : vscode.StatusBarItem, context: vscode.ExtensionContext){


        this.counter = counter_;
        const emptArr : Array<Dateobj> = [];
        this.dateArr = dateArr_;
        this.statusBar = statusBar_;

    }
    startTimer(context: vscode.ExtensionContext){
        let intervalId = setInterval(() => {

            this.counter = this.counter + 1;
            let time = {
                seconds: Math.floor(this.counter % 60),
                minutes: Math.floor((this.counter / 60) % 60),
                hours: Math.floor(this.counter / 3600 )
            };


            this.statusBar.text = (time.hours.toString() + ' hours ' + time.minutes.toString() + ' minutes ' + time.seconds.toString() + ' seconds '  );
            this.dateArr[this.dateArr.length-1].timeSeconds = this.counter;
            context.globalState.update('full_time',this.counter);
            context.globalState.update('date_arr',this.dateArr);


        }, 1000);

    }

    getDateArr() : Array<Dateobj>{
        return this.dateArr;
    }
    setNull(){
        this.counter = 0;
    }
    updateDaily( context: vscode.ExtensionContext){
        let tmpDate = new Date();
        let strDate = tmpDate.getDate().toString() + ' ' + tmpDate.getMonth().toString() + ' ' + tmpDate.getFullYear().toString();
        let currentDate = new Dateobj(strDate,this.counter);
        let todayIsExists : boolean = false;
        for (let i = 0; i < this.dateArr.length; i++){
            if (this.dateArr[i].dateString === currentDate.dateString){
                this.dateArr[i].timeSeconds = this.counter;
                todayIsExists = true;
                
            }
        }
        if (!todayIsExists){
            if (this.dateArr.length >= ARR_SIZE){
               
                for (let i = 0; i < this.dateArr.length-1; i++){
                    this.dateArr[i]=this.dateArr[i+1];
                    
                }
                this.dateArr[this.dateArr.length-1] =currentDate;

            }else{
                this.dateArr.push(currentDate);
            }
        }

       
        
  
        

    }
}

export default Timer;