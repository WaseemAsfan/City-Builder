function addChild(parent, child) {
    parent.children.push(child);
}

let foot;
let ankle;
let boot; 
let lowerleg;
let upperleg;

let lfoot; 
let lankle;
let lboot ;
let llowerleg ;
let lupperleg;

let lowerbody;
let crotch;
let rightpeck;
let leftpeck ;
let rightshoulder;
let leftshoulder;

let rightarmupper;
let leftarmupper;
let rightarmlower;
let leftarmlower;

let neck;
let head;
let hair, hair2, hair3, hair4, hair5, hair6, hair7, hair8, hair9, hair10, hair11;

function createCharacterModel(geometries, drawfunc) {
    foot = createNode((gl) => drawfunc(gl, geometries[0]), geometries[0]);  
    ankle = createNode((gl) => drawfunc(gl, geometries[1]), geometries[1]);
    boot = createNode((gl) => drawfunc(gl, geometries[2]), geometries[2]);
    lowerleg = createNode((gl) => drawfunc(gl, geometries[3]), geometries[3]);
    upperleg = createNode((gl) => drawfunc(gl, geometries[4]), geometries[4]);

    lfoot = createNode((gl) => drawfunc(gl, geometries[0]), geometries[0]);  
    lankle = createNode((gl) => drawfunc(gl, geometries[1]), geometries[1]);
    lboot = createNode((gl) => drawfunc(gl, geometries[2]), geometries[2]);
    llowerleg = createNode((gl) => drawfunc(gl, geometries[3]), geometries[3]);
    lupperleg = createNode((gl) => drawfunc(gl, geometries[4]), geometries[4]);

    lowerbody = createNode((gl) => drawfunc(gl, geometries[5]), geometries[5]);
    crotch = createNode((gl) => drawfunc(gl, geometries[6]), geometries[6]);
    rightpeck = createNode((gl) => drawfunc(gl, geometries[7]), geometries[7]);
    leftpeck = createNode((gl) => drawfunc(gl, geometries[7]), geometries[7]);
    rightshoulder = createNode((gl) => drawfunc(gl, geometries[8]), geometries[8]);
    leftshoulder = createNode((gl) => drawfunc(gl, geometries[8]), geometries[8]);

    rightarmupper = createNode((gl) => drawfunc(gl, geometries[9]), geometries[9]);
    leftarmupper = createNode((gl) => drawfunc(gl, geometries[9]), geometries[9]);
    rightarmlower = createNode((gl) => drawfunc(gl, geometries[9]), geometries[9]);
    leftarmlower = createNode((gl) => drawfunc(gl, geometries[9]), geometries[9]);

    neck = createNode((gl) => drawfunc(gl, geometries[10]), geometries[10]);
    head = createNode((gl) => drawfunc(gl, geometries[11]), geometries[11]);

    // let ankletransform = mat4Identity();
    // foot.translation = [0.1,0,0];
    rightpeck.localTransform = mat4RotateY(mat4Translate(mat4Identity(), [0.05,0.05,0]), Math.PI/2);
    rightpeck.translation = [0,0.15,0];
    leftpeck.localTransform = mat4RotateY(mat4Translate(mat4Identity(), [-0.05,0.05,0]), -Math.PI/2);
    leftpeck.translation = [0,0.15,0];
    rightshoulder.localTransform = mat4RotateY(mat4Translate(mat4Identity(), [0.0625,0.025,0]), Math.PI/2);
    rightshoulder.translation = [0,0.1,0];
    leftshoulder.localTransform = mat4RotateY(mat4Translate(mat4Identity(), [-0.0625,0.025,0]), -Math.PI/2);
    leftshoulder.translation = [0,0.1,0];

    rightarmlower.localTransform = mat4Translate(mat4Identity(), [0,0.0875,0]);
    rightarmlower.translation = [0,0.175,0];
    rightarmlower.rotation = [0,0,0];
    leftarmlower.localTransform = mat4Translate(mat4Identity(), [0,0.0875,0]);
    leftarmlower.translation = [0,0.175,0];
    leftarmlower.rotation = [0,0,0];

    rightarmupper.localTransform = mat4Translate(mat4Identity(), [0,0.0875,0]);
    rightarmupper.translation = [0.14,0.025,0];
    rightarmupper.rotation = [Math.PI,0,10*Math.PI/180];
    leftarmupper.localTransform = mat4Translate(mat4Identity(), [0,0.0875,0]);
    leftarmupper.translation = [-0.14,0.025,0];
    leftarmupper.rotation = [Math.PI,0,-10*Math.PI/180];

    neck.localTransform = mat4Translate(mat4Identity(), [0,0.025,0]);
    neck.translation = [0,0.3,0];
    head.localTransform = mat4Translate(mat4Identity(), [0,0.05,0]);
    head.translation = [0,0.075,0];

    ankle.localTransform = mat4Translate(mat4Identity(), [0,-0.04,0]);
    boot.localTransform = mat4Translate(mat4Identity(), [0,-0.025,0]);
    lowerbody.translation = [0,0.6,0];
    lowerbody.localTransform = mat4Translate(mat4Identity(), [0,0.075,0]);
    crotch.localTransform = mat4Translate(mat4Identity(), [0,-0.0625,0]);
    upperleg.localTransform = mat4RotateY(mat4Translate(mat4Identity(), [0,-0.1,0]), Math.PI/2);
    lowerleg.localTransform = mat4Translate(mat4Identity(), [0,-0.075,0]);
    foot.localTransform = mat4Translate(mat4Identity(), [0,-0.025,0.025]);
    upperleg.translation = [0.075,0,0]
    lowerleg.translation = [0,-0.2,0];
    boot.translation = [0,-0.15,0];
    ankle.translation = [0,-0.05,0];
    foot.translation = [0, -0.08,0];

    lankle.localTransform = mat4Translate(mat4Identity(), [0,-0.04,0]);
    lboot.localTransform = mat4Translate(mat4Identity(), [0,-0.025,0]);
    lowerbody.translation = [0,0.6,0];
    lowerbody.localTransform = mat4Translate(mat4Identity(), [0,0.075,0]);
    lupperleg.localTransform = mat4RotateY(mat4Translate(mat4Identity(), [0,-0.1,0]), -Math.PI/2);
    llowerleg.localTransform = mat4Translate(mat4Identity(), [0,-0.075,0]);
    lfoot.localTransform = mat4Translate(mat4Identity(), [0,-0.025,0.025]);
    lupperleg.translation = [-0.075,0,0];
    llowerleg.translation = [0,-0.2,0];
    lboot.translation = [0,-0.15,0];
    lankle.translation = [0,-0.05,0];
    lfoot.translation = [0, -0.08,0];
    lowerbody.scale = [0.8,1,0.9];

    hair = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair.translation = [0,0.13,0.075];
    hair.localTransform = mat4RotateX(hair.localTransform, 35 * Math.PI/180);
    hair.localTransform = mat4RotateY(hair.localTransform, 90 * Math.PI/180);
    hair2 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair2.translation = [0,0.13,-0.075];
    hair2.localTransform = mat4RotateX(hair2.localTransform, -35 * Math.PI/180);
    hair2.localTransform = mat4RotateY(hair2.localTransform, 90 * Math.PI/180);

    hair3 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair3.scale = [0.9,0.9,0.9];
    hair3.translation = [0.075,0.11,0.05];
    hair3.localTransform = mat4RotateZ(hair3.localTransform, -30 * Math.PI/180);
    hair3.localTransform = mat4RotateX(hair3.localTransform, 35 * Math.PI/180);
    hair3.localTransform = mat4RotateY(hair3.localTransform, 90 * Math.PI/180);
    hair4 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair4.scale = [0.9,0.9,0.9];
    hair4.translation = [0.075,0.11,-0.05];
    hair4.localTransform = mat4RotateZ(hair4.localTransform, -30 * Math.PI/180);
    hair4.localTransform = mat4RotateX(hair4.localTransform, -35 * Math.PI/180);
    hair4.localTransform = mat4RotateY(hair4.localTransform, 90 * Math.PI/180);

    hair5 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair5.scale = [0.9,0.9,0.9];
    hair5.translation = [-0.075,0.11,0.05];
    hair5.localTransform = mat4RotateZ(hair5.localTransform, 30 * Math.PI/180);
    hair5.localTransform = mat4RotateX(hair5.localTransform, 35 * Math.PI/180);
    hair5.localTransform = mat4RotateY(hair5.localTransform, 90 * Math.PI/180);
    hair6 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair6.scale = [0.9,0.9,0.9];
    hair6.translation = [-0.075,0.11,-0.05];
    hair6.localTransform = mat4RotateZ(hair6.localTransform, 30 * Math.PI/180);
    hair6.localTransform = mat4RotateX(hair6.localTransform, -35 * Math.PI/180);
    hair6.localTransform = mat4RotateY(hair6.localTransform, 90 * Math.PI/180);

    hair7 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair7.translation = [0,0.05,-0.11];
    hair7.scale = [1,0.8, 1]
    hair7.localTransform = mat4RotateX(hair7.localTransform, -75 * Math.PI/180);
    hair7.localTransform = mat4RotateY(hair7.localTransform, 90 * Math.PI/180);

    hair8 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair8.translation = [0.11,0.045,0];
    hair8.scale = [1,0.75, 1.2]
    hair8.localTransform = mat4RotateY(hair8.localTransform, 90 * Math.PI/180);
    hair8.localTransform = mat4RotateX(hair8.localTransform, 80 * Math.PI/180);
    hair8.localTransform = mat4RotateY(hair8.localTransform, 90 * Math.PI/180);
    hair9 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair9.translation = [-0.11,0.045,0];
    hair9.scale = [1,0.75, 1.2]
    hair9.localTransform = mat4RotateY(hair9.localTransform, -90 * Math.PI/180);
    hair9.localTransform = mat4RotateX(hair9.localTransform, 80 * Math.PI/180);
    hair9.localTransform = mat4RotateY(hair9.localTransform, 90 * Math.PI/180);

    hair10 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair10.translation = [0.07,0.05,-0.08];
    hair10.scale = [0.8, 0.7, 0.8]
    hair10.localTransform = mat4RotateX(hair10.localTransform, -25 * Math.PI/180);
    hair10.localTransform = mat4RotateY(hair10.localTransform, -45 * Math.PI/180);
    hair10.localTransform = mat4RotateX(hair10.localTransform, -55 * Math.PI/180);
    hair10.localTransform = mat4RotateY(hair10.localTransform, 90 * Math.PI/180);
    hair11 = createNode((gl) => drawfunc(gl, geometries[12]), geometries[12]);
    hair11.translation = [-0.07,0.05,-0.08];
    hair11.scale = [0.8, 0.7, 0.8]
    hair11.localTransform = mat4RotateX(hair11.localTransform, -25 * Math.PI/180);
    hair11.localTransform = mat4RotateY(hair11.localTransform, 45 * Math.PI/180);
    hair11.localTransform = mat4RotateX(hair11.localTransform, -55 * Math.PI/180);
    hair11.localTransform = mat4RotateY(hair11.localTransform, 90 * Math.PI/180);

    addChild(lowerbody, crotch);
    addChild(lowerbody, rightpeck);
    addChild(lowerbody, leftpeck);
    addChild(rightpeck, rightshoulder);
    addChild(leftpeck, leftshoulder);
    addChild(rightshoulder, rightarmupper);
    addChild(leftshoulder, leftarmupper);
    addChild(rightarmupper, rightarmlower);
    addChild(leftarmupper, leftarmlower);
    addChild(lowerbody, neck);
    addChild(neck, head);

    addChild(crotch, upperleg);
    addChild(upperleg, lowerleg);
    addChild(lowerleg, boot);
    addChild(boot, ankle);
    addChild(ankle, foot);

    addChild(crotch, lupperleg);
    addChild(lupperleg, llowerleg);
    addChild(llowerleg, lboot);
    addChild(lboot, lankle);
    addChild(lankle, lfoot);

    addChild(head, hair);
    addChild(head, hair2);
    addChild(head, hair3);
    addChild(head, hair4);
    addChild(head, hair5);
    addChild(head, hair6);
    addChild(head, hair7);
    addChild(head, hair8);
    addChild(head, hair9);
    addChild(head, hair10);
    addChild(head, hair11);

    return lowerbody;
}

function initializeCharacterGeometries(addGeometry, makeMaterial){
    geometries = [];
    geometries.push(addGeometry(makePrism(0.1,0.05,0.15,1,0,0), "textures/red.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.08,0.08,0.08,1,0,0), "textures/red.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.1,0.05,0.1,1,0,0), "textures/red.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.075,0.15,0.075,1,0,0), "textures/skin.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makeSkewedPrism(0.125,0.2,0.125,1,1,0.5,0.5,1,0,0), "textures/blue.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.2,0.15,0.125,1,0,0), "textures/shirt.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.025,0.125,0.125,1,0,0), "textures/bluecrotch.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makeSkewedPrism(0.125,0.1,0.1,1,1,1.5,1.5,1,0,0), "textures/shirt.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makeSkewedPrism(0.125,0.05,0.125,1,1,0.75,0.75,1,0,0), "textures/shirt.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.065,0.175,0.065,1,0,0), "textures/skin.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(makePrism(0.05,0.05,0.05,1,0,0), "textures/skin.png", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    // geometries.push(addGeometry(makePrism(0.05,0.05,0.05,1,0,0), "textures/white.jpg", "textures/white.jpg", makeMaterial(0.3, 0.5, 0.95, 40), 0));
    geometries.push(addGeometry(createSphere(0.11, 6, 8), "textures/head.png", "textures/white.jpg", makeMaterial(0.4, 0.25, 0.1, 1), 0));
    geometries.push(addGeometry(makePrism(0.175,0.015,0.125,1,0,0), "textures/hair.png", "textures/hair.png", makeMaterial(0.3, 0.5, 0.95, 40), 8));
    return geometries;
}


//lowerleg <- upperle <----------lowerbody --> rightarmupper --> rightarmlower
//llowerleg <- lupperleg <---^             \---> leftarmupper --> leftarmlower
function walk(dtime){
    let s = Math.sin(10 * dtime/1000);
    let ns = -Math.sin(10 *dtime/1000);
    let pi = Math.PI / 180;

    rightarmupper.rotation[0] = Math.PI + (s*(20 * pi));
    leftarmupper.rotation[0] = Math.PI + (ns*(20 * pi));
    rightarmlower.rotation[0] = (-Math.abs(s/2)*(80 * pi));
    leftarmlower.rotation[0] =  (-Math.abs(ns/2)*(80 * pi));

    upperleg.rotation[0] = (ns*(45 * pi));
    lupperleg.rotation[0] = (s*(45 * pi));
    lowerleg.rotation[0] = (Math.abs(ns)*(60 * pi));
    llowerleg.rotation[0] = (Math.abs(s)*(60 * pi));

    if((s < 0.1 && s > -0.1) && (ns < 0.1 && ns > -0.1)){
        upperleg.rotation[0] = 0;
        lupperleg.rotation[0] = 0;
        lowerleg.rotation[0] = 0;
        llowerleg.rotation[0] = 0;
        rightarmlower.rotation[0] = 0;
        leftarmlower.rotation[0] =  0;
        rightarmupper.rotation[0] = Math.PI;
        leftarmupper.rotation[0] = Math.PI;
        return false;
    }
    return true;
}