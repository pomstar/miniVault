import SceneManager from "./core/SceneManager";

async function Start() {
	const sceneManager = SceneManager.getInstance();

	await sceneManager.switchScene("Loading");

	await sceneManager.switchScene("Minigame").then((scene) => {
		const resize = (function() {

            let ratio = Math.min(
                window.innerWidth   / scene.width, 
                window.innerHeight  / scene.height
            );

            scene.width  *= ratio;
            scene.height *= ratio;

            scene.x = (window.innerWidth - scene.width) / 2;
            scene.y = (window.innerHeight - scene.height) / 2;

        });

        resize();

        window.addEventListener('resize', resize);
	});

}

Start();


