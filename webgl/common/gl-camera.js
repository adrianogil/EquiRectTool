var GLCamera = new function()
{
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units aways from the camera
    this.fieldOfView = 45 * Math.PI / 100;   // in radians
    this.aspect = null;
    this.zNear = 0.1;
    this.zFar = 100.0;
    this.projectionMatrix = mat4.create();

    this.onFrameBegin = function(gl)
    {
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        // Note: glmatrix.js always hat the first argument
        // as the destination to receive the result.
        mat4.perspective(this.projectionMatrix,
                       this.fieldOfView,
                       this.aspect,
                       this.zNear,
                       this.zFar);
        // Only one camera per scene
        GLManager.projectionMatrix = this.projectionMatrix;
    }
}