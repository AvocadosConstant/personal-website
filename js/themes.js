function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className=el.className.replace(reg, ' ')
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  var themeCheck = document.querySelector('input[name=themeCheck]');
  themeCheck.addEventListener('change', function (event) {
    if (themeCheck.checked) {
        genTriColors(triColors, 20, 24);
        addClass(document.body, 'dark-mode')
        var icons = document.getElementsByClassName("social-icon");
        for (var i = 0; i < icons.length; i++) {
            icons[i].src = icons[i].src.replace(".svg", "_light.svg");
        }
    } else {
        genTriColors(triColors, 240, 250);
        removeClass(document.body, 'dark-mode')
        var icons = document.getElementsByClassName("social-icon");
        for (var i = 0; i < icons.length; i++) {
            icons[i].src = icons[i].src.replace("_light", "");
        }
    }
    generateTriangles();
    generateTriangles();
    generateTriangles();
  });
});
