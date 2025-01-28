class CountDownTimer{

    constructor( containerID, withProgressBar = true){
        this.containerID = containerID;
        this.timeInterval = 0; // seconds
        this.time = 0;
        this.jsInterval = null;
        this.withProgressBar = withProgressBar;
    }

    render(){

        const mainContainer = document.getElementById(this.containerID);
        if( !mainContainer){
            console.error(`Element with ID ${this.containerID} not found`);
            return false;
        }
        
        const container = document.createElement('div');
        container.classList.add('CountDownTimer-container');
        
        const htmlTimeInput = document.createElement('input');
        htmlTimeInput.id= 'CountDownTimer-input-time';
        htmlTimeInput.type= 'time';
        htmlTimeInput.step = 1;
        container.appendChild(htmlTimeInput);

        const htmlStartButton = document.createElement('button');
        htmlStartButton.id= 'CountDownTimer-btn-start';
        htmlStartButton.innerText = 'Start';
        htmlStartButton.addEventListener('click', ()=>{
           
            this.handleStart();
        });

        const htmlPauseButton = document.createElement('button');
        htmlPauseButton.id= 'CountDownTimer-btn-pause';
        htmlPauseButton.innerText = 'Pause';
        htmlPauseButton.addEventListener('click', ()=>{
            this.handlePause();
        });

        const htmlResetButton = document.createElement('button');
        htmlResetButton.id= 'CountDownTimer-btn-reset';
        htmlResetButton.innerText = 'Reset';
        htmlResetButton.addEventListener('click', ()=>{
            this.handleReset();
        });

        const htmlMainDivStopWatch = document.createElement('div');
        htmlMainDivStopWatch.classList.add('CountDownTimer-button-row');
        htmlMainDivStopWatch.appendChild(htmlStartButton);
        htmlMainDivStopWatch.appendChild(htmlPauseButton);
        htmlMainDivStopWatch.appendChild(htmlResetButton);
        container.appendChild(htmlMainDivStopWatch);

        if( this.withProgressBar){
            const progressBarContainer = document.createElement('div');
            progressBarContainer.classList.add('CountDownTimer-progress-container');
            const progressBar = document.createElement('div');
            progressBar.classList.add('CountDownTimer-progress-bar');
            progressBarContainer.appendChild(progressBar);
            container.appendChild(progressBarContainer);
        }

        mainContainer.appendChild(container);
    }

    handleStart(fromPause = false){
        const htmlTimeInput = document.getElementById('CountDownTimer-input-time');
        const time = htmlTimeInput.value;
        const seconds = this.timeToSeconds(time);
        if( !fromPause){
            this.timeInterval = seconds;
        }
        this.time = seconds; 
        if (this.jsInterval) {
            clearInterval(this.jsInterval);
            this.jsInterval = null; 
        }
        this.jsInterval = setInterval( ()=>{
            if( this.time > 0){
                this.time--;
                this.updateDisplay();
            }else{
                this.handlePause();
                
            }
        }, 1000);
    }

    handlePause(fromReset = false){
        if( this.jsInterval) {
            clearInterval(this.jsInterval);
            this.jsInterval = null; 
        }else{
            if( !fromReset){
                this.handleStart(true);
            }
        }
    }

    handleReset(){
        this.handlePause(true);
        this.time = this.timeInterval; 
        const htmlTimeInput = document.getElementById('CountDownTimer-input-time');
        htmlTimeInput.value = this.secondsToTime(this.timeInterval);
        this.updateDisplay();
    }

    trigger(eventName){
        switch( eventName.toLowerCase()){
            case 'start':
                this.handleStart();
                break;
            case 'pause':
                this.handlePause();
                break;
            case 'reset':
                this.handleReset();
                break;   
            default:
                throw new Error("Unknown event name");
                break;
        }
    }

    updateDisplay(){
        const htmlTimeInput = document.getElementById('CountDownTimer-input-time');
        htmlTimeInput.value = this.secondsToTime(this.time)
        if( this.withProgressBar){
            this.updateProgressBar( (this.time/this.timeInterval) * 100 );
        }
    }

    updateProgressBar(progress){
        const progressBar = document.querySelector('.CountDownTimer-progress-bar');
        const clampedProgress = Math.max(0, Math.min(progress, 100));
        if( clampedProgress<30){
            progressBar.style.background = 'linear-gradient(90deg, #ff0000, #ffadad)';    
        }else{
            progressBar.style.background = 'linear-gradient(90deg, #4caf50, #81c784)';
        }
        progressBar.style.width = `${clampedProgress}%`;
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