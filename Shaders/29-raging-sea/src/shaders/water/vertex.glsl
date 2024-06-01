


void main() {
    vec4 modelPostion = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPostion;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}