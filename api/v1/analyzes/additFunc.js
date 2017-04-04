let functions = {
	roundOf: (number) => {
		numberInt = parseInt(number);
		
		if(numberInt > 1 && numberInt <= 50) {
			numberInt = numberInt * 6;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 50 && numberInt <= 100) {
			numberInt = numberInt * 4.5;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 100 && numberInt <= 150) {
			numberInt = numberInt * 3;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 150 && numberInt <= 300) {
			numberInt = numberInt * 2.8;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 300 && numberInt <= 500) {
			numberInt = numberInt + 900;
			numberInt = Math.ceil(numberInt/10) * 10;
		} else if(numberInt > 500 && numberInt <= 2000) {
			numberInt = numberInt + 800;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 2000 && numberInt <= 5000) {
			numberInt = numberInt + 1300;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 5000 && numberInt <= 10000) {
			numberInt = numberInt + 2000;
			numberInt = Math.ceil(numberInt/100) * 100;
		} else if(numberInt > 10000) {
			numberInt = numberInt + 3000;
			numberInt = Math.ceil(numberInt/100) * 100;
		}

		return numberInt;
	}
}

module.exports = functions;