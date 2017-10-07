/*=======================================================
   Global variables
  =====================================================*/

let moveEnabled, jumpingToSection,
    currentRotateX = 0,
    currentRotateY = 0,
    cubeMode = true;


/*=======================================================
   Event Listeners
  =====================================================*/

document.addEventListener('DOMContentLoaded', ()=>{
  let cube = document.querySelector('#cube');
  document.addEventListener('mousemove', (e)=>{
    moveCube(e);
  });
  document.addEventListener('touchmove', (e)=>{
    moveCube(e);
  });
});

document.addEventListener('mousedown', ()=>{
  if (!jumpingToSection && cubeMode === true){
   moveEnabled = true;
  }
});

document.addEventListener('touchstart', ()=>{
  if (!jumpingToSection && cubeMode === true){
   moveEnabled = true;
  }
});

document.addEventListener('mouseup', ()=>{
  moveEnabled = false;
});

document.addEventListener('touchend', ()=>{
  moveEnabled = false;
});


/*=======================================================
   Manual Navigation
  =====================================================*/

function moveCube(e){
  //getting mouse coordinates
  let x = e.clientX,
    y = e.clientY;

  //mapping mouse coordinates to an angle in degrees
  function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
  }

  currentRotateY = Math.round(convertRange(x, [0, window.innerWidth], [-180, 180])),
  currentRotateX = Math.round(convertRange(y, [0, window.innerHeight], [180, -180]));

  //only appliy rotation if mouse is pressed
  if(moveEnabled){
    cube.style.transform = `rotateY(${currentRotateY}DEG) rotateX(${currentRotateX}DEG)`;

    // document.querySelector('#debug').innerHTML = `currentRotateX : ${currentRotateX},currentRotateY : ${currentRotateY}`;

    // Sides content toggling
    if (currentRotateX > -30 && currentRotateX <30 && currentRotateY > -30 && currentRotateY <30){
      // animateNav(document.querySelector('#front-btn'));
      toggleContent('#front');
      setColors(['#4286f4', '#1b4b99', 'rgba(27, 75, 153,0.85)' ]);
    }
    if (currentRotateX > -20 && currentRotateX <20 && (currentRotateY > 150 && currentRotateY <210 ||
                                                       currentRotateY < -150 && currentRotateY >-210 )){
      animateNav(document.querySelector('#back-btn'));
      toggleContent('#back');
      setColors(['#f48c41', '#a55113', 'rgba(165, 81, 19,0.85)' ]);
    }
    if (currentRotateX > -20 && currentRotateX <20 && currentRotateY > 60 && currentRotateY <120){
      // animateNav(document.querySelector('#left-btn'));
      toggleContent('#left');
      setColors(['#a054f7', '#6929b2', 'rgba(105, 41, 178,0.85)' ]);
    }
    if (currentRotateX > -20 && currentRotateX <20 && currentRotateY > -120 && currentRotateY <-60){
      // animateNav(document.querySelector('#right-btn'));
      toggleContent('#right');
      setColors(['#8ee24d', '#549125', 'rgba(84, 145, 37,0.85)' ]);
    }
    if (currentRotateX > -120 && currentRotateX <-60 && currentRotateY > -30 && currentRotateY <30){
      // animateNav(document.querySelector('#top-btn'));
      toggleContent('#top');
      setColors(['#e24852', '#a02028', 'rgba(160, 32, 40,0.85)' ]);
    }
    if (currentRotateX > 60 && currentRotateX <120 && currentRotateY > -30 && currentRotateY <30){
      // animateNav(document.querySelector('#bottom-btn'));
      toggleContent('#bottom');
      setColors(['#f2d848', '#96841e', 'rgba(150, 132, 30,0.85)']);
    }
  }
}


/*=======================================================
   Menu Navigation
  =====================================================*/

function goTo(e, section){
  if (!jumpingToSection){

    // animateNav(e);

    switch (section){
      case 'home':
        jumpToSection(0,0);
        toggleContent('#front');
        setColors(['#4286f4', '#1b4b99', 'rgba(27, 75, 153,0.85)' ]);
        break;
      case 'about':
        jumpToSection(180,0);
        toggleContent('#back');
        setColors(['#f48c41', '#a55113', 'rgba(165, 81, 19,0.85)' ]);

        break;
      case 'skills':
        jumpToSection(90,0);
        toggleContent('#left');
        setColors(['#a054f7', '#6929b2', 'rgba(105, 41, 178,0.85)' ]);

        break;
      case 'projets':
        jumpToSection( -90,0);
        toggleContent('#right');
        setColors(['#8ee24d', '#549125', 'rgba(84, 145, 37,0.85)' ]);
        break;
      case 'experience':
        jumpToSection(0,-90);
        toggleContent('#top');
        setColors(['#e24852', '#a02028', 'rgba(160, 32, 40,0.85)' ]);
        break;
      case 'misc':
        jumpToSection(0,90);
        toggleContent('#bottom');
        setColors(['#f2d848', '#96841e', 'rgba(150, 132, 30,0.85)' ]);
        break;
    }
  }
};

// Moving the cube to desired section
function jumpToSection(newRotateY, newRotateX){
  jumpingToSection = true;
  cube.style.transition = "all 1s cubic-bezier(.96,-0.43,.76,.8)";
  cube.style.transform = `rotateY(${newRotateY}DEG) rotateX(${newRotateX}DEG)`;
  setTimeout(()=>{
    currentRotateX = newRotateX;
    currentRotateY = newRotateY;
    cube.style.transition = "none";
    jumpingToSection = false;
  }, 1000);
};

//Displaying correct side content
function toggleContent(side){
  if(cubeMode === true) {
    setTimeout(()=>{
      document.querySelectorAll('.side .content').forEach((p)=>{
        p.classList.add('hidden');
      });
      document.querySelector(`${side} .content`).classList.remove('hidden');
    }, 1000)
  }else{
    console.log(document.querySelector(side).offsetTop);
    window.scrollTo(0, document.querySelector(side).offsetTop);
  }
}

//Changing CSS Variables
function setColors(colors){
  document.documentElement.style.setProperty('--main-color', colors[0]);
  document.documentElement.style.setProperty('--secondary-color', colors[1]);
  document.documentElement.style.setProperty('--secondary-color-85', colors[2]);
}

/*=======================================================
   Menu related stuff
  =====================================================*/

function toggleNav(){
  navBtns = document.querySelectorAll('nav .nav-btn');
  navBtns.forEach((btn)=>{
    btn.classList.toggle('expanded');
  });

}

// function animateNav(e){
//   let navBtns = document.querySelectorAll('nav .nav-btn');
//   navBtns.forEach((btn)=>{
//     btn.classList.remove('active');
//   });
//   e.classList.add('active');
// }


/*=======================================================
   Toggling Cube Mode
  =====================================================*/

function turnOffCube(){
  let sides = document.querySelectorAll('.side'),
      footer = document.querySelector('footer'),
      switchON = document.querySelector('#on'),
      switchOFF = document.querySelector('#off');

  cubeMode = !cubeMode;
  cube.classList.toggle('no-cube');
  document.body.classList.toggle('no-cube');
  sides.forEach((side)=>{
   side.classList.toggle('no-cube');
   side.querySelector('.content').classList.remove('hidden')
  });
  footer.classList.toggle('hidden');
  switchON.classList.toggle('active');
  switchOFF.classList.toggle('active');
}
