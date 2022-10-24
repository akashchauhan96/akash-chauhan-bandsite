//array of comments, name, and dates
let comments = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

//displayComment function creates generates the comments via DOM already established in the array
displayComment(comments);

function displayComment(commentList) {
  for (let i = 0; i < commentList.length; i++) {
    const commentArrayEl = document.querySelector(".comment-array");
    const commentArrayContEl = document.createElement("article");
    commentArrayContEl.classList.add("comment-array__container");
    commentArrayEl.appendChild(commentArrayContEl);

    const avatarContEl = document.createElement("div");
    avatarContEl.classList.add("comment-array__avatar-container");
    commentArrayContEl.appendChild(avatarContEl);

    const containerNoImgEl = document.createElement("div");
    containerNoImgEl.classList.add("comment-array__container-no-image");
    commentArrayContEl.appendChild(containerNoImgEl);

    const nameDateWrapperEl = document.createElement("div");
    nameDateWrapperEl.classList.add("comment-array__name-date-wrapper");
    containerNoImgEl.appendChild(nameDateWrapperEl);

    const nameArrayEl = document.createElement("p");
    nameArrayEl.classList.add("comment-array__name");
    nameArrayEl.innerText = commentList[i].name;
    nameDateWrapperEl.appendChild(nameArrayEl);

    const dateArrayEl = document.createElement("p");
    dateArrayEl.classList.add("comment-array__date");
    dateArrayEl.innerText = commentList[i].date;
    nameDateWrapperEl.appendChild(dateArrayEl);

    const commentEl = document.createElement("p");
    commentEl.classList.add("comment-array__comment");
    commentEl.innerText = commentList[i].comment;
    containerNoImgEl.appendChild(commentEl);
  }
}

//function below gets the right format for the date to be added into the comment list
function dateGenerator(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const formEl = document.getElementById("form");
console.log(formEl);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = e.target.name.value;
  let comment = e.target.comment.value;

  const newObjectComment = {
    name: name,
    date: dateGenerator(new Date()),
    comment: comment,
  };

  //The two lines of code below clear the input fields
  e.target.name.value = "";
  e.target.comment.value = "";

  //Render a new "empty" comment list
  const newCommentArrayEl = document.querySelector(".comment-array");
  newCommentArrayEl.innerHTML = "";
  displayComment(newCommentArrayEl);

  //Populate the first index of the existing array with the new object you generated after gathering name and comment info of the new user
  comments.unshift(newObjectComment);

  //Run the function again and see the magic happen!!!!!!
  displayComment(comments);
});

//ALL CODE BELOW IS THE HTML STRUCTUE FOR THE COMMENTS LIST SECTION TO BE USED AS REFRENCE FOR JAVASCRIPT DOM

/* <article class="comment-array">
<div class="comment-array__avatar-container">
  <!-- <img
    src="./assets/images/Mohan-muruge.jpg"
    alt="avatar image of the person submitting comment"
    class="comment-section__avatar-image"
  /> -->
</div>
<div class="comment-array__container-no-image">
  <div class="comment-array__name-date-wrapper">
    <p class="comment-array__name">Connor Walton</p>
    <p class="comment-array__date">02/17/2021</p>
  </div>
  <p class="comment-array__comment">
    This is art. This is inexplicable magic expressed in the purest
    way, everything that makes up this majestic work deserves
    reverence. Let us appreciate this for what it is and what it
    contains.
  </p>
</div>
</article> */
