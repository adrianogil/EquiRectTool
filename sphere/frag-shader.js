function getFragmentShader()
{
    const fsSource = `
        varying highp vec2 vTextureCoord;

        uniform sampler2D _MainTex;

        void main(void) {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `;
    return fsSource;
}