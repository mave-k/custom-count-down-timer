class CountDownTimer{

    constructor( containerID){
        this.containerID = containerID;
        this.timeInterval = 0; // seconds
        this.time = 0;
        this.jsInterval = null;
    }

    render(){

        const container = document.getElementById(this.containerID);
        if( !container){
            console.error(`Element with ID ${this.containerID} not found`);
            return false;
        }
    
        const htmlTimeInput = document.createElement('input');
        htmlTimeInput.id= 'input-time';
        htmlTimeInput.type= 'time';
        htmlTimeInput.step = 1;

        const htmlStartButton = document.createElement('button');
        htmlStartButton.id= 'btn-start';
        htmlStartButton.innerText = 'Start';
        htmlStartButton.addEventListener('click', ()=>{
            const time = htmlTimeInput.value;
            const seconds = this.timeToSeconds(time);
            this.timeInterval = seconds;
            this.time = seconds; 
            this.handleStart();
        });

        const htmlPauseButton = document.createElement('button');
        htmlPauseButton.id= 'btn-stop';
        htmlPauseButton.innerText = 'Pause';
        htmlPauseButton.addEventListener('click', ()=>{
            this.handlePause();
        });

        const htmlResetButton = document.createElement('button');
        htmlResetButton.id= 'btn-reset';
        htmlResetButton.innerText = 'Reset';
        htmlResetButton.addEventListener('click', ()=>{
            this.handleReset();
        });

        const htmlMainDivStopWatch = document.createElement('div');
        htmlMainDivStopWatch.appendChild(htmlTimeInput);
        htmlMainDivStopWatch.appendChild(htmlStartButton);
        htmlMainDivStopWatch.appendChild(htmlPauseButton);
        htmlMainDivStopWatch.appendChild(htmlResetButton);
        
        container.appendChild(htmlMainDivStopWatch);
    }

    handleStart(){
        this.jsInterval = setInterval( ()=>{
            if( this.time > 0){
                this.time--;
                this.updateDisplay();
            }else{
                this.handlePause();
                
            }
        }, 1000);
    }

    handlePause(){
        if( this.jsInterval) {
            clearInterval(this.jsInterval);
            this.jsInterval = null; 
        }else{
            this.handleStart();
        }
    }

    handleReset(){
        this.handlePause();
        this.time = this.timeInterval; 
        const htmlTimeInput = document.getElementById('input-time');
        htmlTimeInput.value = this.secondsToTime(this.timeInterval);
        this.updateDisplay();
    }

    updateDisplay(){
        const htmlTimeInput = document.getElementById('input-time');
        htmlTimeInput.value = this.secondsToTime(this.time)
    }

    timeToSeconds(time) {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        return (hours * 3600) + (minutes * 60) + (seconds || 0);
    }

    secondsToTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(secs).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}