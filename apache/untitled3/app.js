const getIds = (...args) => args.map(arg => document.getElementById(arg))

const formatNumber = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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

	const [ CONTAINEER, voltcoinAmount, timer, musicSwitcher, soundSwitcher, headerDetails, profileScreen, paymentStart, visaMasterPay, cryptoPay, paymentType, logoButton, greetingsPage, clicker__footer, mb1, mb2, mb3, mb4, paymentPage, pay, appPage, mineFactoryScreen, structureScreen, clickerScreen, profileButton, settingsButton, taps__state, circle__button ] = getIds(
		'CONTAINEER', 'voltcoin-amount', 'timer', "music-switcher", "sound-switcher", 'header-details', "profile-screen", "payment-start", "visa-master-pay", "crypto-pay", "payment-type", "logo-button", "greetings-page", "clicker__footer", 'mb1', 'mb2', 'mb3', 'mb4', "payment-page", "pay", "app-page", "minefactory-screen", "structure-screen",  "clicker-screen", "profile-button", "settings-button", "taps__state", "circle__button"
	);

	const state = {
		balance: 435210,
		clicks: 1000,
		clicksPerClick: 1,
		timer: false,
		structure: {

		},
		mineFactory: {
			mineFactories: [
				{title: "D.C.", logo: "electricity.png", lvl: 1, amount: 800},
				{title: "A.C.", logo: "electricity2.jpg", lvl: 1, amount: 2000},
				{title: "Рower lin", logo: "flexVibe8.jpg", lvl: 1, amount: 800},
				{title: "High voltag", logo: "flexVibe7.jpg", lvl: 1, amount: 2000},
				{title: "Transforme", logo: "flexVibe6.jpg", lvl: 1, amount: 800},
				{title: "HVD", logo: "transformator.png", lvl: 1, amount: 2000},
				{title: "Converter station", logo: "flexVibe5.jpg", lvl: 1, amount: 800},
				{title: "Cable system", logo: "flexVibe4.jpg", lvl: 1, amount: 2000},
				{title: "Superconductor", logo: "flexVibe3.jpg", lvl: 1, amount: 800},
				{title: "Renewable energ", logo: "flexVibe2.jpg", lvl: 1, amount: 2000},
				{title: "Renewable energ", logo: "flexVibe1.jpg", lvl: 1, amount: 2000},
			],
			upgradeMineFactory: function upgradeMineFactory (id) {
				this.mineFactories[id].lvl += 1;
				this.mineFactories[id].energy += 100;
				this.mineFactories[id].price = 1000;
			},
		},
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

	const getState = () => {
		//actual timer
		// actual structure and energy (mine, x2) lvl upgrade
		//  actual profile data
		//   actual settings data
		//    actual music and sound settings
		return JSON.parse(localStorage.getItem('state'));
	}

	const renderClickerBlocks = () => voltcoinAmount.innerHTML = `${formatNumber(state.balance)}`


	// STRUCTURE + BLOCKS ____________________________________________________________________________________________________________________________________________________________________________________

	const renderStructureBlocks = () => {
		console.log('state.mineFactory.mineFactories.reduce((acc, num) => acc + num.lvl, 0)', state.mineFactory.mineFactories.reduce((acc, num) => acc + num.lvl, 0))
		console.log('state.mineFactory.length', state.mineFactory.length)
		state.clicksPerClick = state.mineFactory.mineFactories.reduce((acc, num) => acc + num.lvl, 0) - 10;
		// Clear existing content
		CONTAINEER.innerHTML = '';

		state.mineFactory.mineFactories.forEach((block, index) => {
			const energyBlockElement = createEnergyBlock(block, index);
			CONTAINEER.appendChild(energyBlockElement);
		});

		circle__button.classList.add('chill' + state.clicksPerClick);
	}

	const onClick = (index) => {
		const price = state.mineFactory.mineFactories[index].amount
		if (state.balance >= price) {
			state.mineFactory.upgradeMineFactory(index);
			renderStructureBlocks();

			state.balance -= price;
			renderClickerBlocks();
		} else {
			alert('Not enough money');
		}
	}

	const createEnergyBlock = ({ title, logo, lvl, amount }, index) => {
		const div = document.createElement('div');
		div.className = 'energyBlock';

		div.innerHTML = `
        <div class="flex__double">
            <div class="left-t">
                <img src="${logo}" class="factory__logo" alt="${title}">
            </div>
            <div class="right-t">
                <h5><span class="solar_lvl">+${lvl}</span></h5>
                <p>
                    <img src="zero.png" alt="Solar Panels" class="mini__logo">
                    <span class="solarP__amount">${amount}</span>
                </p>
            </div>
        </div>
        <h4 class="button-text">${title}</h4>
    `;

		// Add click event listener
		div.addEventListener('click', () => onClick(index));

		return div;
	};

	//________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


	// greetings and Payment ________________________________________________________________________________________________________________________________________________________________________
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


	//________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

	// header
	const showFullHeader = (promt) => {
		headerDetails.classList.remove('hidden');
		profileButton.classList.remove('hidden')
		settingsButton.classList.remove('hidden');
		if (promt === 'with-out-logo') logoButton.classList.add('hidden');
		else logoButton.classList.remove('hidden');
	}
	profileButton.onclick = () => {
		headerDetails.classList.add('hidden');
		profileButton.classList.add('hidden');
		settingsButton.classList.remove('hidden');
		logoButton.classList.remove('hidden');
		goToScreen('profile-screen')
	}
	logoButton.onclick = () => {
		showFullHeader('with-out-logo');
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

	//healing opportunity to play
	const PAUSE_DURATION = 3 * 60 * 60 * 1000; // 3 часа
	const reviveBros = () => { taps__state.innerHTML = "1000"; timer.innerHTML = "03:00" }

	const startTimerViber = (endTime) => {
		if (!state.timer) {
			state.timer = true
			const startTimer = setInterval(() => {
				const LEFT_TIME = endTime - Date.now();

				const FINISSSHHHHHEEEESH = () => { reviveBros();
					circle__button.classList.remove('chill');
					mb4.classList.remove('autopilot-farming-on')
					clearInterval(startTimer);
					state.timer = false; }

				const PL_UP = () => { const hours =
					Math.floor((LEFT_TIME % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					const minutes = Math.floor((LEFT_TIME % (1000 * 60 * 60)) / (1000 * 60));
					timer.innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`; }

				if (LEFT_TIME <= 0) FINISSSHHHHHEEEESH()
				else PL_UP()

			}, 1000);
		} else console.log('Time Is Already On')
	}

	// earniesss
	const initTapsPause = () => { circle__button.classList.add('chill'); startTimerViber(Date.now() + PAUSE_DURATION) };
	const initVibingFckMoneyGrind = () => { mb4.classList.add('autopilot-farming-on'); startTimerViber(Date.now() + PAUSE_DURATION) }

	// clicker
	circle__button.onclick = () => {
		console.log(state.clicks, state.clicksPerClick);
		state.clicks -= state.clicksPerClick;
		console.log('new state.clicks', state.clicks)
		if (state.clicks) {
			taps__state.innerHTML = `${state.clicks}`
			console.log('taps__state.innerHTML', state.clicks);

//				 											     $$$$$$$__$$$$$$$$__$$$$$$$__$$$$$$$
//				 	  										   $$$_____$$$_______$$$$_____$$$______$$$
//				 	  										  $$_______$$$$_____$$_$$_____$$$________$$
//				 	  										 $$_______$$__$$___$$___$$___$$_$$________$$
//				 	  										 $________$____$___$_____$___$___$_________$
//				 	  										 $$_______$$__$$___$$___$$___$$_$$________$$
//				 	  										  $$_______$$$$_____$$_$$_____$$$________$$
//				   											   $$______$$$$_____$$$$_____$$$$$_____$$$
//				   											     $$$$$$$__$$$$$$$__$$$$$$$___$$$$$$$



//___________________________________________________________________________¶¶¶_______________________________________________________________________________________________________________________
//____________________________________________________________________________¶¶¶__________________________________________________________________________________________________________________________________________________
//___________________________________________________________¶¶¶_______________¶¶¶¶________________________________________________________________________________________________________________________________________________
//___________________________________________________________¶¶¶¶_______________¶__¶_______________________________________________________________________________________________________________________________________________
//___________________________________________________________¶_¢_¶¶_____________¶¶__¶¶_____________________________________________________________________________________________________________________________________________
//___________________________________________________________¶_$$_¶_____________¶¶___¶____________________________________________________________________________________________________________________________________________
//___________________________________________________________¶_$$$_¶______________¶___¶¶___________________________________________________________________________________________________________________________________________
//___________________________________________________________¶_$$$$_¶_____________¶¶____¶__________________________________________________________________________________________________________________________________________
//__________________________________________________________¶¶_$$$$_†®¥†¨©∂˚˜åß¬†®¥†¨©∂˚˜åß¬†®¥†¨∂˚˜åß¬¶¶\_________________________________________________________________________________________________________________________
//___________________________________________________________¶¶¶$$$$¶¶$$$$¶$$$$0$$$$0¶$$$$¶0$$$$0¶¶¶00¶∑∑∑\________________________________________________________________________________________________________________________
//__________________________________________________________¶¶____0____0____0____0__¶¶____¶__0____0____0_¶¶¶_______________________________________________________________________________________________________________________
//_________________________________________________________†®¥†¨©∂˚˜åß¬†®¥†¨©∂˚˜åß¬¶_____†®¥†¨©∂˚˜åß¬¶¶¶¶¶¶________________________________________________________________________________________________________________________
//________________________________________________________________________________¶_____¶__________________________________________________________________________________________________________________________________________
//_______________________________________________________________________________¶____¶¶___________________________________________________________________________________________________________________________________________
//______________________________________________________________________________¶_____¶____________________________________________________________________________________________________________________________________________
//______________________________________________________________________________¶___¶¶_____________________________________________________________________________________________________________________________________________
//_____________________________________________________________________________¶___¶_______________________________________________________________________________________________________________________________________________
//____________________________________________________________________________¶¶_¶¶________________________________________________________________________________________________________________________________________________
//___________________________________________________________________________¶¶_¶__________________________________________________________________________________________________________________________________________________
//__________________________________________________________________________¶¶_¶¶__________________________________________________________________________________________________________________________________________________
//_________________________________________________________________________¶¶¶¶__________________________ø…®

			state.balance += state.clicksPerClick;
			renderClickerBlocks();
		}
		else { taps__state.innerHTML = "0"; initTapsPause() }
	}

	const goFromFooterToScrenn = (id) => {
		showFullHeader();
		goToScreen(id);
	}

	renderStructureBlocks();
	renderClickerBlocks();

	// footer menu
	mb1.onclick = () => goFromFooterToScrenn('minefactory-screen');
	mb2.onclick = () => { renderStructureBlocks(); goFromFooterToScrenn('structure-screen') };
	mb3.onclick = () => { goFromFooterToScrenn('friends-screen'); headerDetails.classList.add('hidden') }
	mb4.onclick = () => initVibingFckMoneyGrind()



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
