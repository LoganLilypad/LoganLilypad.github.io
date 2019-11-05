window.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('canvas');

    var engine = new BABYLON.Engine(canvas, true);
    var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        
        scene.clearColor = new BABYLON.Color3(.3,.3,.8);
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(-37, 58, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas,true);

        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68);

        var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.inclination = 0;

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        skybox.material = skyboxMaterial;
        scene.ambientColor = new BABYLON.Color3(1, 1, 1);

        var box = BABYLON.Mesh.CreateBox("Box",4.0,scene);

        var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);

        BABYLON.SceneLoader.ImportMesh("", "./models/lobby/", "lobby.babylon", scene, function (mesh) {
            mesh[0].name = "test";
            mesh[0].material.specularColor = new BABYLON.Color3(0, 0, 0);
            mesh[0].material.ambientColor = new BABYLON.Color3(1, 1, 1);
            mesh[0].material.diffuseTexture.hasAlpha = true;
        });

        return scene;
    }

    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    });
});
