let functions = {
	roundOf: (number) => {
		if(number > 1 && number < 130) {
			number = number * 3;
			number = Math.ceil(number/10) * 10;
		}

		if(number > 130 && number < 250) {
			number = number * 2.5;
			number = Math.ceil(number/10) * 10;
		}

		if(number > 250 && number < 500) {
			number = number + 300;
			number = Math.ceil(number/100) * 100;
		}

		if(number > 500 && number < 1000) {
			number = number + 500;
			number = Math.ceil(number/100) * 100;
		}

		if(number > 1000 && number < 2000) {
			number = number + 800;
			number = Math.ceil(number/100) * 100;
		}

		if(number > 2000 && number < 5000) {
			number = number + 1300;
			number = Math.ceil(number/100) * 100;
		}

		if(number > 5000 && number < 10000) {
			number = number + 2500;
			number = Math.ceil(number/100) * 100;
		}

		if(number > 10000) {
			number = number + 3000;
			number = Math.ceil(number/100) * 100;
		}
	}
}

