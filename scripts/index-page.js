//Retrieve comments from API and crate const variables to store different parts of the url
const apiKey = "34cc7d80-a8b6-475b-b5d1-a42a2681b421";
const apiAppend = "?api_key=";
const url = "https://project-1-api.herokuapp.com/";
const commentsRoute = "comments/";

//Invoke the commentsRetrieve function which use axious .get promise function to acquire comments from the API and sorts it by newest timestamp. 
commentsRetrieve();

//Add an event listener on the HTML form denoted with #form  
document.getElementById("form").addEventListener("submit", (e) => {
  console.log(e);
  e.preventDefault();
  let name = e.target.name.value;
  let comment = e.target.comment.value;

  //Invoke the fieldComepletedCheck function to see if the name field and comment text area is filled out
  fieldsCompletedCheck(name, comment);

  //If fields are complete create the new comment object
  if (name && comment) {
    const newObjectComment = {
      name: name,
      comment: comment,
    };

    //The two lines of code below clear the input fields of the HTML form
    e.target.name.value = "";
    e.target.comment.value = "";

    axios
      .post(`${url}${commentsRoute}${apiAppend}${apiKey}`, newObjectComment) 

      .then(() => {
        commentsRetrieve();
      })
      .catch((err) => {
        console.log(err);
      })
  }
});


//axios get function that retrieves the comment array living in the api
function commentsRetrieve() {
  const axiousGet = axios.get(`${url}${commentsRoute}${apiAppend}${apiKey}`)
  axiousGet.then((response) => {
    const responseData = response.data;
    console.log(responseData);
    
    //Using sort to show the most recent comments first by arranging the timestamp with the highest value to show up on
    responseData.sort((a,b) => {
      return b.timestamp - a.timestamp;
    })

    document.querySelector(".comment-array").innerHTML = "";

    responseData.forEach((comment) => {
      comment.timestamp = dateGenerator(comment.timestamp);
    })

    responseData.forEach(displayComment);
  })
  axiousGet.catch((err) => {
  console.log(err);
  })
}


//function below gets the right format for the date to be added into the comment list
function dateGenerator(date) {
  console.log(date);
  const newDate = new Date(date);
  let month = newDate.getMonth() + 1;
  if (month<10) {
    month = `0${month}`;
  }
  let day = newDate.getDate();
  if (day<10) {
    day = `0${day}`;
  }
  const year = newDate.getFullYear();
  return `${month}/${day}/${year}`;
}

//function displayComment that takes one input as parameter
function displayComment(newComment) {
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
  nameArrayEl.innerText = newComment.name;
  nameDateWrapperEl.appendChild(nameArrayEl);
  
  const dateArrayEl = document.createElement("p");
  dateArrayEl.classList.add("comment-array__date");
  dateArrayEl.innerText = newComment.timestamp;
  nameDateWrapperEl.appendChild(dateArrayEl);
  
  const commentEl = document.createElement("p");
  commentEl.classList.add("comment-array__comment");
  commentEl.innerText = newComment.comment;
  containerNoImgEl.appendChild(commentEl);
}


function fieldsCompletedCheck(name, comment) {
  if (name === "" && comment === "") {
    const nameError = document.querySelector("#name");
    const commentError = document.querySelector("#comment");
    nameError.classList.add("comment-form__name--error");
    commentError.classList.add("comment-form__comment--error");
    return;
  }

  else if (name === "" && comment) {
    const nameError = document.querySelector("#name");
    nameError.classList.add("comment-form__name--error");
    const commentError = document.querySelector("#comment");
    commentError.classList.remove("comment-form__comment--error");
    return;
  }

  else if (comment === "" && name) {
    const nameError = document.querySelector("#name");
    const commentError = document.querySelector("#comment");
    commentError.classList.add("comment-form__comment--error");
    nameError.classList.remove("comment-form__name--error");
    return;
  }

  else {
    const nameError = document.querySelector("#name");
    const commentError = document.querySelector("#comment");
    nameError.classList.remove("comment-form__name--error");
    commentError.classList.remove("comment-form__comment--error");
    return;
  }
}
