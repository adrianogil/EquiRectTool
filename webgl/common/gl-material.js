class GLMaterial
{
    constructor(attribNames, uniformNames, mainTexture)
    {
        this.vertexShaderSource = getVertexShader();
        this.fragmentShaderSource = getFragmentShader();

        this.gl = null;
        this.shaderProgram = null;

        this.attribNames = attribNames;
        this.uniformNames = uniformNames;

        this.attribLocations = {};
        this.uniformLocations = {};

        this.textureUniformName = "_MainTex";
        this.mainTexture = mainTexture;
    }

    onStart(gl)
    {
        this.gl = gl;
        this.shaderProgram = this.initShaderProgram(this.vertexShaderSource, this.fragmentShaderSource);

        const totalAttribs = this.attribNames.length;

        for (var i = 0; i < totalAttribs; i++)
        {
            this.attribLocations[this.attribNames[i]] =
                gl.getAttribLocation(this.shaderProgram, this.attribNames[i]);
        }

        const totalUniforms = this.uniformNames.length;

        for (var i = 0; i < totalUniforms; i++)
        {
            this.uniformLocations[this.uniformNames[i]] =
                gl.getUniformLocation(this.shaderProgram, this.uniformNames[i]);
        }

        // Texture
        if (this.mainTexture != null)
        {
            this.uniformLocations[this.textureUniformName] =
                    gl.getUniformLocation(this.shaderProgram, this.textureUniformName);
                this.mainTexture.loadTexture(gl);
        }
    }

    // enableMaterial
    //   -> Called every frame
    enableMaterial(gl)
    {
        // Tell WebGL to use our program when drawing
        gl.useProgram(this.shaderProgram);

        if (this.mainTexture != null)
        {
            this.mainTexture.activeTexture(gl,
              this.uniformLocations[this.textureUniformName]);
        }

    }

    getAttrib(name)
    {
        return this.attribLocations[name];
    }

    getUniform(name)
    {
        return this.uniformLocations[name];
    }

    loadShader(type, source) {
      const shader = this.gl.createShader(type);

      // Send the source to the shader object
      this.gl.shaderSource(shader, source);

      // Compile the shader program
      this.gl.compileShader(shader);

      // See if it compiled successfully
      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    //
    // Initialize a shader program, so WebGL knows how to draw our data
    //
    initShaderProgram(vsSource, fsSource)
    {
      const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);

      // Create the shader program
      const shaderProgram = this.gl.createProgram();
      this.gl.attachShader(shaderProgram, vertexShader);
      this.gl.attachShader(shaderProgram, fragmentShader);
      this.gl.linkProgram(shaderProgram);

      // If creating the shader program failed, alert
      if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      return shaderProgram;
    }
}