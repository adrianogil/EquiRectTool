Shader "Custom/Mollweide"
{
    Properties
    {
        _MainTex("Image", 2D) = "white"
    }
    Subshader
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #define PI 3.14

            sampler _MainTex;

            struct vert_input
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct vert_output
            {
                float4 vertex : SV_POSITION;
                float2 uv : TEXCOORD0;
            };

            vert_output vert(vert_input i)
            {
                vert_output o;

                o.vertex = UnityObjectToClipPos(i.vertex);
                o.uv = i.uv;

                return o;
            }

            float4 frag(vert_output o) : COLOR
            {
				float2 raduv = o.uv;
				float2 uv;

				raduv.x = raduv.x * 2 * PI;
				raduv.y = raduv.y * PI / 2;

				float theta = raduv.y;

				for (int i = 0; i < 50; i++)
				{
					theta = theta - ((2*theta + sin(2*theta) - PI * sin(raduv.y)) / (2 + 2 * cos(2 * theta)));
				}

				uv.x = (2 * sqrt(2) / PI) * (raduv.x - 0) * cos(theta);
				uv.y = sqrt(2) * sin(theta);

				uv.x = uv.x + 2*sqrt(2);
				uv.x = uv.x / (4*sqrt(2));

				uv.y = uv.y + sqrt(2);
				uv.y = uv.y / sqrt(2);

                return tex2D(_MainTex, uv);
            }

            ENDCG
        }
    }
}