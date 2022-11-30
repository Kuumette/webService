/** La fonction de reload on peux la mettre ailleurs 😁 */
function loadView(type, side, displayImage, brightness, contrast, invert) {
	/**
	 * Pour accerder à une information de notre json
	 * il faut écrire `displayImage[type]`
	 */
	/** Je récupère les infos du DOM */
	//console.log(type);
	const CONTENT = document.querySelector(`#${side} #content`);
	const INFO_IMG = document.querySelector(`#${side} #infoImg`);

	const TOGGLE_COORDS = document.querySelector("#last");
	const TOGGLE_COORDS_G = document.querySelector("#lastGauche");
	const TOGGLE_COORDS_D = document.querySelector("#lastDroite");
	const REGLAGE_GAUCHE = document.querySelector("#footerGauche");
	const REGLAGE_DROITE = document.querySelector("#footerDroite");
	const MENU = document.querySelector("#menu");
	const MENULEFT = document.querySelector("#menuLeft");
	const MENURIGHT = document.querySelector("#menuRight");
	const REGLAGE = document.querySelector(".reglage");

	let html = "";
	console.log(displayImage);
	if (type === "lastImage") {
		fetch(
			//"http://127.0.0.1:5500/ressources/lastImage.json"
			//"https://live.neos360.com/eso/paranal/alpaca/ressources/lastImage.json"
			"http://134.171.180.58/ressources/lastImage.json"
		)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				console.log(json);
				let infoImg = `
			<p id="date">${json.day.date}</p>
			<p id="heure">${json.day.heure}</p>
			<p id="name">${json.day.name}</p>
		`;
				INFO_IMG.innerHTML = infoImg;
				setInterval(() => {
					fetch(
						//"http://127.0.0.1:5500/ressources/lastImage.json"
						//"https://live.neos360.com/eso/paranal/alpaca/ressources/lastImage.json"
						"http://134.171.180.58/ressources/lastImage.json"
					)
						.then((response) => {
							return response.json();
						})
						.then((myJson) => {
							let infoImg = `
					<p id="date">${myJson.day.date}</p>
					<p id="heure">${myJson.day.heure}</p>
					<p id="name">${myJson.day.name}</p>
				`;
							INFO_IMG.innerHTML = infoImg;
						});
				}, 60000);
			});
	} else if (type === "lastSubstractionImage") {
		fetch(
			//"http://127.0.0.1:5500/ressources/lastSubImage.json"
			//"https://live.neos360.com/eso/paranal/alpaca/ressources/lastImage.json"
			"http://134.171.180.58/ressources/lastSubImage.json"
		)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				console.log(json);
				let infoImg = `
			<p id="date">${json.day.date}</p>
			<p id="heure">${json.day.heure}</p>
			<p id="name">${json.day.name}</p>
		`;
				INFO_IMG.innerHTML = infoImg;
				setInterval(() => {
					fetch(
						//"http://127.0.0.1:5500/ressources/lastSubImage.json"
						//"https://live.neos360.com/eso/paranal/alpaca/ressources/lastImage.json"
						"http://134.171.180.58/ressources/lastSubImage.json"
					)
						.then((response) => {
							return response.json();
						})
						.then((myJson) => {
							let infoImg = `
					<p id="date">${myJson.day.date}</p>
					<p id="heure">${myJson.day.heure}</p>
					<p id="name">${myJson.day.name}</p>
				`;
							INFO_IMG.innerHTML = infoImg;
						});
				}, 60000);
			});
	}
	if (type === "lastImage" || type === "lastSubstractionImage") {
		//console.log(infoImg);
		// const infoImg = "";
		/** Si c'est lastImage ou lastSubstractionImage alors */
		//console.log(displayImage[type]);
		let tmp = new Date();
		html = `
			<div id="center-${side}" style="display: ${getItem(`display-${side}`)}"></div>
			<img src="${
				displayImage[type].img + "?" + tmp.getTime()
			}" alt="description" id="img" name="img-${side}" class="mx-auto d-block" style="filter: brightness(${brightness}) contrast(${contrast}) invert(${invert}) !important;"/>
		`;

		// Les informations sont necessaire que pour les images

		INFO_IMG.innerHTML = infoImg;
		INFO_IMG.style.opacity = "1";

		if (side === "main") {
			if (type === "lastImage" || type === "lastSubstractionImage") {
				TOGGLE_COORDS.style.opacity = "1";
				REGLAGE.style.display = "block";
				MENU.style.display = "block";
			}
		} else if (side === "leftSide") {
			if (type === "lastImage" || type === "lastSubstractionImage") {
				TOGGLE_COORDS_G.style.opacity = "1";
				REGLAGE_GAUCHE.style.display = "block";
				MENULEFT.style.display = "block";
			}
		} else if (side === "rightSide") {
			if (type === "lastImage" || type === "lastSubstractionImage") {
				TOGGLE_COORDS_D.style.opacity = "1";
				REGLAGE_DROITE.style.display = "block";
				MENURIGHT.style.display = "block";
			}
		}
		/** Si c'est lastAnimation ou lastSubstractionAnimation alors */
	} else if (
		type === "lastAnimation" ||
		type === "lastSubstractionAnimation"
	) {
		let tmp = new Date();
		/** Sinon c'est une vidéo */
		html = `
			<div id="center" style="display: ${getItem(`display-${side}`)}"></div>

			<video src="${
				displayImage[type].img + "?" + tmp.getTime()
			}" autoplay preload controls loop class="video-js"></video>
		`;

		// j'efface les informations pour les vidéos
		INFO_IMG.innerHTML = infoImg;
		INFO_IMG.style.opacity = "0";
		if (side === "main") {
			TOGGLE_COORDS.style.opacity = "0";
			REGLAGE.style.display = "none";
			MENU.style.display = "none";
		} else if (side === "leftSide") {
			TOGGLE_COORDS_G.style.opacity = "0";
			REGLAGE_GAUCHE.style.display = "none";
			MENULEFT.style.display = "none";
		} else if (side === "rightSide") {
			TOGGLE_COORDS_D.style.opacity = "0";
			REGLAGE_DROITE.style.display = "none";
			MENURIGHT.style.display = "none";
		}
		/** Si c'est attenuation alors */
	} else if (type === "attenuation") {
		let tmp = new Date();
		html = `
			<img src="${
				displayImage[type].img + "?" + tmp.getTime()
			}" alt="description" id="imgAttenuation" name="img-${side}" class="mx-auto d-block" style="filter: brightness(1) contrast(1) invert(0) !important;"/>
		`;

		// Les informations sont necessaire que pour les images

		INFO_IMG.innerHTML = infoImg;
		INFO_IMG.style.opacity = "1";
		if (side === "main") {
			if (type === "attenuation") {
				REGLAGE.style.display = "none";
				TOGGLE_COORDS.style.opacity = "0";
				MENU.style.display = "none";
			}
		} else if (side === "leftSide") {
			TOGGLE_COORDS_G.style.opacity = "0";
			REGLAGE_GAUCHE.style.display = "none";
			MENULEFT.style.display = "none";
		} else if (side === "rightSide") {
			TOGGLE_COORDS_D.style.opacity = "0";
			REGLAGE_DROITE.style.display = "none";
			MENURIGHT.style.display = "none";
		}
		/** Si c'est panorama alors */
	} else if (type === "panorama") {
		let tmp = new Date();
		html = `
			<img src="${
				displayImage[type].img + "?" + tmp.getTime()
			}" alt="description" id="imgPanorama" name="img-${side}" class="mx-auto d-block" style="filter: brightness(${brightness}) contrast(${contrast}) invert(${invert}) !important;"/>
		`;

		// Les informations sont necessaire que pour les images

		INFO_IMG.innerHTML = infoImg;
		INFO_IMG.style.opacity = "1";
		if (side === "main") {
			TOGGLE_COORDS.style.opacity = "0";
			REGLAGE.style.display = "block";
			MENU.style.display = "block";
		} else if (side === "leftSide") {
			TOGGLE_COORDS_G.style.opacity = "0";
			REGLAGE_GAUCHE.style.display = "block";
			MENULEFT.style.display = "block";
		} else if (side === "rightSide") {
			TOGGLE_COORDS_D.style.opacity = "0";
			REGLAGE_DROITE.style.display = "block";
			MENURIGHT.style.display = "block";
		}
	}

	CONTENT.innerHTML = html;
}
