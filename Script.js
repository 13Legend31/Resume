'use strict';
// All arrays must have length NumberOfSections
var NumberOfSections = 7;
var VerticalScroll = []; 
var Sections = [];
// Initializes Page for use
(function() {
    // Section related variables            
    var NumberOfSections = 7;
    var VerticalScroll = []; 
    var Sections = [];
    //------- Load In Variables -------
    var ScrollHide = document.getElementsByClassName('ScrollIcon');
    var Section = document.getElementsByClassName('Section');
    for (var i = 0; i < NumberOfSections; i++) {
        VerticalScroll.push(ScrollHide[i].style);
        Sections.push(Section[i].style);
    }
    var Top = 0;
    for (var i = 0; i < NumberOfSections; i++, Top += 100) {
        Sections[i].top = Top + 'vh';
    }
    console.log("Variables Initialized");
    //------- Add Scroll Functionality -------
    var i = 0;
    var ScriptReady = true;
    function Add_MouseWheel_Functionality (e) {
        if (ScriptReady) {
            ScriptReady = false;
            // Animate right vertical scroll
            VerticalScroll[i].backgroundColor = 'orange';
            VerticalScroll[i].opacity = '0.4';
            window['SectionOut'](i + 1);
            var up;
            var inc;
            if (e.wheelDelta < 0 || e.deltaY > 0) {
                inc = (i === NumberOfSections - 1) ? false : true;  
                i = (i === NumberOfSections - 1) ? i : i + 1;
                up = false;                  
            } else {
                inc = (i === 0) ? false : true; 
                i = (i === 0) ? i : i - 1;
                up = true;
            }
            VerticalScroll[i].backgroundColor = 'red';
            VerticalScroll[i].opacity = '1';
            // Move sections up or down
            for (var c = 0; c < NumberOfSections && inc; c++) {
                Sections[c].transition = '0.4s';
                var Top = (up) ? parseInt(Sections[c].top) + 100 : parseInt(Sections[c].top) - 100;
                Sections[c].top = Top + 'vh';
            }
            window['SectionIn'](i + 1);
            setTimeout(function() { 
                for (var c = 0; c < NumberOfSections; c++) {
                    Sections[c].transition = '0s';
                }
            }, 400);
            setTimeout(function() { ScriptReady = true}, 400);
        }
    }
        // Chrome, Firefox, IE, Edge
    window.addEventListener('wheel', Add_MouseWheel_Functionality);
        // Safari
    window.addEventListener('mousewheel', Add_MouseWheel_Functionality);
        // Up arrow/Down arrow functionality
    window.addEventListener('keydown', function(e) { 
        if (e.keyCode == 38) {
            e.WheelDelta = 1;
            Add_MouseWheel_Functionality(e); 
        } else if (e.keyCode == 40) {
            e.wheelDelta = -1;
            Add_MouseWheel_Functionality(e);
        }
    });
    console.log("Scrolling Functional");
    // SECTION SPECIFIC SCRIPTS
    // S4 -Set skill bar image positions
    var SkillBarImages = document.getElementsByClassName('SkillBarImage'); 
    var Left = 0;
    for (var c = 0; c < SkillBarImages.length; c++, Left += 20) {
        SkillBarImages[c].style.left = Left + '%';
    }
    // S4 - Add skill bar tilt movement
    var SkillBar = document.getElementById('SkillBar').style;
    window.addEventListener('mousemove', function(e) {
        if (i === 2) {
            var Cx = window.innerWidth/2,
                Cy = window.innerHeight/2,
                MouseX = e.pageX,
                MouseY = e.pageY;
            var VectorX = MouseX - Cx,
                VectorY = -(MouseY - Cy);
            var RotateX = VectorY/Cx,
                RotateY = VectorX/Cy,
                Deg = Math.sqrt(Math.pow(VectorX,2) + Math.pow(VectorY,2))/Math.sqrt(Math.pow(Cx,2) + Math.pow(Cy,2)) * 45; 
            SkillBar.transform = 'rotate3d(' + RotateX + ',' + RotateY + ',' + '0,'+ Deg + 'deg)'; 
            var Shadow = -(VectorX/Math.abs(VectorX)*0.3) + "vmin " + (VectorY/Math.abs(VectorY)*0.3) + "vmin " + "3px " + "3px " + "red";
            SkillBar.boxShadow = Shadow;
        }
    });
    console.log("Skill Bar Operational");
})();
// Section Scripts
// SectionIn
var Timeouts = []; // Timeouts "clear this in SectionOut()" - need better name
function SectionIn (i) {
    var Title = document.getElementById('S' + i + 'Title');
    if (Title)
        Title.style.opacity = '1';
    var Text = document.getElementsByClassName('S' + i + 'Elem');
    var T = 200;
    for (var j = 0; j < Text.length; j++) {
        (function() {
            var TextStyle = Text[j].style;
            Timeouts.push(setTimeout(function() { TextStyle.opacity = '1'; }, T));
        })();
        T += 400;
    }
}
// SectionOut
function SectionOut(i) {
    var Title = document.getElementById('S' + i + 'Title');
    if (Title)
        Title.style.opacity = '0';
    var Text = document.getElementsByClassName('S' + i + 'Elem');
    for (var j = 0; j < Text.length; j++) {
        (function() {
            Text[j].style.opacity = '0';
            clearTimeout(Timeouts[j]); 
        })();
    }
    Timeouts.length = 0;
}