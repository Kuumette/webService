/**
 * Je créer une function qui m'affiche chaque x seconde mon dernier élément
 * setInterval de timer qui m'appel afficheImage.js
 * AfficheImage.js prend en paramètre le tableau de mes images avec comme clé
 * lastImage / lastSubstractionImage / lastAnimation / lastSubstractionAnimation
 * qui ont tous comme data
 * - "img": "./ressources/lastImage.jpg",
	 -	"desc": "last picture",
	 -	"date": "2020-02-16",
	 -	"heure": "03:48 UT"
*/

/**
 *
 * @param {string} type
 * @param {string} side default value is main
 * @description reload la vue demandé par l'utilisateur
 */
let refreshTime;
async function reload(type, side = "main") {
	/** Je fetch les information dont j'ai besoins */
	let tmp = new Date();
	const response = await fetch(
		"http://134.171.180.58/assets/config/config.json"
		//"http://127.0.0.1:5500/assets/config/config.json"
		//"https://live.neos360.com/eso/paranal/alpaca/assets/config/config.json"
	);

	const { json, serveur } = await response.json();

	let urlImg = "";
	if (serveur.isProd === false) {
		urlImg = serveur.urlDev + json.images;
	} else {
		urlImg = serveur.urlProd + json.images;
	}
	let urlCoords = "";
	if (serveur.isProd === false) {
		urlCoords = serveur.urlDev + json.coords;
	} else {
		urlCoords = serveur.urlProd + json.coords;
	}
	console.log(urlImg);
	const images = await fetch(urlImg);
	// const coords = await fetch(urlCoords);

	/** Je les transformes en JSON */
	const displayImage = await images.json();

	// const tcs = await coords.json();

	// Je load la 1er image avec les paramètres par défaut.
	const view = loadView(
		getItem(`type-${side}`),
		side,
		displayImage,
		getItem(`brightness-${side}`),
		getItem(`contrast-${side}`),
		getItem(`invert-${side}`),
		getItem(`reglage-${side}`)
	);

	// if (type === "lastImage" || type === "lastSubstractionImage") {
	// 	const viewCoords = loadCoords(tcs.img, side);
	// }

	// const date = dateImage(getItem(`type-${side}`), side);

	/**
	 * Ici, en plus de load mon composant IMAGE
	 * je dois aussi ajouter les filtres
	 */
	if (
		type === "lastImage" ||
		type === "lastSubstractionImage" ||
		type === "panorama"
	) {
		const IMG = document.querySelectorAll("#img");
		IMG.forEach((img) => {
			if (img.name === `img-${side}`) {
				addFilter(
					img,
					getItem(`brightness-${side}`),
					getItem(`contrast-${side}`),
					getItem(`invert-${side}`)
				);
			}
		});
	}
	/** Get TIMER */
	const refresh = json.timer;
	let refreshEnabled = document.querySelector(`#${side} #checkbox-${side}`);
	// /** Get event if button changed */
	const createInterval = () => {
		if (side === "rightSide") {
			clearInterval(window.refreshTime);
			window.refreshTime = setInterval(changeOnInterval, refresh);
		} else if (side === "leftSide") {
			clearInterval(window.refreshTime1);
			window.refreshTime1 = setInterval(changeOnInterval, refresh);
		} else {
			clearInterval(window.refreshTime2);
			window.refreshTime2 = setInterval(changeOnInterval, refresh);
		}
	};
	const changeOnInterval = () => {
		console.log("je reload");
		loadView(
			getItem(`type-${side}`),
			side,
			displayImage,
			getItem(`brightness-${side}`),
			getItem(`contrast-${side}`),
			getItem(`invert-${side}`)
		);

		// if (type === "lastImage" || type === "lastSubstractionImage") {
		// 	loadCoords(tcs.img, side);
		// }

		// dateImage(getItem(`type-${side}`), side);
	};

	if (refreshEnabled.checked) {
		createInterval();
	} else {
		clearInterval(window.refreshTime);
	}
}

const SIDES = document.querySelectorAll(".side");

if (SIDES.length === 0) {
	reload(getItem("type-main"));
} else {
	SIDES.forEach((side) => {
		if (side.id === "leftSide") {
			reload(getItem("type-leftSide"), side.id);
		} else {
			reload(getItem("type-rightSide"), side.id);
		}
	});
}
