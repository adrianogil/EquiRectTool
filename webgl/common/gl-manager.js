function onGLAnimationFrame(now)
{
    GLManager.onAnimationFrame(now);
}

var GLManager = new function()
{
    this.currentScene = null;
    this.paused = false;
    this.gl = null;
    this.projectionMatrix = null;

    this.onAnimationFrame = function(now)
    {
        now *= 0.001;   // convert to seconds
        GLTime.deltaTime = now - GLTime.time;
        GLTime.time = now;

        if (this.gl != null && this.currentScene != null) {
            this.currentScene.draw(this.gl);
        }

        if (!this.paused) {
            requestAnimationFrame(onGLAnimationFrame);
        }
    };

    this.pause = function()
    {
        this.paused = true;
    };

    this.onStart = function()
    {
        if (this.gl != null && this.currentScene != null) {
            this.currentScene.onStart(this.gl);
        }
    }

    this.run = function()
    {
        this.paused = false;
        if (this.gl != null && this.currentScene != null) {
            this.onStart();
            requestAnimationFrame(onGLAnimationFrame);
        }
    };

    this.getGLFromSelector = function(glSelector) {
        const canvas = document.querySelector("#glcanvas");
        // Initialize the GL context
        this.gl = canvas.getContext("webgl");
        // Only continue if WebGL is available and working
        if (!this.gl) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return false;
        }

        return true;
    };
}