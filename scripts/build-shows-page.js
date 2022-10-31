//Retrieve shows info from API using same key as the one used for comments
const apiKey = "34cc7d80-a8b6-475b-b5d1-a42a2681b421";
const apiAppend = "?api_key=";
const url = "https://project-1-api.herokuapp.com/";
const showsRoute = "showdates/";

axios
  .get(`${url}${showsRoute}${apiAppend}${apiKey}`)
  .then((response) => {
    //Call this function to generate the Title for all viewports and headings of the shows table which will only be displayed on tablet and desktop viewports
    const responseData = response.data;
    showTitleAndHeadings();
    responseData.forEach((showItem) => {
      generateShowSchedule(showItem);
    });
  })
  .catch((err) => {
    console.log(err);
  })

function showTitleAndHeadings() {
  const mainEl = document.querySelector("main");
  const sectionEl = document.createElement("section");
  sectionEl.classList.add("shows-table");
  mainEl.appendChild(sectionEl);
  
  const showsContainerEl = document.createElement("div");
  showsContainerEl.classList.add("shows-table__container");
  sectionEl.appendChild(showsContainerEl);
  
  const showsTitleEl = document.createElement("h2");
  showsTitleEl.classList.add("shows-table__title");
  showsTitleEl.innerText = "Shows";
  showsContainerEl.appendChild(showsTitleEl);
  
  const columnHeadingsEl = document.createElement("div");
  columnHeadingsEl.classList.add("tickets__column-headings--hide-mobile");
  showsContainerEl.appendChild(columnHeadingsEl);
  
  const dateTitleEl = document.createElement("p");
  dateTitleEl.classList.add("tickets__date-title");
  dateTitleEl.innerText = "Date";
  columnHeadingsEl.appendChild(dateTitleEl);
  
  const venueTitleEl = document.createElement("p");
  venueTitleEl.classList.add("tickets__venue-title");
  venueTitleEl.innerText = "Venue";
  columnHeadingsEl.appendChild(venueTitleEl);
  
  const locationTitleEl = document.createElement("p");
  locationTitleEl.classList.add("tickets__location-title");
  locationTitleEl.innerText = "Location";
  columnHeadingsEl.appendChild(locationTitleEl);
  
  let buttonEl = document.createElement("a");
  buttonEl.classList.add(
    "tickets__buy-button",
    "tickets__buy-button--visibility-hidden"
  );
  buttonEl.href = "../index.html";
  buttonEl.innerText = "Buy Tickets";
  columnHeadingsEl.appendChild(buttonEl);
}

function dateConversion(date) {
  const newDate = new Date(date).toDateString();
  return newDate;
}


function generateShowSchedule(showList) {
  const showsContainerEl = document.querySelector(".shows-table__container");
  const articleEl = document.createElement("article");
  articleEl.classList.add("tickets");
  showsContainerEl.appendChild(articleEl);

  eventListener(articleEl);

  const dateTitleEl = document.createElement('p');
  dateTitleEl.classList.add("tickets__date-title", "tickets__date-title--hide-tablet");
  dateTitleEl.innerText = "Date";
  articleEl.appendChild(dateTitleEl);

  const dateEl = document.createElement('p');
  dateEl.classList.add('tickets__date');
  dateEl.innerText = dateConversion(showList.date);
  articleEl.appendChild(dateEl);

  const venueTitleEl = document.createElement("p");
  venueTitleEl.classList.add("tickets__venue-title", "tickets__venue-title--hide-tablet");
  venueTitleEl.innerText = "Venue";
  articleEl.appendChild(venueTitleEl);

  const venueEl = document.createElement('p');
  venueEl.classList.add('tickets__venue');
  venueEl.innerText = showList.place;
  articleEl.appendChild(venueEl);

  const locationTitleEl = document.createElement("p");
  locationTitleEl.classList.add("tickets__location-title", "tickets__location-title--hide-tablet");
  locationTitleEl.innerText = "Location";
  articleEl.appendChild(locationTitleEl);

  const locationEl = document.createElement('p');
  locationEl.classList.add('tickets__location');
  locationEl.innerText = showList.location;
  articleEl.appendChild(locationEl);

  const buttonEl = document.createElement('a');
  buttonEl.href = "../index.html";
  buttonEl.classList.add('tickets__buy-button');
  buttonEl.innerText = "Buy Tickets";
  articleEl.appendChild(buttonEl);

  buttonHover(buttonEl);
}

function eventListener(showListing) {
  console.log(showListing);
  showListing.addEventListener("mouseover", () => {
    showListing.classList.add("tickets--hover");
  })

  showListing.addEventListener("mouseout", () => {
    showListing.classList.remove("tickets--hover")
  })

  showListing.addEventListener("click", () => {
    if(document.querySelector(".tickets--selected.tickets--hover")) {
        showListing.classList.remove("tickets--selected");
      }
  
    else if(document.querySelector(".tickets--hover") && document.querySelector(".tickets--selected")) {
      const clearSelectedShow = document.querySelector(".tickets--selected");
      clearSelectedShow.classList.remove("tickets--selected");
      showListing.classList.add("tickets--selected");
    }
  
    else {
      showListing.classList.add("tickets--selected");
    }
  })
}

function buttonHover(button) {
  console.log(button);
  button.addEventListener("mouseover", () => {
    button.classList.add("tickets__buy-button--hover");
  })

  button.addEventListener("mouseout", () => {
    button.classList.remove("tickets__buy-button--hover")
  })
}

