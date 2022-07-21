uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uLightDirection;
uniform vec3 uLightDiffuse;
uniform vec3 uMaterialDiffuse;

in vec3 aVertexPosition;
in vec3 aVertexNormal;

out vec4 vVertexColor;

void main(void) {
    vec3 normal = normalize(vec3(uNormalMatrix * vec4(aVertexNormal, 1.0)));

    vec3 lightDirection = normalize(uLightDirection);

    float LamvertianTerm = dot(normal, -lightDirection);

    vVertexColor = vec4(uMaterialDiffuse * uLightDiffuse * LamvertianTerm, 1.0);

    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
}

