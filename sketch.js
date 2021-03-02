let bitWidth = 40;
let amp = 40;
let bitStream;
let space = 36;
let sel;
let input;

function setup() {
  createCanvas(500, 270); 
  input = createInput();
  sel = createSelect();
  sel.option('NRZ-L');
  sel.option('NRZ-M');
  sel.option('NRZ-S');
  sel.option('NRZ-I');
  sel.option('Unipolar RZ');
  sel.option('Bipolar RZ-AMI');
  sel.option('Manchester (bi-phase-level)');
}

function draw() {
  background(220);
  translate(50, height / 2);
  line(0, 0, 360, 0); //Eje x
  line(20, -125, 20, 125); //Eje y
  text('1', 0, -amp + 4)
  line(10, -amp, 30, -amp); //lineas de voltaje
  text('-1', -4, amp + 4)
  line(10, amp, 30, amp); //lineas de voltaje
  
  bitStream = input.value();

  //Dibujar bits
  [...bitStream].forEach((char, i) => {
    text(char, space, -100);
    if (i > bitStream.length - 2) {
      space = 36;
    } else
      space += 40;
  });

  for (i = 20; i < 360; i += 40) {
    push()
    strokeWeight(.5);
    line(i, -125, i, 125);
    pop();
  }
  
  switch (sel.value()) {
    case 'NRZ-L':
      nrzl(bitStream);
      break;
    case 'NRZ-M':
      nrzm(bitStream);
      break;
    case 'NRZ-S':
      nrzs(bitStream);
      break;
    case 'NRZ-I':
      nrzi(bitStream);
      break;
    case 'Unipolar RZ':
      unipolarRZ(bitStream);
      break;
    case 'Bipolar RZ-AMI':
      bipolarRZAMI(bitStream);
      break;
    case 'Manchester (bi-phase-level)':
      manBPL(bitStream);
      break;
  }



}

function nrzl(bitStream) {
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '1' && bitStream[i - 1] != '1') {
      //Sube y se mueve a la derecha
      verLine(0, -amp, xPos);
      horLine(xPos, xPos + bitWidth, -amp);
      xPos += bitWidth;
    } else if (bitStream[i] == '1' && bitStream[i - 1] == '1') {
      //Altura amp y se mueve a la derecha
      horLine(xPos, xPos + bitWidth, -amp);
      xPos += bitWidth;
    } else if (bitStream[i] == '0' && bitStream[i - 1] == '1') {
      //Baja y se mueve a la derecha
      verLine(-amp, 0, xPos);
      horLine(xPos, xPos + bitWidth, 0);
      xPos += bitWidth;
    } else if (bitStream[i] == '0' && bitStream[i - 1] != '1') {
      //Altura 0 y se mueve a la derecha
      horLine(xPos, xPos + bitWidth, 0);
      xPos += bitWidth;
    }
  }
}

function nrzm(bitStream) {
  let upOrdown = false; //true esta arriba. false esta abajo.
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '1') {
      if (upOrdown == false) {
        //Sube y se mueve a la derecha
        verLine(0, -amp, xPos);
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
        upOrdown = true;
      } else if (upOrdown == true) {
        //baja y se mueve a la derecha
        verLine(-amp, 0, xPos);
        horLine(xPos, xPos + bitWidth, 0);
        xPos += bitWidth;
        upOrdown = false;
      }
    }
    if (bitStream[i] == '0') {
      //se mantiene igual
      if (upOrdown == false) {
        //se queda en altura 0
        horLine(xPos, xPos + bitWidth, 0);
        xPos += bitWidth;
      } else if (upOrdown == true) {
        //se queda en altura amp
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
      }
    }
  }
}

function nrzs(bitStream) {
  let upOrdown = false; //true esta arriba. false esta abajo.
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '0') {
      if (upOrdown == false) {
        //Sube y se mueve a la derecha
        verLine(0, -amp, xPos);
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
        upOrdown = true;
      } else if (upOrdown == true) {
        //baja y se mueve a la derecha
        verLine(-amp, 0, xPos);
        horLine(xPos, xPos + bitWidth, 0);
        xPos += bitWidth;
        upOrdown = false;
      }
    }
    if (bitStream[i] == '1') {
      //se mantiene igual
      if (upOrdown == false) {
        //se queda en altura 0
        horLine(xPos, xPos + bitWidth, 0);
        xPos += bitWidth;
      } else if (upOrdown == true) {
        //se queda en altura amp
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
      }
    }
  }
}


function nrzi(bitStream) {
  let upOrdown = false; //true esta arriba. false esta abajo.
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '1') {
      if (upOrdown == false) {
        //Sube y se mueve a la derecha
        verLine(amp, -amp, xPos);
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
        upOrdown = true;
      } else if (upOrdown == true) {
        //baja y se mueve a la derecha
        verLine(-amp, amp, xPos);
        horLine(xPos, xPos + bitWidth, amp);
        xPos += bitWidth;
        upOrdown = false;
      }
    }
    if (bitStream[i] == '0') {
      //se mantiene igual
      if (upOrdown == false) {
        //se queda en altura 0
        horLine(xPos, xPos + bitWidth, amp);
        xPos += bitWidth;
      } else if (upOrdown == true) {
        //se queda en altura amp
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
      }
    }
  }
}

function unipolarRZ(bitStream) {
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '1') {
      //Sube y se mueve a la derecha medio bit, baja y se mueve a la derecha medio bit
      verLine(0, -amp, xPos);
      horLine(xPos, xPos + (bitWidth / 2), -amp);
      xPos += bitWidth / 2;
      verLine(-amp, 0, xPos);
      horLine(xPos, xPos + (bitWidth / 2), 0);
      xPos += bitWidth / 2;
    } else if (bitStream[i] == '0') {
      //Se mantiene abajo
      horLine(xPos, xPos + bitWidth, 0);
      xPos += bitWidth;
    }
  }
}

function bipolarRZAMI(bitStream) {
  let upOrdown = false; //true esta arriba. false esta abajo.
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '1') {
      if (upOrdown == false && bitStream[i - 1] != '1') {
        //Sube y se mueve a la derecha
        verLine(0, -amp, xPos);
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
        upOrdown = true;
      } else if (upOrdown == true && bitStream[i - 1] != '1') {
        //baja y se mueve a la derecha
        verLine(0, amp, xPos);
        horLine(xPos, xPos + bitWidth, amp);
        xPos += bitWidth;
        upOrdown = false;
      } else if (upOrdown == false && bitStream[i - 1] == '1') {
        //Sube y se mueve a la derecha
        verLine(amp, -amp, xPos);
        horLine(xPos, xPos + bitWidth, -amp);
        xPos += bitWidth;
        upOrdown = true;
      } else if (upOrdown == true && bitStream[i - 1] == '1') {
        //Baja y se mueve a la derecha
        verLine(-amp, amp, xPos);
        horLine(xPos, xPos + bitWidth, amp);
        xPos += bitWidth;
        upOrdown = false;
      }
    }
    if (bitStream[i] == '0' && bitStream[i - 1] == '1') {
      //Debe estar en 0v
      if (upOrdown == false) {
        //Debe subir a 0v. subir y a la derecha
        verLine(amp, 0, xPos);
        horLine(xPos, xPos + bitWidth, 0);
        xPos += bitWidth;
      } else if (upOrdown == true) {
        //Debe bajar a 0v. bajar y a la derecha
        verLine(-amp, 0, xPos);
        horLine(xPos, xPos + bitWidth, 0);
        xPos += bitWidth;
      }
    } else if (bitStream[i] == '0' && bitStream[i - 1] != '1') {
      //Solo se debe mover a la derecha
      horLine(xPos, xPos + bitWidth, 0);
      xPos += bitWidth;
    }
  }
}

function manBPL(bitStream) {
  let xPos = 20;
  for (let i = 0; i < bitStream.length; i++) {
    if (bitStream[i] == '1') {
      //Debe estar arriba y bajar a la mitad
      if (bitStream[i - 1] == '1') {
        //Subir, medio bit a la der, bajar, medio bit a la derecha
        verLine(amp,-amp, xPos);
        horLine(xPos,xPos +(bitWidth/2),-amp);
        xPos+=bitWidth/2;
        verLine(-amp, amp, xPos);
        horLine(xPos,xPos + (bitWidth/2),amp);
        xPos+=bitWidth/2;
      } else if (bitStream[i - 1] != '1') {
        //Medio bit a la der, bajar, medio bit a la derecha
        horLine(xPos,xPos + (bitWidth/2), -amp);
        xPos+=bitWidth/2;
        verLine(-amp, amp, xPos);
        horLine(xPos,xPos + (bitWidth/2), amp);
        xPos+=bitWidth/2;
      }
    } else if (bitStream[i] == '0'){
      //Debe estar abajo y subir a la mitad
      if(bitStream[i-1] != '1'){
        //Bajar, medio bit a la der, subir, medio bit a la derecha
        verLine(-amp, amp, xPos);
        horLine(xPos,xPos + (bitWidth/2), amp);
        xPos+=bitWidth/2;
        verLine(amp,-amp, xPos);
        horLine(xPos,xPos +(bitWidth/2),-amp);
        xPos+=bitWidth/2;
      } else if(bitStream[i-1] == '1'){
        //Medio bit a la der, subir, medio bit a la derecha
        horLine(xPos,xPos + (bitWidth/2), amp);
        xPos+=bitWidth/2;
        verLine(amp, -amp, xPos);
        horLine(xPos,xPos + (bitWidth/2), -amp);
        xPos+=bitWidth/2
      }
    }
  }
}

function horLine(start, end, yPos) {
  push();
  strokeWeight(3);
  line(start, yPos, end, yPos);
  pop();
}

function verLine(start, end, xPos) {
  push();
  strokeWeight(3);
  line(xPos, start, xPos, end);
  pop();
}