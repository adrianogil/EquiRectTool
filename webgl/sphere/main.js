
function main()
{
    GLManager.getGLFromSelector("#glcanvas");

    var scene = new GLScene("Teste");
    scene.transparentMode = false;
    scene.backgroundColor = new GLColor(0.3, 0.4, 0.5, 1.0);

    // var p = new Vector3(1,1,0);
    // var v1 = new Vector3(2,0,0);
    // var v2 = new Vector3(1,2,0);
    // var v3 = new Vector3(0,0,1);

    // var cube = new GLMeshObject("cube");
    // MeshBuilder.createCube(cube, p, v1, v2, v3);
    // cube.transform.position.z += 5;
    // scene.addObject(cube);

    var sphere = new GLMeshObject("Sphere");
    Sphere.create(sphere, 1.0);
    sphere.transform.position.z += 5;
    scene.addObject(sphere);

    GLManager.currentScene = scene;
    GLManager.run();
}