$(function() {
	const app = (function(){
		const song = document.querySelector('.song');
		const play = document.querySelector('.play');
		const outline = document.querySelector('.moving-outline circle');
		const video = document.querySelector('.vid-container video');


		//sounds
		const sounds = document.querySelectorAll('.sound-picker button');
		//time display)
		const timeDisplay = document.querySelector('.time-display');
		const timeSelect = document.querySelectorAll('.time-select button');
		//get the length of the outline
		const outlinelength = outline.getTotalLength();
		console.log(outlinelength);
		//duration
		let fakeDuration = 600;

		outline.style.strokeDasharray = outlinelength;
		outline.style.strokeDashoffset = outlinelength;

		//pick different sounds
		sounds.forEach(sound =>{
			sound.addEventListener('click', function() {
				song.src = this.getAttribute('data-sound');
				video.src = this.getAttribute('data-video');
				checkPlaying(song);
			});
		});

		//play sound
		play.addEventListener('click', function() {
			checkPlaying(song);
		}); 

		//Select sound
		timeSelect.forEach(option =>{
			option.addEventListener('click', function(){
				fakeDuration =this.getAttribute('data-time');
				timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
			});
		});
		

		//function to stop and play sounds
		const checkPlaying = function(song){
		if (song.paused){
			song.play();
			video.play();
			play.src = 'svg/pause.svg';
		} else {
			song.pause();
			video.pause();
			play.src = 'svg/play.svg';
		}
	}

	//animate the circle and check time
	song.ontimeupdate = function() {
		let currentTime = song.currentTime; 
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60);
		let minutes = Math.floor(elapsed / 60); 

		//Animate the circle
		let progress = outlinelength - (currentTime / fakeDuration) * outlinelength; 
		outline.style.strokeDashoffset = progress;
		//animate the text
		timeDisplay.textContent = `${minutes}:${seconds}`;

		if(currentTime >= fakeDuration){
			song.pause();
			song.currentTime = 0;
			play.src = 'svg/play.svg';
			video.pause();
		}
	}

})
	app();
});