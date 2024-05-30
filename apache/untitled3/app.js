const getIds = (...args) => args.map(arg => document.getElementById(arg))

document.addEventListener("DOMContentLoaded", function() {

	console.log(getIds(
		"greetings-page", "app-page", "profile-screen", "clicker-screen", "profile-button", "settings-button"
	))
	const [ greetingsPage, appPage, profileScreen, clickerScreen, profileButton, settingsButton, taps__state, circle__button ] = getIds(
		"greetings-page", "app-page", "profile-screen", "clicker-screen", "profile-button", "settings-button", "taps__state", "circle__button"
	);

	const state = {
		page: {
			name: 'greetings-page',
			change: function (newPage) {
				document.getElementById(this.name).classList.add('hidden')
				document.getElementById(newPage).classList.remove('hidden')
				this.name = newPage;
			},
			replace: function (from, to) {
				document.getElementById(from).classList.add('hidden')
				document.getElementById(to).classList.remove('hidden')
				this.name = to;
			}
		},
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
			confirmPassword: ''
		},
	}

	greetingsPage.onclick = () => state.page.change('app-page');
	profileButton.onclick = () => state.page.replace('clicker-screen', 'profile-screen');
	circle__button.onclick = () => {
		taps__state.innerHTML = Number(taps__state.innerHTML) + 1
	}

	// greetingsPage.onclick = () => state.page.change();
	// appPage.onclick = () => state.page.change();
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
