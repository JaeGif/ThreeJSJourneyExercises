varying vec2 vUv;

void main()
{
    // pattern 3
    // float strength = vUv.y;

    // pattern 4 
    // float strength = vUv.y;

    // pattern 5
    // float strength = 1.0 - vUv.y;

    // pattern 6
    //float strength = vUv.y * 10.0;

    // pattern 7
    // float strength = mod(vUv.y * 10.0, 1.0);

    // pattern 8
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);  step is a conditional checking if a value is greater

    // pattern 9
/*     float strength = mod(vUv.y * 10.0, 1.0);
    strength = step(0.75, strength);  */

    // pattern 10
/*     float strength = mod(vUv.x * 10.0, 1.0);
    strength = step(0.75, strength); */
    
    // pattern 11
/*     float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength += step(0.8, mod(vUv.y * 10.0, 1.0)); */

    // pattern 12
/*     float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0)); */

    // pattern 13
/*     float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    strength *= step(0.8, mod(vUv.y * 10.0, 1.0)); */

    // pattern 14
/*     float x = step(0.4, mod(vUv.x * 10.0, 1.0));
    x *= step(0.8, mod(vUv.y * 10.0, 1.0));
    float y = step(0.4, mod(vUv.y * 10.0, 1.0));
    y *= step(0.8, mod(vUv.x * 10.0, 1.0));
    float strength = x + y; */

    // pattern 15
/*     float x = step(0.4, mod(vUv.x * 10.0, 1.0));
    x *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    float y = step(0.4, mod(vUv.y * 10.0, 1.0));
    y *= step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    float strength = x + y; */

    // pattern 16
    // float strength = abs(vUv.x - 0.5);

    // pattern 17
    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    
    // pattern 18
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    
    // pattern 19
    // float strength = step(.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
 
    // pattern 20
/*     float square1 = 1.0 - step(.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float square2 = step(.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    float strength = square1 * square2;
 */
    gl_FragColor = vec4(strength, strength, strength, 1.0);

}

// UV's are just numbers remember that

// (x,y) across a plane 