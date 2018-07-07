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
    setTimeout(function() {
        document.getElementById('VerticalScroll').style.opacity = '1';
    },200);
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
    function ScrollTo(next) {
        if (ScriptReady) {
            ScriptReady = false;
            if (next <= 0) 
                next = 0;
            else if (next >= NumberOfSections)
                next = NumberOfSections - 1;
            if (next != i) {
            // Animate vertical scroll
                VerticalScroll[i].backgroundColor = 'orange';
                VerticalScroll[i].opacity = '0.4';
                VerticalScroll[next].backgroundColor = 'red';
                VerticalScroll[next].opacity = '1';
                window['SectionOut'](i + 1);
            }
            // Move sections
            var ScrollAmount = (i - next) * 100;
            for (var c = 0; c < NumberOfSections; c++) {
                Sections[c].transition = '0.4s';
                var Top = parseInt(Sections[c].top) + ScrollAmount;
                Sections[c].top = Top + 'vh';
            }
            window['SectionIn'](next + 1);
            i = next;
            setTimeout(function() { 
                for (var c = 0; c < NumberOfSections; c++) {
                    Sections[c].transition = '0s';
                }
            }, 400);
            setTimeout(function() { 
                ScriptReady = true 
            }, 400);
        }
    }
        // Chrome, Firefox, IE, Edge
    window.addEventListener('wheel', function(e) { 
        if (e.wheelDelta < 0 || e.deltaY > 0)
            ScrollTo(i + 1); 
        else
            ScrollTo(i - 1);
    });
        // Safari
    window.addEventListener('mousewheel', function(e) { 
        if (e.wheelDelta < 0 || e.deltaY > 0)
            ScrollTo(i + 1); 
        else
            ScrollTo(i - 1);
    });
        // Up/Left arrow + Down/Right arrow functionality
    window.addEventListener('keydown', function(e) { 
        if (e.keyCode === 37 || e.keyCode === 38) 
            ScrollTo(i - 1); 
        else if (e.keyCode === 39 || e.keyCode === 40) 
            ScrollTo(i + 1);
    });
    console.log("Scrolling Functional");
    // SECTION SPECIFIC SCRIPTS
    // S1 - Add Button Functionality and Fade In
    var S1Buttons = document.getElementsByClassName('S1Buttons');
    for (var c = 0; c < S1Buttons.length; c++) {
        (function() { 
            var b = c;
            S1Buttons[b].addEventListener('click', function() { ScrollTo(b + 1); });
            setTimeout(function() { 
                S1Buttons[b].style.opacity = '0.5';
                S1Buttons[b].style.top = '70vh';
                S1Buttons[b].addEventListener('mouseover', function() {
                    S1Buttons[b].style.opacity = '1';
                });
                S1Buttons[b].addEventListener('mouseout', function() {
                    S1Buttons[b].style.opacity = '0.5';
                });
            }, 400);
        })();
    }
    var LarryWu = document.getElementById('LarryWu');
    setTimeout(function() {LarryWu.style.opacity = '1'},200);    
    // S4 - Set skill bar image positions
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
var Timeouts = []; // Timeouts "clear this in SectionOut()"
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