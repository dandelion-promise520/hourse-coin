export default defineBackground(() => {
	browser.sidePanel
		.setPanelBehavior({ openPanelOnActionClick: true })
		.catch((e) => console.error(e));
});
