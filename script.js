//  developed by jk with 💚

const button = document.getElementById("btn");
const colorType = document.querySelector('#color-type');
const grabColor = document.getElementById("color");
const random = document.getElementById("random2");

let colorTypeArray = ['monochrome','monochrome-dark','monochrome-light','analogic','complement','analogic-complement','triad']


//this function is to generate random hex color 
function getRandomHexColor() {
    var letters = '0123456789ABCDEF';
    var color = ' ';
    
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
  }
  


//this button gets color input and show that color 
button.addEventListener("click", function() {
    const modeParameter = colorType.value;
    const color = grabColor.value.substr(1);
    getRandomColor(color,modeParameter);

});

//this is to generate random color pallet 
random.addEventListener("click",function(){

    let gotColorTypeArray = colorTypeArray[Math.floor(Math.random()*colorType.length)];
    let randomHexColor = getRandomHexColor();
    getRandomColor(randomHexColor,gotColorTypeArray)
})


//this function generate random pallet
function getRandomColor(color,modeParameter) {
    let url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${modeParameter}`;
    console.log(url);
    console.log()

    fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(data => {
            console.log(data.colors);
            let fetchedColorsArray = data.colors;
            let renderColors = '';

            fetchedColorsArray.map(function(colorObj) {
                console.log(colorObj.hex.value);

                renderColors += `
                   <div id="pallet" colorid = "${colorObj.hex.value}" style="background-color:${colorObj.hex.value}" onclick="copyToClipboard(this)">
                       <p id="hex-text">${colorObj.hex.value}</p>
                   </div>          
                   `;
            });

            document.getElementById("main").innerHTML = `
            <div class="container">
                ${renderColors}
            </div>
            `;
            // console.log(renderColors);
        });
}





function copyToClipboard(hexColor) {
    const textarea = document.createElement("textarea");
    textarea.value = hexColor.getAttribute('colorid');
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    hexColor.textContent = "Copied!";
    console.log(hexColor.getAttribute('colorid'));
}

