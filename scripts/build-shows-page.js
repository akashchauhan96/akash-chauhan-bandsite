const mainEl = document.querySelector("main");
console.log(mainEl);
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
buttonEl.setAttribute("href", "../index.html");
buttonEl.innerText = "Buy Tickets";
columnHeadingsEl.appendChild(buttonEl);

const shows = [
  {
    date: ["Mon Sept 06 2021", "Tue Sept 21 2021", "Fri Oct 15 2021"],
    venue: ["Ronald Lane", "Pier 3 East", "View Lounge"],
    location: ["San Francisco, CA", "San Francisco, CA", "San Francisco, CA"],
  },
];

generateShowSchedule(shows);

function elementCopy(element) {
  return element.cloneNode(true);
}

function generateShowSchedule(showList) {
  for (let i = 0; i < showList[0].date.length; i++) {
    let articleEl = document.createElement("article");
    articleEl.classList.add("tickets");
    showsContainerEl.appendChild(articleEl);

    automateCreateElement(
      dateTitleEl,
      "tickets__date-title--hide-tablet",
      articleEl
    );

    automateCreateElement(
      "none",
      "tickets__date",
      articleEl,
      showList[0].date[i]
    );
    automateCreateElement(
      venueTitleEl,
      "tickets__venue-title--hide-tablet",
      articleEl
    );
    automateCreateElement(
      "none",
      "tickets__venue",
      articleEl,
      showList[0].venue[i]
    );
    automateCreateElement(
      locationTitleEl,
      "tickets__location-title--hide-tablet",
      articleEl
    );
    automateCreateElement(
      "none",
      "tickets__location",
      articleEl,
      showList[0].location[i]
    );
    automateCreateElement(
      buttonEl,
      "tickets__buy-button--visibility-hidden",
      articleEl
    );

    // buttonEl.classList.remove(
    // "tickets__buy-button--visibility-hidden"
    // );
    // buttonEl.setAttribute("href", "../index.html");
    // .appendChild(buttonEl);
  }
}

function automateCreateElement(variable, className, articleEl, content) {
  if (content === undefined && variable != buttonEl) {
    let variableCopy = elementCopy(variable);
    variableCopy.classList.add(className);
    articleEl.appendChild(variableCopy);
    console.log(variableCopy);
  } else if (variable === "none") {
    let item = document.createElement("p");
    item.classList.add(className);
    articleEl.appendChild(item);
    item.innerText = content;
    console.log(item);
  } else {
    let variableCopy = elementCopy(variable);
    variableCopy.classList.remove(className);
    articleEl.appendChild(variableCopy);
  }
}

/* <section class="shows-table">
<div class="shows-table__container">
  <h2 class="shows-table__title">Shows</h2>
  <!-- This div container below will be hidden in mobile but will be display: block on tablet and desktop -->
  <div class="tickets__column-headings--hide-mobile">
    <p class="tickets__date-title">Date</p>
    <p class="tickets__venue-title">Venue</p>
    <p class="tickets__location-title">Location</p>
    <a
      href="./index.html"
      class="tickets__buy-button tickets__buy-button--visibility-hidden"
    >
      Buy Tickets
    </a>
  </div>
  <article class="tickets">
    <p class="tickets__date-title tickets__date-title--hide-tablet">
      Date
    </p>
    <p class="tickets__date">Mon Sept 06 2021</p>
    <p class="tickets__venue-title tickets__venue-title--hide-tablet">
      Venue
    </p>
    <p class="tickets__venue">Ronald Lane</p>
    <p
      class="tickets__location-title tickets__venue-title--hide-tablet"
    >
      Location
    </p>
    <p class="tickets__location">San Francisco, CA</p>
    <a href="./index.html" class="tickets__buy-button">Buy Tickets</a>
  </article>
</div>
</section> */
