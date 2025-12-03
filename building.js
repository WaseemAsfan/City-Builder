function addChild(parent, child) {
    parent.children.push(child);
}
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
}
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
function addChild(parent, child) {
    parent.children.push(child);
}
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

function translationMatrix(t) {
  let m = mat4Identity();
  m[12] = t[0];
  m[13] = t[1];
  m[14] = t[2];
  return m;
}

// Scale matrix from [sx, sy, sz]
function scaleMatrix(s) {
  let m = mat4Identity();
  m[0] = s[0];
  m[5] = s[1];
  m[10] = s[2];
  return m;
}

// Rotation matrix from [rx, ry, rz] in radians
function rotationMatrix(r) {
  let cx = Math.cos(r[0]), sx = Math.sin(r[0]);
  let cy = Math.cos(r[1]), sy = Math.sin(r[1]);
  let cz = Math.cos(r[2]), sz = Math.sin(r[2]);

  // Rotation X
  let Rx = mat4Identity();
  Rx[5] = cx; Rx[6] = sx;
  Rx[9] = -sx; Rx[10] = cx;

  // Rotation Y
  let Ry = mat4Identity();
  Ry[0] = cy; Ry[2] = -sy;
  Ry[8] = sy; Ry[10] = cy;

  // Rotation Z
  let Rz = mat4Identity();
  Rz[0] = cz; Rz[1] = sz;
  Rz[4] = -sz; Rz[5] = cz;

  // Combined rotation: Rz * Ry * Rx
  return multiplyMat4(multiplyMat4(Rz, Ry), Rx);
}


let bumps = ["textures/bricktex.png","textures/flackwall.png"];
let buildingtexts = ["textures/bluebuild.png", "textures/redbuild.png", "textures/graybuild.png", "textures/greenbuild.png", "textures/purplebuild.png"];
let buildingMat = makeMaterial(0.3, 0.7, 0.1, 3);

let glasstex = "textures/glasstex.png";
let glassmat = makeMaterial(0.3, 0.5, 0.95, 40);

let metaltex = "";
let metalmat = makeMaterial(0.3, 0.5, 0.95, 70);

let bushtex = "textures/bushtex.png";
let bushmat = makeMaterial(0.3, 0.8, 0.2, 4);

let stonetex = "textures/stone.png";
let stonemat = makeMaterial(0.3, 0.9, 0.1, 4);

let overhangtex = "textures/stone.png";
let overhangmat = makeMaterial(0.3, 0.7, 0.3, 4);

let shadetex = ["textures/redshade.png","textures/blueshade.png","textures/orangeshade.png","textures/purpleshade.png","textures/greenshade.png"];
let shademat = makeMaterial(0.3, 0.7, 0.4, 10);

let railingtex = "textures/railingtex.png";

let roadtex = "textures/road.png";
let roadmat = makeMaterial(0.3, 0.6, 0.1, 4);

let venttex = "textures/venttex.png";
let actex = "textures/Actex.png";

let signtex = "textures/sign.png"

function createbuilding1Model() {
    let building1Geometries = [];
    let buildingBase;
    let tex = buildingtexts[Math.floor(Math.random() * buildingtexts.length)];
    let bump = bumps[Math.floor(Math.random() * bumps.length)];
    building1Geometries.push(addGeometry(makePrism(1,2,1, 0,0,0), tex, bump, buildingMat, 3));
    building1Geometries.push(addGeometry(makePrism(1.1,0.1,1.1, 0,0,0), stonetex, stonetex, stonemat, 2));
    building1Geometries.push(addGeometry(makePrism(0.6,0.04,0.2, 0,0,0), stonetex, stonetex, stonemat, 2));
    building1Geometries.push(addGeometry(makePrism(0.95,0.4,0.2, 0,0,0), bushtex, bushtex, bushmat, 10));

    buildingBase = createNode((gl) => drawfunc(gl, building1Geometries[0]), building1Geometries[0]);  
    let buildingtopper = createNode((gl) => drawfunc(gl, building1Geometries[1]), building1Geometries[1]);
    buildingtopper.translation = [0,1,0];

    let window1 = makeWindow();
    window1.translation = [-0.2,0.4,0.5];
    let window2 = makeWindow();
    window2.translation = [-0.2,0.4,-0.5];

    let window3 = makeWindow();
    window3.rotation = [0,Math.PI/2, 0];
    window3.translation = [-0.5, -0.4, -0.2];

    let window4 = makeWindow();
    window4.rotation = [0,Math.PI/2, 0];
    window4.translation = [-0.5, -0.4, 0.2];

    let window5 = makeWindow();
    window5.rotation = [0,Math.PI/2, 0];
    window5.translation = [0.5, -0.4, -0.2];

    let window6 = makeWindow();
    window6.rotation = [0,Math.PI/2, 0];
    window6.translation = [0.5, -0.4, 0.2];

    let window7 = makeWindow();
    window7.rotation = [0,Math.PI/2, 0];
    window7.translation = [0.5, 0.4, -0.2];

    let window8 = makeWindow();
    window8.rotation = [0,Math.PI/2, 0];
    window8.translation = [0.5, 0.4, 0.2];

    let shade1 = makeShade(0.6, 0.1);
    shade1.translation = [0,-0.2,0.5];

    let shade2 = makeShade(0.6, 0.1);
    shade2.rotation = [0,Math.PI, 0];
    shade2.translation = [0,-0.2,-0.5];

    let shade3 = makeShade(0.6, 0.1);
    shade3.rotation = [0,-Math.PI/2, 0];
    shade3.translation = [-0.5,0.75,0];

    let door1 = makeDoor(0.5, 0.5);
    door1.translation = [0,-0.55,0.5];

    let door2 = makeDoor(0.5, 0.5);
    door2.translation = [0,-0.55,-0.5];

    let stair1 = makeStairs(1);
    stair1.translation = [0,-0.9,0.525];

    let stair2 = makeStairs(1);
    stair2.rotation = [0, Math.PI, 0];
    stair2.translation = [0,-0.9,-0.525];

    let rails = makeRails(0.6, 0.2);
    rails.rotation = [0,-Math.PI/2,0];
    rails.translation =[-0.48, 0.25,0];

    let rails2 = makeRails(1, 1);
    rails2.translation =[0, 1.135,-0.5];

    let balcony = createNode((gl) => drawfunc(gl, building1Geometries[2]), building1Geometries[2]);
    balcony.rotation = [0,-Math.PI/2,0];
    balcony.translation =[-0.585, 0.135,0];

    let bush1 = createNode((gl) => drawfunc(gl, building1Geometries[3]), building1Geometries[3]);
    bush1.rotation = [0,Math.PI/2,0];
    bush1.translation =[-0.6, -0.8,0];

    let bush2 = createNode((gl) => drawfunc(gl, building1Geometries[3]), building1Geometries[3]);
    bush2.rotation = [0,-Math.PI/2,0];
    bush2.translation =[0.6, -0.8,0];

    addChild(buildingBase, buildingtopper);
    addChild(buildingBase, window1);
    addChild(buildingBase, window2);
    addChild(buildingBase, window3);
    addChild(buildingBase, window4);
    addChild(buildingBase, window5);
    addChild(buildingBase, window6);
    addChild(buildingBase, window7);
    addChild(buildingBase, window8);
    addChild(buildingBase, shade1);
    addChild(buildingBase, shade2);
    addChild(buildingBase, shade3);
    addChild(buildingBase, door1);
    addChild(buildingBase, door2);
    addChild(buildingBase, stair1);
    addChild(buildingBase, stair2);
    addChild(buildingBase, rails);
    addChild(buildingBase, rails2);
    addChild(buildingBase, balcony);
    addChild(buildingBase, bush1);
    addChild(buildingBase, bush2);
    
    buildingBase.translation = [0,1,0];
    return buildingBase;
}

function createbuilding2Model() {
    let building1Geometries = [];
    let buildingBase;
    let tex = buildingtexts[Math.floor(Math.random() * buildingtexts.length)];
    let bump = bumps[Math.floor(Math.random() * bumps.length)];
    building1Geometries.push(addGeometry(makePrism(1,2,1, 0,0,0), tex, bump, buildingMat, 3));
    building1Geometries.push(addGeometry(makePrism(1.1,0.1,1.1, 0,0,0), stonetex, stonetex, stonemat, 2));
    building1Geometries.push(addGeometry(makePrism(0.15,0.15,0.15, 0,0,0), venttex, venttex, metalmat, 3));
    building1Geometries.push(addGeometry(makePrism(0.2,0.2,0.2, 0,0,0), actex, actex, buildingMat, 3));

    buildingBase = createNode((gl) => drawfunc(gl, building1Geometries[0]), building1Geometries[0]);  
    let buildingtopper = createNode((gl) => drawfunc(gl, building1Geometries[1]), building1Geometries[1]);
    buildingtopper.translation = [0,1,0];

    let window1 = makeWindow();
    window1.translation = [-0.25,0.2,0.5];
    let window2 = makeWindow();
    window2.translation = [0.25,0.2,0.5];
    let window3 = makeWindow();
    window3.translation = [-0.25,0.65,0.5];
    let window4 = makeWindow();
    window4.translation = [0.25,0.65,0.5];

    let window5 = makeWindow();
    window5.translation = [-0.25,0.2,-0.5];
    let window6 = makeWindow();
    window6.translation = [0.25,0.2,-0.5];
    let window7 = makeWindow();
    window7.translation = [-0.25,0.65,-0.5];
    let window8 = makeWindow();
    window8.translation = [0.25,0.65,-0.5];

    let window9 = makeWindow();
    window9.rotation = [0,Math.PI/2,0];
    window9.translation = [0.5,0.2,-0.25];
    let window10 = makeWindow();
    window10.rotation = [0,Math.PI/2,0];
    window10.translation = [0.5,0.2,0.25];
    let window11 = makeWindow();
    window11.rotation = [0,Math.PI/2,0];
    window11.translation = [0.5,0.65,-0.25];
    let window12 = makeWindow();
    window12.rotation = [0,Math.PI/2,0];
    window12.translation = [0.5,0.65,0.25];
    let window13 = makeWindow();
    window13.rotation = [0,Math.PI/2,0];
    window13.translation = [0.5,-0.25,-0.25];
    let window14 = makeWindow();
    window14.rotation = [0,Math.PI/2,0];
    window14.translation = [0.5,-0.25,0.25];
    let window15 = makeWindow();
    window15.rotation = [0,Math.PI/2,0];
    window15.translation = [0.5,-0.7,-0.25];
    let window16 = makeWindow();
    window16.rotation = [0,Math.PI/2,0];
    window16.translation = [0.5,-0.7,0.25];

    let window17 = makeWindow();
    window17.rotation = [0,Math.PI/2,0];
    window17.translation = [-0.5,0.2,-0.25];
    let window18 = makeWindow();
    window18.rotation = [0,Math.PI/2,0];
    window18.translation = [-0.5,0.2,0.25];
    let window19 = makeWindow();
    window19.rotation = [0,Math.PI/2,0];
    window19.translation = [-0.5,0.65,-0.25];
    let window20 = makeWindow();
    window20.rotation = [0,Math.PI/2,0];
    window20.translation = [-0.5,0.65,0.25];
    let window21 = makeWindow();
    window21.rotation = [0,Math.PI/2,0];
    window21.translation = [-0.5,-0.25,-0.25];
    let window22 = makeWindow();
    window22.rotation = [0,Math.PI/2,0];
    window22.translation = [-0.5,-0.25,0.25];
    let window23 = makeWindow();
    window23.rotation = [0,Math.PI/2,0];
    window23.translation = [-0.5,-0.7,-0.25];
    let window24 = makeWindow();
    window24.rotation = [0,Math.PI/2,0];
    window24.translation = [-0.5,-0.7,0.25];

    let shade1 = makeShade(0.6, 0.1);
    shade1.translation = [0,-0.2,0.5];

    let shade2 = makeShade(0.6, 0.1);
    shade2.rotation = [0,Math.PI, 0];
    shade2.translation = [0,-0.2,-0.5];

    let door1 = makeDoor(0.5, 0.5);
    door1.translation = [0,-0.55,0.5];

    let door2 = makeDoor(0.5, 0.5);
    door2.translation = [0,-0.55,-0.5];

    let stair1 = makeStairs(1);
    stair1.translation = [0,-0.9,0.525];

    let stair2 = makeStairs(1);
    stair2.rotation = [0, Math.PI, 0];
    stair2.translation = [0,-0.9,-0.525];

    let vent = createNode((gl) => drawfunc(gl, building1Geometries[2]), building1Geometries[2]);
    vent.translation = [0.35, 1.125, -0.35];
    let ac = createNode((gl) => drawfunc(gl, building1Geometries[3]), building1Geometries[3]);
    ac.translation = [-0.25, 1.15, 0.25];

    addChild(buildingBase, buildingtopper);
    addChild(buildingBase, window1);
    addChild(buildingBase, window2);
    addChild(buildingBase, window3);
    addChild(buildingBase, window4);
    addChild(buildingBase, window5);
    addChild(buildingBase, window6);
    addChild(buildingBase, window7);
    addChild(buildingBase, window8);
    addChild(buildingBase, window9);
    addChild(buildingBase, window10);
    addChild(buildingBase, window11);
    addChild(buildingBase, window12);
    addChild(buildingBase, window13);
    addChild(buildingBase, window14);
    addChild(buildingBase, window15);
    addChild(buildingBase, window16);
    addChild(buildingBase, window17);
    addChild(buildingBase, window18);
    addChild(buildingBase, window19);
    addChild(buildingBase, window20);
    addChild(buildingBase, window21);
    addChild(buildingBase, window22);
    addChild(buildingBase, window23);
    addChild(buildingBase, window24);
    addChild(buildingBase, shade1);
    addChild(buildingBase, shade2);
    addChild(buildingBase, door1);
    addChild(buildingBase, door2);
    addChild(buildingBase, stair1);
    addChild(buildingBase, stair2);
    addChild(buildingBase, vent);
    addChild(buildingBase, ac);
    
    buildingBase.translation = [0,1,0];
    return buildingBase;
}

function createbuilding3Model() {
    let building1Geometries = [];
    let buildingBase;
    let tex = buildingtexts[Math.floor(Math.random() * buildingtexts.length)];
    let bump = bumps[Math.floor(Math.random() * bumps.length)];
    building1Geometries.push(addGeometry(makePrism(1,1,1, 0,0,0), tex, bump, buildingMat, 3));
    building1Geometries.push(addGeometry(makePrism(1.1,0.1,1.1, 0,0,0), stonetex, stonetex, stonemat, 2));
    building1Geometries.push(addGeometry(makePrism(0.6,0.04,0.2, 0,0,0), stonetex, stonetex, stonemat, 2));
    building1Geometries.push(addGeometry(makePrism(0.95,0.4,0.2, 0,0,0), bushtex, bushtex, bushmat, 10));

    buildingBase = createNode((gl) => drawfunc(gl, building1Geometries[0]), building1Geometries[0]);  
    let buildingtopper = createNode((gl) => drawfunc(gl, building1Geometries[1]), building1Geometries[1]);
    buildingtopper.translation = [0,0.5,0];

    let window3 = makeWindow();
    window3.rotation = [0,Math.PI/2, 0];
    window3.translation = [-0.5, 0.1, -0.2];

    let window4 = makeWindow();
    window4.rotation = [0,Math.PI/2, 0];
    window4.translation = [-0.5, 0.1, 0.2];

    let window5 = makeWindow();
    window5.rotation = [0,Math.PI/2, 0];
    window5.translation = [0.5, 0.1, -0.2];

    let window6 = makeWindow();
    window6.rotation = [0,Math.PI/2, 0];
    window6.translation = [0.5, 0.1, 0.2];

    let shade1 = makeShade(0.6, 0.1);
    shade1.translation = [0,0.3,0.5];

    let shade2 = makeShade(0.6, 0.1);
    shade2.rotation = [0,Math.PI, 0];
    shade2.translation = [0,0.3,-0.5];

    let door1 = makeDoor(0.5, 0.5);
    door1.translation = [0,-0.05,0.5];

    let door2 = makeDoor(0.5, 0.5);
    door2.translation = [0,-0.05,-0.5];

    let stair1 = makeStairs(1);
    stair1.translation = [0,-0.4,0.525];

    let stair2 = makeStairs(1);
    stair2.rotation = [0, Math.PI, 0];
    stair2.translation = [0,-0.4,-0.525];

    let rails2 = makeRails(1, 1);
    rails2.translation =[0, 0.635,-0.5];


    let bush1 = createNode((gl) => drawfunc(gl, building1Geometries[3]), building1Geometries[3]);
    bush1.rotation = [0,Math.PI/2,0];
    bush1.translation =[-0.6, -0.3,0];

    let bush2 = createNode((gl) => drawfunc(gl, building1Geometries[3]), building1Geometries[3]);
    bush2.rotation = [0,-Math.PI/2,0];
    bush2.translation =[0.6, -0.3,0];

    addChild(buildingBase, buildingtopper);
    addChild(buildingBase, window3);
    addChild(buildingBase, window4);
    addChild(buildingBase, window5);
    addChild(buildingBase, window6);
    addChild(buildingBase, shade1);
    addChild(buildingBase, shade2);
    addChild(buildingBase, door1);
    addChild(buildingBase, door2);
    addChild(buildingBase, stair1);
    addChild(buildingBase, stair2);
    addChild(buildingBase, rails2);
    addChild(buildingBase, bush1);
    addChild(buildingBase, bush2);
    
    buildingBase.translation = [0,0.5,0];
    return buildingBase;
}

function createbuilding4Model() {
    let building1Geometries = [];
    let buildingBase;
    let tex = buildingtexts[Math.floor(Math.random() * buildingtexts.length)];
    let bump = bumps[Math.floor(Math.random() * bumps.length)];
    building1Geometries.push(addGeometry(makePrism(2,1,1, 0,0,0), tex, bump, buildingMat, 3));
    building1Geometries.push(addGeometry(makeSkewedPrism(2.2,0.25,1.1,1.4,1.4,1,1, 0,0,0), stonetex, stonetex, stonemat, 2));
    building1Geometries.push(addGeometry(makePrism(0.95,0.4,0.2, 0,0,0), bushtex, bushtex, bushmat, 10));
    building1Geometries.push(addGeometry(makePrism(0.15,0.3,0.15, 0,0,0), venttex, venttex, metalmat, 3));
    building1Geometries.push(addGeometry(makePrism(0.3,0.2,0.2, 0,0,0), actex, actex, buildingMat, 3));
    building1Geometries.push(addGeometry(makePrism(1.8,0.4,0.04, 0,0,0), signtex, signtex, metalmat, 0));

    buildingBase = createNode((gl) => drawfunc(gl, building1Geometries[0]), building1Geometries[0]);  
    let buildingtopper = createNode((gl) => drawfunc(gl, building1Geometries[1]), building1Geometries[1]);
    buildingtopper.translation = [0,0.625,0];

    let window3 = makeWindow();
    window3.rotation = [0,Math.PI/2, 0];
    window3.translation = [-0.5, 0.1, -0.2];

    let window4 = makeWindow();
    window4.rotation = [0,Math.PI/2, 0];
    window4.translation = [-0.5, 0.1, 0.2];

    let window5 = makeWindow();
    window5.rotation = [0,Math.PI/2, 0];
    window5.translation = [0.5, 0.1, -0.2];

    let window6 = makeWindow();
    window6.rotation = [0,Math.PI/2, 0];
    window6.translation = [0.5, 0.1, 0.2];

    let shade1 = makeShade(0.6, 0.1);
    shade1.translation = [0,0.3,0.5];

    let shade2 = makeShade(0.6, 0.1);
    shade2.rotation = [0,Math.PI, 0];
    shade2.translation = [0,0.3,-0.5];


    let door1 = makeDoor(0.5, 0.5);
    door1.translation = [0,-0.05,0.5];

    let door2 = makeDoor(0.5, 0.5);
    door2.translation = [0,-0.05,-0.5];

    let stair1 = makeStairs(2);
    stair1.translation = [0,-0.4,0.525];

    let stair2 = makeStairs(2);
    stair2.rotation = [0, Math.PI, 0];
    stair2.translation = [0,-0.4,-0.525];

    // let rails2 = makeRails(1, 1);
    // rails2.translation =[0, 0.635,-0.5];


    let bush1 = createNode((gl) => drawfunc(gl, building1Geometries[2]), building1Geometries[2]);
    bush1.rotation = [0,Math.PI/2,0];
    bush1.translation =[-1.1, -0.3,0];

    let bush2 = createNode((gl) => drawfunc(gl, building1Geometries[2]), building1Geometries[2]);
    bush2.rotation = [0,-Math.PI/2,0];
    bush2.translation =[1.1, -0.3,0];

    let vent = createNode((gl) => drawfunc(gl, building1Geometries[3]), building1Geometries[3]);
    vent.translation = [0.45, 0.85, -0.35];
    let ac = createNode((gl) => drawfunc(gl, building1Geometries[4]), building1Geometries[4]);
    ac.translation = [-0.45, 0.85, 0.15];

    let sign = createNode((gl) => drawfunc(gl, building1Geometries[5]), building1Geometries[5]);
    sign.translation = [0, 0.9, 0.4];

    addChild(buildingBase, buildingtopper);
    addChild(buildingBase, window3);
    addChild(buildingBase, window4);
    addChild(buildingBase, window5);
    addChild(buildingBase, window6);
    addChild(buildingBase, shade1);
    addChild(buildingBase, shade2);
    addChild(buildingBase, door1);
    addChild(buildingBase, door2);
    addChild(buildingBase, stair1);
    addChild(buildingBase, stair2);
    // addChild(buildingBase, rails2);
    addChild(buildingBase, bush1);
    addChild(buildingBase, bush2);
    addChild(buildingBase, ac);
    addChild(buildingBase, vent);
    addChild(buildingBase, sign);
    
    buildingBase.translation = [0.5,0.5,0];
    return buildingBase;
}
function makeWindow(){
    let windowgeometrie = [];
    windowgeometrie.push(addGeometry(makePrism(0.3,0.3,0.001, 0,0,0), glasstex, glasstex, glassmat, 0));
    windowgeometrie.push(addGeometry(makePrism(0.36,0.03,0.03, 0,0,0), stonetex, stonetex, stonemat, 1));

    let window = createNode((gl) => drawfunc(gl, windowgeometrie[0]), windowgeometrie[0]);
    let bordertop = createNode((gl) => drawfunc(gl, windowgeometrie[1]), windowgeometrie[1]);
    bordertop.translation = [0,0.165, 0];
    let borderbottom = createNode((gl) => drawfunc(gl, windowgeometrie[1]), windowgeometrie[1]);
    borderbottom.translation = [0,-0.165, 0];

    let borderright = createNode((gl) => drawfunc(gl, windowgeometrie[1]), windowgeometrie[1]);
    borderright.rotation = [0,0,90*Math.PI/180];
    borderright.translation = [0.165, 0, 0];

    let borderleft = createNode((gl) => drawfunc(gl, windowgeometrie[1]), windowgeometrie[1]);
    borderleft.rotation = [0,0,90*Math.PI/180];
    borderleft.translation = [-0.165, 0, 0];

    addChild(window, bordertop);
    addChild(window, borderbottom);
    addChild(window, borderright);
    addChild(window, borderleft);

    return window;
}


function makeShade(length, width){
    let tex = shadetex[Math.floor(Math.random() * shadetex.length)];
    let shadegeomtry = addGeometry(makeSkewedPrism(length,0.1,width, 3, 3, 1, 1, 0,0,0), tex, tex, shademat, 0);
    let shade = createNode((gl) => drawfunc(gl, shadegeomtry), shadegeomtry);

    return shade;
}

function makeDoor(length, width){
    let doorgeom = addGeometry(makePrism(length, width, 0.001,0,0,0), glasstex, glasstex, glassmat, 0);
    let door = createNode((gl) => drawfunc(gl, doorgeom), doorgeom);

    let lengthgeom = addGeometry(makePrism(length, 0.03, 0.03,0,0,0), stonetex, stonetex, stonemat, 2);
    let widthgeom = addGeometry(makePrism(0.03, width, 0.03,0,0,0), stonetex, stonetex, stonemat, 2);

    let top =  createNode((gl) => drawfunc(gl, lengthgeom), lengthgeom);
    top.translation  = [0, width/2, 0];

    let right = createNode((gl) => drawfunc(gl, widthgeom), widthgeom);
    right.translation = [length/2, 0, 0];

    let left = createNode((gl) => drawfunc(gl, widthgeom), widthgeom);
    left.translation = [-length/2, 0, 0];

    let middle = createNode((gl) => drawfunc(gl, widthgeom), widthgeom);

    addChild(door, top);
    addChild(door, left);
    addChild(door, right);
    addChild(door, middle);

    return door
}

function makeStairs(length){
    let topgeom = addGeometry(makePrism(length, 0.2, 0.05,0,0,0), stonetex, stonetex, stonemat, 3);
    let top = createNode((gl) => drawfunc(gl, topgeom), topgeom);

    let bottomgeom = addGeometry(makePrism(length, 0.1, 0.05,0,0,0), stonetex, stonetex, stonemat, 3);
    let bottom = createNode((gl) => drawfunc(gl, bottomgeom), bottomgeom);

    bottom.translation = [0, -0.05, 0.05];
    addChild(top, bottom);
    return top
}

function makeRails(length, width){
    let lengthgeom = addGeometry(makePlane(length, 0.2,0,0,0), railingtex, railingtex, metalmat, 2);
    let widthgeom = addGeometry(makePlane(width, 0.2,0,0,0), railingtex, railingtex, metalmat, 2);

    let front = createNode((gl) => drawfunc(gl, lengthgeom), lengthgeom);
    let back = createNode((gl) => drawfunc(gl, lengthgeom), lengthgeom);
    let right = createNode((gl) => drawfunc(gl, widthgeom), widthgeom);
    let left = createNode((gl) => drawfunc(gl, widthgeom), widthgeom);

    back.rotation = [0,Math.PI,0];
    back.translation = [0,0, width];

    right.rotation = [0, Math.PI/2, 0];
    right.translation = [length/2,0,width/2];

    left.rotation = [0, -Math.PI/2, 0];
    left.translation = [-length/2,0,width/2];

    addChild(front, back);
    addChild(front, left);
    addChild(front, right);

    return front;
}


function createRoad(){
    let roadgeom = addGeometry(makePrism(1.0, 0.05, 1,0,0), roadtex, roadtex, roadmat, 10);
    let road = createNode((gl) => drawfunc(gl, roadgeom), roadgeom);

    // let sidegeom = addGeometry(makePrism(0.1, 0.075, 1,0,0,0), stonetex, stonetex, stonemat, 3);
    // let right = createNode((gl) => drawfunc(gl, sidegeom), sidegeom);
    // right.translation = [0.45, 0.0125, 0];
    // let left = createNode((gl) => drawfunc(gl, sidegeom), sidegeom);
    // left.translation = [-0.45, 0.0125, 0];

    // addChild(road, right);
    // addChild(road, left);
    return road
}

function moveBuilding(building,type, row, col, rotation){
    building.rotation[1] = -rotation * 90 * Math.PI / 180;

    if(type == 4){
        if(rotation == 1){
            building.translation[2] = 0.5;
            building.translation[0] = 0;
        }
        else if(rotation == 2){
            building.translation[0] = -0.5;
            
        }
        else if(rotation == 3){
            building.translation[2] = -0.5;
            building.translation[0] = 0;
        }
    }
    building.translation[0] += row;
    building.translation[2] += col;
    
}
