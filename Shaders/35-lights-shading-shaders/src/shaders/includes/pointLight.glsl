vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay) {
    // light is comign from an infintely small point, and has decay
    // light that is closer will have more intensity, further - less
    vec3 lightDelta = lightPosition - position; // distance between light and the surface
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = -dot(lightReflection, viewDirection);
    specular = pow(max(0.0, specular), specularPower);

    // Decay
    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);
    // decay is not remotely close to how a PBR works
    return lightColor 
           * decay     
           * lightIntensity 
           * shading 
           + lightColor 
           * specular 
           * lightIntensity;
}
