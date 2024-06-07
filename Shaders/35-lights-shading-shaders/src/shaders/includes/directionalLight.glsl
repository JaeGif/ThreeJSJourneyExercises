// directinal light reacts to normals

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower) {

    // glsl has a reflect function using direction and the normal
    
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // shading || clamp so dot result does not go below 0
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    // when light reflection incident aligns with the angle of camera
    // you get some flare of light. This is specular
    float specular = -dot(lightReflection, viewDirection);
    specular = pow(max(0.0, specular), specularPower);

    return lightColor 
           * lightIntensity 
           * shading 
           + lightColor 
           * specular 
           * lightIntensity;

}