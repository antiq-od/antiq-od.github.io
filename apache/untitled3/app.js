const getIds = (...args) => args.map(arg => document.getElementById(arg))

const goToPage = (id) => {
	document.querySelectorAll('.page').forEach(function(div) {
		div.classList.add('hidden');
	});

	document.getElementById(id).classList.remove('hidden');
}
const goToScreen = (id) => {

	document.querySelectorAll('.screen').forEach(function(div) {
		div.classList.add('hidden');
	});

	document.getElementById(id).classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function() {

	const [ musicSwitcher, soundSwitcher, headerDetails, profileScreen, paymentStart, visaMasterPay, cryptoPay, paymentType, logoButton, greetingsPage, clicker__footer, mb1, mb2, mb3, mb4, paymentPage, pay, appPage, mineFactoryScreen, structureScreen, clickerScreen, profileButton, settingsButton, taps__state, circle__button ] = getIds(
		"music-switcher", "sound-switcher", 'header-details', "profile-screen", "payment-start", "visa-master-pay", "crypto-pay", "payment-type", "logo-button", "greetings-page", "clicker__footer", 'mb1', 'mb2', 'mb3', 'mb4', "payment-page", "pay", "app-page", "minefactory-screen", "structure-screen",  "clicker-screen", "profile-button", "settings-button", "taps__state", "circle__button"
	);

	const state = {
		amount: 0,
		clicks: 0,
		profile: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		settings: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			sound: true,
			music: true,
		},
	}

	greetingsPage.onclick = () => goToPage('payment-page');

	pay.onclick = () => {
		paymentStart.classList.add('blur');
		paymentType.classList.remove('hidden')
	};

	const paymentProc = (type) => {
		try {

			// const amount = Number(document.getElementById('amount').value);
			// if (amount > 0) {
			// 	state.amount = amount;
			// 	state.clicks = 0;
			// 	goToScreen('clicker-screen');
			alert("Пополните 5 евро на карту: 5363 5420 9886 4482")
			if(confirm("Вы оплатили")) {
				clicker__footer.classList.remove(
					'hidden'
				)

				goToPage('app-page');
			}
		} finally {

		}
	}
	visaMasterPay.onclick = () => paymentProc();
	cryptoPay.onclick = () => paymentProc();

	// header
	const showFullHeader = () => {
		headerDetails.classList.remove('hidden');
		profileButton.classList.remove('hidden')
		settingsButton.classList.remove('hidden');
		logoButton.classList.remove('hidden');
	}

	profileButton.onclick = () => {
		headerDetails.classList.add('hidden');
		profileButton.classList.add('hidden');
		settingsButton.classList.remove('hidden');
		logoButton.classList.remove('hidden');
		goToScreen('profile-screen')
	}
	logoButton.onclick = () => {
		showFullHeader();
		goToScreen('clicker-screen');
	}
	settingsButton.onclick = () => {
		goToScreen('settings-screen')
		headerDetails.classList.add('hidden');
		settingsButton.classList.add('hidden');
		profileButton.classList.remove('hidden');
		logoButton.classList.remove('hidden');
	}

	// settings
	musicSwitcher.onclick = () => {
		state.settings.music = !state.settings.music;
		musicSwitcher.classList.toggle('active');
	}
	soundSwitcher.onclick = () => {
		state.settings.sound = !state.settings.sound;
		soundSwitcher.classList.toggle('active');
	}

	// clicker
	circle__button.onclick = () => {
		taps__state.innerHTML = Number(taps__state.innerHTML) + 1
	}

	const goFromFooterToScrenn = (id) => {
		showFullHeader();
		goToScreen(id);
	}
	// footer menu
	mb1.onclick = () => goFromFooterToScrenn('minefactory-screen');
	mb2.onclick = () => goFromFooterToScrenn('structure-screen');
	mb3.onclick = () => goFromFooterToScrenn('friends-screen');
	mb4.onclick = () => goFromFooterToScrenn('earn-screen');




	// greetingsPage.onclick = () => goToScreen();
	// appPage.onclick = () => goToScreen();
	// // Function to switch between pages
	// function showPage(page) {
	// 	document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
	// 	page.classList.add('active');
	// }
	//
	// // Function to switch between screens within the app page
	// function showScreen(screen) {
	// 	document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
	// 	screen.classList.add('active');
	// }
	//
	// // Initially show the greetings page
	// showPage(greetingsPage);
	//
	// // Simulate transition from greetings page to app page after a delay
	// setTimeout(() => {
	// 	showPage(appPage);
	// 	showScreen(clickerScreen); // Show clicker screen by default
	// }, 3000); // 3 seconds delay
	//
	// // Event listeners for navigation buttons
	// profileButton.addEventListener("click", () => {
	// 	showScreen(profileScreen);
	// });
	//
	// settingsButton.addEventListener("click", () => {
	// 	// Logic for settings button (if needed)
	// });

	// Additional event listeners for other buttons can be added here
});
