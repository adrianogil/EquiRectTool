class GLBuffer
{
    constructor(gltype, bufferType, numComponents)
    {
        this.buffer = null;
        this.gltype = gltype;

        this.numComponents = numComponents;   // pull out 2 values per iteration
        this.dataType = bufferType;               // the data in the buffer is 32bit floats
        this.normalize = false;               // don't normalize
        this.stride = 0;                      // how many bytes to get from one set of values to the next
                                        // 0 = use type and numComponents above
        this.offset = 0;               // how many bytes inside the buffer to start from

        this.bufferData = null;
    }

    createBuffer(gl, data)
    {
        this.bufferData = data;

        this.buffer = gl.createBuffer();
        gl.bindBuffer(this.gltype, this.buffer);
        if (this.gltype == gl.ELEMENT_ARRAY_BUFFER)
        {
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(data),
                    gl.STATIC_DRAW);
        }
        else if (this.gltype == gl.ARRAY_BUFFER)
        {
            gl.bufferData(gl.ARRAY_BUFFER,
                    new Float32Array(data),
                    gl.STATIC_DRAW);
        }
    }

    enableBuffer(gl, attribLocation)
    {
        gl.bindBuffer(this.gltype, this.buffer);

        if (this.gltype == gl.ARRAY_BUFFER)
        {
            gl.vertexAttribPointer(
              attribLocation,
              this.numComponents,
              this.dataType,
              this.normalize,
              this.stride,
              this.offset
              );
            gl.enableVertexAttribArray(
              attribLocation
              );
        }
    }
}