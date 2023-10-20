
let slideindex = 1;

function fetchdata(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var urlencoded = new URLSearchParams();
    
    var requestOptions = {
      method: 'POST',
    //   headers: myHeaders,
    //   body: urlencoded,
      redirect: 'follow',
      credentials: 'omit',
    };
    
    fetch("https://apidev.polarispos.com/login-page/contents.php", requestOptions)
      .then(response => response.text())
      .then(result => save_data(result))
      .catch(error => console.log('error', error))
}
    
function save_data(result) {
  var div = '';
  var dot_div = '';
  var data = JSON.parse(result);
  var k = 1;

  for (var i = 0; i < data.length; i++) {
    var description = data[i].description;
    var truncatedDescription = description.length > 160 ? description.slice(0, 160) + '...' : description;

    div += '<div class="mySlides fade">' +
      '<div class="numbertext">' + k + ' / ' + data.length + '</div>' +
      '<div id="img-shadow">' +
      '<img src="' + data[i].img_url + '" alt="Slide 1">' +
      // '<img src="./Images/slider1.png"' +
      '</div>' +
      '<div class="carousel-footer">' +
      '<h4 title="'+data[i].title+'">' + data[i].title + '</h4>' +
      '<p title="'+data[i].description+'">' + truncatedDescription + '</p>' +
     
      '</div>' +
      '</div>';
    dot_div += '<span class="dot" onclick="currentSlide(' + k + ')"></span>';
    k++;
  }

  document.getElementById("slider_content").innerHTML = div;
  //document.getElementById("intigetor").innerHTML = dot_div;
  showslides(slideindex)

}
fetchdata();


//showslides(slideindex)

function showslides(number){
    console.log(number)
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //var dot = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      slideindex++;
      if (slideindex > slides.length) {slideindex = 1}    
      // for (i = 0; i < dot.length; i++) {
      //   dot[i].className = dot[i].className.replace(" active", "");
      // }
      slides[slideindex-1].style.display = "block";  
      //dot[slideindex-1].className += " active";
      const listening = setTimeout(function(){
        showslides(slideindex)
        clearTimeout(listening);
      }, 8000);
      //setTimeout(showslides, 1000); // Change image every 2 seconds

} 
function plusSlides(n) {
    showslides(slideindex += n);
  }
  
  function currentSlide(n) {
    showslides(slideindex = n);
  }
  function currentSlide(n) {
    showslides(slideindex = n);
  }


