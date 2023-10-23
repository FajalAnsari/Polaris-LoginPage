let slideindex = 1;
let timeout;

function fetchdata() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // var urlencoded = new URLSearchParams();

  var requestOptions = {
    method: 'POST',
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
    var truncatedDescription = description.length > 245 ? description.slice(0, 245) + '...' : description;
  
    div += '<div class="mySlides fade">' +
      '<div class="numbertext">' + k + ' / ' + data.length + '</div>' +
      '<div id="img-shadow">' +
      '<img src="' + data[i].img_url + '" alt="Slide 1">' +
      '</div>' +
      '<div class="carousel-footer">' +
      '<a href="https://polariserp.com/blog/" target="_blank"> <h4 title="' + data[i].title + '">' + data[i].title + '</h4></a>' +
      '<p title="' + data[i].description + '">' + truncatedDescription + '</p>' +
      '</div>' +
      '</div>';
    dot_div += '<span class="dot" onclick="currentSlide(' + k + ')"></span>';
    k++;
  }

  document.getElementById("slider_content").innerHTML = div;
  showSlides(slideindex);
}

fetchdata();

function showSlides(number) {
  console.log(number);
  var i;
  var slides = document.getElementsByClassName("mySlides");

  if (number > slides.length) {
    slideindex = 1;
  }
  if (number < 1) {
    slideindex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideindex - 1].style.display = "block";
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    showSlides(slideindex + 1);
  }, 6000);
}

function plusSlides(n) {
  showSlides(slideindex += n);
}

function currentSlide(n) {
  showSlides(slideindex = n);
}