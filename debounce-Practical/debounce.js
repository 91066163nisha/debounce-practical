import { serchData } from "./debounce-extra.js";
import { items } from "./debounce-extra.js";
window.fetchData = fetchData;

function noDataFound() {
  $(".result").text("No Result Found");
}
function fetchData(element, istrue) {
  $(".main-div").hide();
  var displayItem = [];
  if (!istrue) {
    const search = document.getElementById("onClick").getAttribute("value");
  }
  items.forEach((val) => {
    const compareVal = val.Name;
    let compareIndex = compareVal.includes(element || search);

    if (compareIndex != false) {
      displayItem.push(val);
    } else {
      noDataFound();
    }

    if (displayItem.length != 0) {
      $(".result").text(`${displayItem.length} Result Found`);
    } else {
      noDataFound();
    }
  });

  displayItem.map((item) => {
    $(".row").append(
      `<div class="col-3">
          <div class="card card-height">
            <img src="${item.image}"
              class="card-img-top image-size" alt="2">
            <h5 class="item-name">${item.Name}</h5>
            <div class="card-text">${item.Price} </div>
          </div>
        </div>`
    );
  });
}

$(document).ready(function () {
  const input = document.getElementById("searchField");
  input.addEventListener("input", debouncedSearch);
});

const debounce = (func, delay = 500) => {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this);
    }, delay);
  };
};

const debouncedSearch = debounce(search, 500);
function search(evt) {
  const inputData1 = $("#searchField").val().charAt(0).toUpperCase();
  let meatchElm = [];
  const filteredData = serchData.forEach((element) => {
    const value = Object.entries(element)[0][1];
    let index = value.indexOf(inputData1);
    if (index != -1) {
      meatchElm.push(value);
    }
  });
  $("#searchField").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      fetchData(this.value, true);
    }
  });

  if (meatchElm != 0) {
    for (let i in meatchElm) {
      $(".main-div").show();
      $(".matchedData").append(`<ul>
      <li onclick="fetchData(this.getAttribute('value'),false)" id="onClick" value=${meatchElm[i]} ><i class="bi bi-search extra-space" ></i>${meatchElm[i]}</li>
    </ul>`);
    }
  } else {
    noDataFound();
  }
}
