//Retrieve shows info from API using same key as the one used for comments
const apiKey = "4f83aa83-d73a-4c38-aa5f-abd25803e279";
const apiAppend = "?api_key=";
const url = "https://project-1-api.herokuapp.com/";
const showsRoute = "showdates/";

axios
  .get(`${url}${showsRoute}${apiAppend}${apiKey}`)
  .then((response) => {
    //Call this function to generate the Title for all viewports and headings of the shows table which will only be displayed on tablet and desktop viewports
    const responseData = response.data;
    const headingsArray = ["Date", "Venue", "Location"];
    showTitleAndHeadings();
    // console.log(responseData);
    responseData.forEach((showItem) => {
      generateShowSchedule(showItem);
      // console.log(showItem);
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

  // eventListener(articleEl);

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
}

//   <article class="tickets">
//   <p class="tickets__date-title tickets__date-title--hide-tablet">
//     Date
//   </p>
//   <p class="tickets__date">Mon Sept 06 2021</p>
//   <p class="tickets__venue-title tickets__venue-title--hide-tablet">
//     Venue
//   </p>
//   <p class="tickets__venue">Ronald Lane</p>
//   <p
//     class="tickets__location-title tickets__venue-title--hide-tablet"
//   >
//     Location
//   </p>
//   <p class="tickets__location">San Francisco, CA</p>
//   <a href="./index.html" class="tickets__buy-button">Buy Tickets</a>
// </article>



// function automateCreateElement(variable, className, articleEl, content) {
//   if (content === undefined && variable != buttonEl) {
//     let variableCopy = elementCopy(variable);
//     variableCopy.classList.add(className);
//     articleEl.appendChild(variableCopy);
//     console.log(variableCopy);
//   } else if (variable === "none") {
//     let item = document.createElement("p");
//     item.classList.add(className);
//     articleEl.appendChild(item);
//     item.innerText = content;
//     console.log(item);
//   } else {
//     let variableCopy = elementCopy(variable);
//     variableCopy.classList.remove(className);
//     articleEl.appendChild(variableCopy);
//   }
// }
