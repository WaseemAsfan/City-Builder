let vbo, nbo, ibo, tbo;
let uTexLoc, texCoordLoc, normalLoc;
// Buffers
function initBuffers(shape) {
    let texbuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texbuff);
    gl.bufferData(gl.ARRAY_BUFFER, shape.texCoords, gl.STATIC_DRAW);

    let posbuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posbuff);
    gl.bufferData(gl.ARRAY_BUFFER, shape.positions, gl.STATIC_DRAW);

    let colbuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colbuff);
    gl.bufferData(gl.ARRAY_BUFFER, shape.colors, gl.STATIC_DRAW);

    let indbuff = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indbuff); 
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, shape.indices, gl.STATIC_DRAW);

    let normbuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normbuff);
    gl.bufferData(gl.ARRAY_BUFFER, shape.normals, gl.STATIC_DRAW);
    return {
    texbuff : texbuff,
    posbuff : posbuff,
    colbuff : colbuff,
    indbuff : indbuff,
    normbuff : normbuff
    };
}
function initTexture(url){
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set a 1x1 white pixel as placeholder while image loads
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([255, 255, 255, 255]));

    const image = new Image();
    image.src = url
    image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    }
    return texture;
}

let count = -1;

function addGeometry(shape, texUrl, bumpUrl, material, bumpStrength){
    let buffs = initBuffers(shape);
    let texture = initTexture(texUrl);
    let bumpTexture = initTexture(bumpUrl);
    count ++;
    return{
    posbuff : buffs.posbuff,
    colbuff : buffs.colbuff,
    indbuff : buffs.indbuff,
    texbuff : buffs.texbuff,
    normbuff : buffs.normbuff,
    transformations : mat4Identity(),
    indicelen : shape.indices.length,
    texture : texture,
    bumpTexture : bumpTexture,
    material : material,
    bumpStrength : bumpStrength,
    textcount : count
    };
}
function makeMaterial(a,d,s,alph){
    return{
    ka: a,    // Ambient
    kd: d,    // Diffuse
    ks: s,    // Specular
    alpha: alph // Shininess
    };
};

function createNode(drawFunc, shapeGeometry) {
    let node = {
    translation: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    localTransform: mat4Identity(),
    drawFunc: drawFunc,
    children: [],
    shapeGeometry : shapeGeometry
    };

    return node;
}
//function to add a child node to a parent node
function addChild(parent, child) {
    parent.children.push(child);
}

//DFS structure to go through apply transformations and draw each node
function drawNode(gl, node, parentMatrix) {
    const transform = multiplyMat4(
    translationMatrix(node.translation),
    multiplyMat4(rotationMatrix(node.rotation), scaleMatrix(node.scale))
    );
    const worldMatrix = multiplyMat4(parentMatrix, transform);
    gl.uniformMatrix4fv(uMTM, false, multiplyMat4(worldMatrix, node.localTransform));
    node.drawFunc(gl, node.shapeGeometry);
    for (let child of node.children)
    drawNode(gl, child, worldMatrix);
}

function drawfunc(gl, shapeGeometry){
    let i = shapeGeometry.textcount;
    gl.uniform1f(uKaLoc, shapeGeometry.material.ka);
    gl.uniform1f(uKdLoc, shapeGeometry.material.kd);
    gl.uniform1f(uKsLoc, shapeGeometry.material.ks);
    gl.uniform1f(uAlphaLoc, shapeGeometry.material.alpha);
    gl.uniform1f(uBumpStrengthLoc, shapeGeometry.bumpStrength);

    gl.activeTexture(gl.TEXTURE0 + i); //unit is 0, 1, 2 ...
    gl.bindTexture(gl.TEXTURE_2D, shapeGeometry.texture);
    gl.uniform1i(uTexLoc,0 + i);

    gl.activeTexture(gl.TEXTURE1 + i);
    gl.bindTexture(gl.TEXTURE_2D, shapeGeometry.bumpTexture);
    gl.uniform1i(uBumpTexLoc, 1+i);

    gl.bindBuffer(gl.ARRAY_BUFFER, shapeGeometry.texbuff);
    gl.enableVertexAttribArray(texCoordLoc);
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, shapeGeometry.posbuff);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, shapeGeometry.colbuff);
    gl.enableVertexAttribArray(colorLoc);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shapeGeometry.indbuff);

    gl.bindBuffer(gl.ARRAY_BUFFER, shapeGeometry.normbuff);
    gl.enableVertexAttribArray(normalLoc);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    // gl.uniformMatrix4fv(uMTM, false, shapeGeometry.transformations);
    gl.drawElements(gl.TRIANGLES, shapeGeometry.indicelen, gl.UNSIGNED_SHORT, 0);
}
    
