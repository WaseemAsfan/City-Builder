
function makePrism(w, h, d, red, green, blue) {
  w = w / 2;
  h = h / 2;
  d = d / 2;
  const positions = new Float32Array([
    -w, -h,  d,  w, -h,  d,  w,  h,  d,  -w,  h,  d,
    w, -h, -d,  -w, -h, -d,  -w,  h, -d,  w,  h, -d,
    -w, h, d,  w, h, d, w, h,  -d,  -w, h,  -d,
    -w, -h, -d,  w, -h, -d, w, -h,  d,  -w, -h,  d,
    w, -h, d, w, -h, -d, w, h, -d, w,h, d,
    -w, -h, -d, -w,  -h, d, -w, h, d, -w, h, -d
  ]);

  const color = [red, green, blue];
  const colors = new Float32Array([
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,       
    4, 5, 6, 4, 6, 7,       
    8, 9, 10, 8, 10, 11,    
    12, 13, 14, 12, 14, 15, 
    16, 17, 18, 16, 18, 19, 
    20, 21, 22, 20, 22, 23  
  ]);
  const normals = new Float32Array([
    0,0,1, 0,0,1, 0,0,1, 0,0,1,
    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
    0,1,0, 0,1,0, 0,1,0, 0,1,0, 
    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, 
    1,0,0, 1,0,0, 1,0,0, 1,0,0, 
    -1,0,0, -1,0,0, -1,0,0, -1,0,0
   
    ]);
  const texCoords = new Float32Array([
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
  ]);

  return { positions, colors, indices, normals, texCoords };
}


function makeSkewedPrism(w, h, d, point1, point2, point3, point4, red, green, blue) {
  w = w / 2;
  h = h / 2;
  d = d / 2;
  const positions = new Float32Array([
    -w, -h,  (d * point1),  w, -h,  (d * point2),  w,  h,  (d * point3),  -w,  h,  (d * point4),
    w, -h, -d,  -w, -h, -d,  -w,  h, -d,  w,  h, -d,
    -w, h, (d * point4),  w, h, (d * point3), w, h,  -d,  -w, h,  -d,
    -w, -h, -d,  w, -h, -d, w, -h,  (d * point2),  -w, -h,  (d * point1),
    w, -h, (d * point2), w, -h, -d, w, h, -d, w,h, (d * point3),
    -w, -h, -d, -w,  -h, (d * point1), -w, h, (d * point4), -w, h, -d
  ]);

  const color = [red, green, blue];
  const colors = new Float32Array([
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color,
    ...color, ...color, ...color, ...color
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 0, 2, 3,       
    4, 5, 6, 4, 6, 7,       
    8, 9, 10, 8, 10, 11,    
    12, 13, 14, 12, 14, 15, 
    16, 17, 18, 16, 18, 19, 
    20, 21, 22, 20, 22, 23  
  ]);
  const normals = new Float32Array([
    0,0,1, 0,0,1, 0,0,1, 0,0,1,
    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
    0,1,0, 0,1,0, 0,1,0, 0,1,0, 
    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, 
    1,0,0, 1,0,0, 1,0,0, 1,0,0, 
    -1,0,0, -1,0,0, -1,0,0, -1,0,0
   
    ]);
  const texCoords = new Float32Array([
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
    0, 1,  1, 1, 1, 0, 0, 0,
  ]);

  return { positions, colors, indices, normals, texCoords };
}


function makePlane(w, h, red, green, blue) {
  w = w / 2;
  h = h / 2;
  
  const positions = new Float32Array([
    -w, -h, 0,  
     w, -h, 0, 
     w,  h, 0, 
    -w,  h, 0   
  ]);

  const color = [red, green, blue];
  const colors = new Float32Array([
    ...color,
    ...color,
    ...color,
    ...color
  ]);

  const indices = new Uint16Array([
    0, 1, 2, 
    0, 2, 3  
  ]);

  const normals = new Float32Array([
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1
  ]);

  const texCoords = new Float32Array([
    0, 0, 
    1, 0,
    1, 1, 
    0, 1 
  ]);

  return { positions, colors, indices, normals, texCoords };
}


// function createSphere(r, vsteps, usteps){
//   basketball_vertices = [];
//   basketball_indices = [];
//   basketball_colors = [];
//   basketball_normals = [];
//   basketball_texcoords = [];

//   for (let i=0; i<=vsteps; i++){
//     const v = i * Math.PI / vsteps;
//     const sinv = Math.sin(v);
//     const cosv = Math.cos(v);

//     for (let j=0; j<=usteps; j++){
//       const u=j * 2 * Math.PI / usteps;
//       const sinu = Math.sin(u);
//       const cosu = Math.cos(u);
//       const x = cosu * sinv * r;
//       const y = cosv * r;
//       const z = sinu * sinv * r;

//       basketball_vertices.push(x, y, z);  // Fixed: was rx, ry, rz
//       basketball_colors.push(0.9453125, 0.41015625, 0.1953125);

//       basketball_normals.push(x, y, z);
//       basketball_texcoords.push(j / usteps, 1-(i/vsteps));
//     }
//   }

//   for(let i=0; i<vsteps; i++){
//     for(let j=0; j<usteps; j++){
//       const k1 = i * (usteps + 1) + j;  // Fixed: was missing * operator
//       const k2 = (i + 1) * (usteps + 1) + j;
//       basketball_indices.push(k1, k2, k1 + 1);
//       basketball_indices.push(k2, k2+1, k1+1);
//     }
//   }
//   return {
//     positions: new Float32Array(basketball_vertices),
//     colors: new Float32Array(basketball_colors),
//     normals: new Float32Array(basketball_normals),
//     texCoords: new Float32Array(basketball_texcoords),
//     indices: new Uint16Array(basketball_indices)
//   };
// }
//=============Donut==========================================================

function createSphere(r, vsteps, usteps){
  basketball_vertices = [];
  basketball_indices = [];
  basketball_colors = [];
  basketball_normals = [];
  basketball_texcoords = [];

  let index = 0;

  for(let i=0; i<vsteps; i++){
    for(let j=0; j<usteps; j++){
      // Calculate the four corners of each quad
      const v1 = i * Math.PI / vsteps;
      const v2 = (i + 1) * Math.PI / vsteps;
      const u1 = j * 2 * Math.PI / usteps;
      const u2 = (j + 1) * 2 * Math.PI / usteps;

      // First triangle vertices
      const p1 = getVertex(r, v1, u1);
      const p2 = getVertex(r, v2, u1);
      const p3 = getVertex(r, v1, u2);

      // Second triangle vertices
      const p4 = getVertex(r, v2, u1);
      const p5 = getVertex(r, v2, u2);
      const p6 = getVertex(r, v1, u2);

      // Calculate face normal for first triangle
      const normal1 = calculateFaceNormal(p1, p2, p3);
      
      // Add first triangle
      addTriangle(p1, p2, p3, normal1, index);
      index += 3;

      // Calculate face normal for second triangle
      const normal2 = calculateFaceNormal(p4, p5, p6);
      
      // Add second triangle
      addTriangle(p4, p5, p6, normal2, index);
      index += 3;
    }
  }

  function getVertex(r, v, u){
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);
    const sinu = Math.sin(u);
    const cosu = Math.cos(u);
    
    return {
      x: cosu * sinv * r,
      y: cosv * r,
      z: sinu * sinv * r,
      u: u / (2 * Math.PI),
      v: 1 - (v / Math.PI)
    };
  }

  function calculateFaceNormal(p1, p2, p3){
    // Calculate two edge vectors
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v1z = p2.z - p1.z;
    
    const v2x = p3.x - p1.x;
    const v2y = p3.y - p1.y;
    const v2z = p3.z - p1.z;
    
    // Cross product
    const nx = v1y * v2z - v1z * v2y;
    const ny = v1z * v2x - v1x * v2z;
    const nz = v1x * v2y - v1y * v2x;
    
    // Normalize
    const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
    return {
      x: nx / length,
      y: ny / length,
      z: nz / length
    };
  }

  function addTriangle(p1, p2, p3, normal, startIndex){
    // Add vertices
    basketball_vertices.push(p1.x, p1.y, p1.z);
    basketball_vertices.push(p2.x, p2.y, p2.z);
    basketball_vertices.push(p3.x, p3.y, p3.z);
    
    // Add the same normal for all three vertices (flat shading)
    basketball_normals.push(normal.x, normal.y, normal.z);
    basketball_normals.push(normal.x, normal.y, normal.z);
    basketball_normals.push(normal.x, normal.y, normal.z);
    
    // Add colors
    basketball_colors.push(0.9453125, 0.41015625, 0.1953125);
    basketball_colors.push(0.9453125, 0.41015625, 0.1953125);
    basketball_colors.push(0.9453125, 0.41015625, 0.1953125);
    
    // Add texture coordinates
    basketball_texcoords.push(p1.u, p1.v);
    basketball_texcoords.push(p2.u, p2.v);
    basketball_texcoords.push(p3.u, p3.v);
    
    // Add indices
    basketball_indices.push(startIndex, startIndex + 1, startIndex + 2);
  }

  return {
    positions: new Float32Array(basketball_vertices),
    colors: new Float32Array(basketball_colors),
    normals: new Float32Array(basketball_normals),
    texCoords: new Float32Array(basketball_texcoords),
    indices: new Uint16Array(basketball_indices)
  };
}



function generateDonut(R, r, uStep, vStep) {
  let positions = [];
  let colors = [];
  let normals = [];
  let texCoords = [];
  let indices = [];
  
  for (let i = 0; i <= uStep; i++) {
    let u = i * 2 * Math.PI / uStep;
    for (let j = 0; j <= vStep; j++) {
      let v = j * 2 * Math.PI / vStep;
      let cosu = Math.cos(u), sinu = Math.sin(u);
      let cosv = Math.cos(v), sinv = Math.sin(v);

      let x = (R + r * cosv) * cosu;
      let y = (R + r * cosv) * sinu;
      let z = r * sinv;
      positions.push(x, y, z);

      let s = i / uStep; 
      let t = j / vStep;  
      texCoords.push(s,t);

      let rux = - (R + r * cosv) * sinu;
      let ruy =   (R + r * cosv) * cosu;
      let ruz = 0.0;

      let rvx = - r * sinv * cosu;
      let rvy = - r * sinv * sinu;
      let rvz =   r * cosv;

      let nx = ruy * rvz - ruz * rvy;
      let ny = ruz * rvx - rux * rvz;
      let nzn = rux * rvy - ruy * rvx;

      let len = Math.hypot(nx, ny, nzn);
      if (len === 0) len = 1.0;
      nx /= len; ny /= len; nzn /= len;
      normals.push(nx, ny, nzn);
      colors.push(0.5 * (nx + 1.0), 0.5 * (ny + 1.0), 0.5 * (nzn + 1.0));
    }
  }

  for (let i = 0; i < uStep; i++) {
    for (let j = 0; j < vStep; j++) {
      const k1 = (i * (vStep + 1)) + j;
      const k2 = k1 + vStep + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    normals: new Float32Array(normals),
    texCoords: new Float32Array(texCoords), // ADD THIS
    indices: new Uint16Array(indices)
  };
}


//=============Frosting========================================================
function generateFrosting(R, r, uStep, vStep) {
  let positions = [];
  let normals = [];
  let colors = [];
  let indices = [];
  let texCoords = [];
  let bumps = true;

  for (let i = 0; i <= uStep; i++) {
    let u = i * 2 * Math.PI / uStep;
    for (let j = 0; j <= vStep; j++) {
      let v = j * Math.PI / vStep;

      let cosu = Math.cos(u);
      let sinu = Math.sin(u);
      let cosv = Math.cos(v);
      let sinv = Math.sin(v);

      
      let x = (R + r * cosv) * cosu;
      let y = (R + r * cosv) * sinu;
      let z = r * sinv + 0.1; 

      // --- bump distortion ---
      let bump = 0.0;
      if (z === 0.1) { 
        if (bumps) {
          bump = -0.1;
          z += bump;
        }
        bumps = !bumps;
      }

      positions.push(x, y, z);

      let s = i / uStep; 
      let t = j / vStep;
      texCoords.push(s,t);

      let nx = cosu * cosv;
      let ny = sinu * cosv;
      let nz = sinv;

      let len = Math.hypot(nx, ny, nz);
      nx /= len; ny /= len; nz /= len;

      if (bump !== 0.0) {
        nz -= 0.2;
        let l = Math.hypot(nx, ny, nz);
        nx /= l; ny /= l; nz /= l;
      }

      normals.push(nx, ny, nz);
      colors.push(0.5 * (nx + 1.0), 0.5 * (ny + 1.0), 0.5 * (nz + 1.0));
    }
  }

  for (let i = 0; i < uStep; i++) {
    for (let j = 0; j < vStep; j++) {
      const k1 = (i * (vStep + 1)) + j;
      const k2 = k1 + vStep + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    colors: new Float32Array(colors),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices),
  };
}


////=============Sprinkle======================================================


////=============Coffee Cup======================================================
function makeCoffeeCup(r, uStep, vStep, height, red, blue, green, heightchange){
  let positions = [];
  let colors = [];
  let normals = [];
  let indices = [];
  let texCoords = [];

  for(let i = 0; i <= uStep; i++){
    let u = i * 2 * Math.PI / uStep;
    let cosu = Math.cos(u);
    let sinu = Math.sin(u);

    for(let j = 0; j <= vStep; j++){
      let v = j / vStep;
      let x = r * cosu;
      let y = r * sinu;
      let z = height * v; 

      // scales x and y after a certain z to get a nice cup shape
      if(z > heightchange){
        x *= 1.25;
        y *= 1.25;
      }

      positions.push(x, y, z);

      let nz = 1;
      colors.push(red * nz, blue * nz, green * nz);

      let texU = i / uStep;
      let texV = v;          
      texCoords.push(texU, texV);

      let nx = cosu;
      let ny = sinu;
      let nzNormal = 0;
      if(z > heightchange){
        nx *= 1.0 / 1.25;
        ny *= 1.0 / 1.25;
      }
      normals.push(nx, ny, nzNormal);
    }
  }

  for(let i = 0; i < uStep; i++){
    for(let j = 0; j < vStep; j++){
      const k1 = (i * (vStep+1)) + j;
      const k2 = k1 + vStep + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  const bottomCenterIndex = positions.length / 3;
  positions.push(0, 0, 0);
  colors.push(red, blue, green);
  normals.push(0, 0, -1); 
  texCoords.push(0.5, 0.5);

  for (let i = 0; i < uStep; i++) {
    const k1 = i * (vStep + 1);
    const k2 = ((i + 1) % uStep) * (vStep + 1);
    indices.push(bottomCenterIndex, k2, k1);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    normals: new Float32Array(normals),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices)
  }; 
}

function makeHandle(R, r, uStep, vStep){
  let positions = [];
  let colors = [];
  let normals = [];
  let texCoords = [];
  let indices = [];

  for(let i = 0; i <= uStep; i++){
    let u = i * Math.PI / uStep; // half torus
    let cosu = Math.cos(u);
    let sinu = Math.sin(u);

    for(let j = 0; j <= vStep; j++){
      let v = j * 2 * Math.PI / vStep;
      let cosv = Math.cos(v);
      let sinv = Math.sin(v);

      let x = (R + r * cosv) * cosu + 1.25;
      let y = (R + r * cosv) * sinu + 0.92;
      let z = r * sinv;

      positions.push(y, z, x); // rotated for handle

      // color
      colors.push(0.9, 0.9, 0.9);

      let s = i / uStep; 
      let t = j / vStep; 
      texCoords.push(s,t);

      let nx = cosu * cosv;
      let ny = sinv;
      let nz = sinu * cosv;
      normals.push(nx, ny, nz);
    }
  }

  for(let i = 0; i < uStep; i++){
    for(let j = 0; j < vStep; j++){
      const k1 = (i * (vStep+1)) + j;
      const k2 = k1 + vStep + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    normals: new Float32Array(normals),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices)
  }; 
}

function mergeGeometries(geomA, geomB) {
  let positions = Array.from(geomA.positions);
  let colors = Array.from(geomA.colors);
  let normals = Array.from(geomA.normals);
  let texCoords = Array.from(geomA.texCoords);
  let indices = Array.from(geomA.indices);

  let vertexOffset = geomA.positions.length / 3;

  positions.push(...geomB.positions);
  colors.push(...geomB.colors);
  normals.push(...geomB.normals);
  texCoords.push(...geomB.texCoords);

  for (let idx of geomB.indices) {
    indices.push(idx + vertexOffset);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    normals: new Float32Array(normals),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices)
  };
}


// Almost same function as cup buiit also has a top face added
function makeCoffee(r, uStep, vStep, height, red, blue, green, heightchange){
  let positions = [];
  let colors = [];
  let normals = [];
  let texCoords = [];
  let indices = [];

  for(let i = 0; i <= uStep; i++){
    let u = i * 2 * Math.PI / uStep;
    let cosu = Math.cos(u);
    let sinu = Math.sin(u);

    for(let j = 0; j <= vStep; j++){
      let v = j / vStep;

      let x = r * cosu;
      let y = r * sinu;
      let z = height * v; 

      // scale top part
      if(z > heightchange){
        x *= 1.25;
        y *= 1.25;
      }

      positions.push(x, y, z);

      // color
      colors.push(red, blue, green);
      
      let texU = i / uStep; 
      let texV = v;        
      texCoords.push(texU, texV);

      let nx = cosu;
      let ny = sinu;
      let nz = 0;
      if(z > heightchange){ 
        nx *= 1.0 / 1.25;
        ny *= 1.0 / 1.25;
      }
      normals.push(nx, ny, nz);
    }
  }

  for(let i = 0; i < uStep; i++){
    for(let j = 0; j < vStep; j++){
      const k1 = (i * (vStep+1)) + j;
      const k2 = k1 + vStep + 1;
      indices.push(k1, k2, k1 + 1);
      indices.push(k2, k2 + 1, k1 + 1);
    }
  }

  let topCenterIndex = positions.length / 3;
  positions.push(0, 0, height);
  colors.push(red, blue, green);
  normals.push(0, 0, 1); 
  texCoords.push(0.5, 0.5);

  for (let i = 0; i < uStep; i++) {
    let k1 = (i * (vStep + 1)) + vStep;
    let k2 = ((i + 1) % uStep) * (vStep + 1) + vStep;
    indices.push(topCenterIndex, k1, k2);
  }

  const bottomCenterIndex = positions.length / 3;
  positions.push(0, 0, 0);
  colors.push(red, blue, green);
  normals.push(0, 0, -1); 
  texCoords.push(0.5, 0.5);

  for (let i = 0; i < uStep; i++) {
    const k1 = i * (vStep + 1);
    const k2 = ((i + 1) % uStep) * (vStep + 1);
    indices.push(bottomCenterIndex, k2, k1);
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
    normals: new Float32Array(normals),
    texCoords: new Float32Array(texCoords),
    indices: new Uint16Array(indices)
  }; 
}
