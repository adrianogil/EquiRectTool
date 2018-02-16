class GLMeshObject extends GLObject
{
    constructor(objectname)
    {
        super(objectname)

        this.mainTexture = null;

        this.vertices = [];
        this.triangles = [];

        this.uvs = [];

        this.buffers = {};
        this.bufferData = [];

        this.bufferPositionName = "aVertexPosition";
        this.bufferUVName = "aTextureCoord";

        this.attribNames = [this.bufferPositionName];
        this.uniformNames = ["uModelViewMatrix", "uProjectionMatrix", "uNormalMatrix"];

        this.material = null;
    }

    onStart(gl)
    {
        super.onStart(gl);

        this.generateMaterial();

        this.createBuffers(gl);

        this.material.onStart(gl);
    }

    addTexture(textureObj)
    {
        this.mainTexture = textureObj;
    }

    generateMaterial()
    {
        if (this.material == null)
        {
            if (this.uvs.length > 0)
            {
                this.material = new GLMaterial(this.attribNames.concat(this.bufferUVName),
                      this.uniformNames, this.mainTexture);
            } else
            {
                this.material = new GLMaterial(this.attribNames, this.uniformNames, this.mainTexture);
            }
        }
    }

    addAttribBufferData(bufferName, bufferData, bufferComponentsSize)
    {
        this.bufferData = this.bufferData.concat(
            {
              "name" : bufferName,
              "data" : bufferData,
              "size" : bufferComponentsSize
            }
          );
        this.attribNames = this.attribNames.concat(
            bufferName
          );
    }

    enableBuffers(gl)
    {
        this.buffers[this.bufferPositionName].enableBuffer(gl,
              this.material.getAttrib(this.bufferPositionName));
        this.buffers["triangles"].enableBuffer(gl);

        if (this.uvs.length > 0)
        {
            this.buffers[this.bufferUVName].enableBuffer(gl,
              this.material.getAttrib(this.bufferUVName));
        }

        const totalBufferData = this.bufferData.length;

        for (var i = 0; i < totalBufferData; i++)
        {
            if (this.material.getAttrib(this.bufferData[i].name) != -1) {
              this.buffers[this.bufferData[i].name].enableBuffer(gl,
              this.material.getAttrib(this.bufferData[i].name));
            }

        }
    }

    draw(gl)
    {
        super.draw(gl);

        this.enableBuffers(gl);

        this.material.enableMaterial(gl);

        // Set the shader uniform
        gl.uniformMatrix4fv(
        this.material.getUniform("uProjectionMatrix"),
        false,
        GLManager.projectionMatrix
        );
      gl.uniformMatrix4fv(
        this.material.getUniform("uModelViewMatrix"),
        false,
        this.getModelViewMatrix(gl)
        );

      const normalMatrix = mat4.create();
      mat4.invert(normalMatrix, this.getModelViewMatrix(gl));
      mat4.transpose(normalMatrix, normalMatrix);

      gl.uniformMatrix4fv(
      this.material.getUniform("uNormalMatrix"),
      false,
      normalMatrix);

      {
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        const vertexCount = this.triangles.length;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
      }
    }

    onFrameBegin(gl)
    {
        super.onFrameBegin(gl);
    }

    getVerticesData()
    {
        var verticeData = []

        const totalVertices = this.vertices.length;

        for (var i = 0; i < totalVertices; i++)
        {
            verticeData = verticeData.concat(
                    this.vertices[i].x,
                    this.vertices[i].y,
                    this.vertices[i].z
                );
        }

        return verticeData;
    }

    createBuffers(gl)
    {
        // Create buffers for vertices
        this.buffers[this.bufferPositionName] = new GLBuffer(
            gl.ARRAY_BUFFER,
            gl.FLOAT,
            3
            );
        this.buffers[this.bufferPositionName].createBuffer(gl, this.getVerticesData());

        // Create buffers for triangles
        this.buffers["triangles"] = new GLBuffer(
            gl.ELEMENT_ARRAY_BUFFER
            );
        this.buffers["triangles"].createBuffer(gl, this.triangles);

        // Create buffers for UVs
        if (this.uvs.length > 0)
        {
            this.buffers[this.bufferUVName] = new GLBuffer(
              gl.ARRAY_BUFFER,
              gl.FLOAT,
              2
            );
            this.buffers[this.bufferUVName].createBuffer(gl, this.uvs);
        }

        const totalBufferData = this.bufferData.length;

        for (var i = 0; i < totalBufferData; i++)
        {
            this.buffers[this.bufferData[i].name] = new GLBuffer(
                gl.ARRAY_BUFFER,
                gl.FLOAT,
                this.bufferData[i].size
              )
            this.buffers[this.bufferData[i].name].createBuffer(gl, this.bufferData[i].data);
        }
    }

    getModelViewMatrix(gl)
    {
        // Set the drawing position to the 'identity' point, which is
          // the center of the scene
          const modelViewMatrix = mat4.create();

          // Now move the drawing position a bit to where we want to
          // start drawing the square
          mat4.translate(modelViewMatrix,    // destination matrix
                         modelViewMatrix,    // matrix to translate
                         [this.transform.position.x,
                         this.transform.position.y,
                         this.transform.position.z]); // amount to translate

          mat4.rotate(modelViewMatrix,       // destination matrix
                      modelViewMatrix,       // matrix to rotate
                      this.transform.rotation.x,        // amount to rotate in radians
                      [1, 0, 0]              // axis to rotate around
          );

          mat4.rotate(modelViewMatrix,       // destination matrix
                      modelViewMatrix,       // matrix to rotate
                      this.transform.rotation.y,        // amount to rotate in radians
                      [0, 1, 0]              // axis to rotate around
          );

          mat4.rotate(modelViewMatrix,       // destination matrix
                      modelViewMatrix,       // matrix to rotate
                      this.transform.rotation.z,        // amount to rotate in radians
                      [0, 0, 1]              // axis to rotate around
          );

          this.modelViewMatrix = modelViewMatrix;

          return modelViewMatrix;
    }
}