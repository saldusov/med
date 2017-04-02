let functions = {
	roundOf: (number) => {
		numberInt = parseInt(number);
		
		if(numberInt > 1 && numberInt < 130) {
			numberInt = numberInt * 3;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 130 && numberInt < 250) {
			numberInt = numberInt * 2.5;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 250 && numberInt < 500) {
			numberInt = numberInt + 300;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 500 && numberInt < 1000) {
			numberInt = numberInt + 500;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 1000 && numberInt < 2000) {
			numberInt = numberInt + 800;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 2000 && numberInt < 5000) {
			numberInt = numberInt + 1300;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 5000 && numberInt < 10000) {
			numberInt = numberInt + 2500;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 10000) {
			numberInt = numberInt + 3000;
			numberInt = Math.ceil(numberInt/100) * 100;
		}

		return numberInt;
	}
}

module.exports = functions;