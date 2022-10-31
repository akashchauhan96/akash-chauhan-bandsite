//Retrieve comments from API and crate const variables to store different parts of the url
const apiKey = "0410893d-95ca-4b10-aac2-d2e6085283f1";
const apiAppend = "?api_key=";
const url = "https://project-1-api.herokuapp.com/";
const commentsRoute = "comments/";

//Invoke the commentsRetrieve function which use axious .get promise function to acquire comments from the API and sorts it by newest timestamp. 
commentsRetrieve();

//Add an event listener on the HTML form 
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

    //Axious post the new comment object created earlier with the name and comment properties onto the api route
    axios
      .post(`${url}${commentsRoute}${apiAppend}${apiKey}`, newObjectComment) 

      .then(() => {
        //With the new comment posted, invoke the comments retrieve function to now get the new array from api and show both the old and the new comment that was added
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
    
    //Using sort to show the most recent comments first by arranging the timestamp with the highest value to show up on the first index of the array
    responseData.sort((a,b) => {
      return b.timestamp - a.timestamp;
    })

    //Clear the comments array containing any existing comments
    document.querySelector(".comment-array").innerHTML = "";

    //Use forEach function to pass each timestamp from each object to the dateGenerator function so it can convert it to the right date format
    responseData.forEach((comment) => {
      comment.timestamp = dateGenerator(comment.timestamp);
    })

    //With comments sorted with the most recent appearing on top and containing the dates in the right format display the comments on the page
    responseData.forEach(displayComment);
  })
  //catch any errors and console log the error if the promise fails
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

//This function checks to see if the name field and comment field is filled or not. If not, then highlight the borders of the field in red after the submit comment button is clicked
function fieldsCompletedCheck(name, comment) {
  //Both name and comment fields are highlighted in red
  if (name === "" && comment === "") {
    const nameError = document.querySelector("#name");
    const commentError = document.querySelector("#comment");
    nameError.classList.add("comment-form__name--error");
    commentError.classList.add("comment-form__comment--error");
    return;
  }

  //If comment is filled and name is not only apply the error class to name and remove error class from comment
  else if (name === "" && comment) {
    const nameError = document.querySelector("#name");
    nameError.classList.add("comment-form__name--error");
    const commentError = document.querySelector("#comment");
    commentError.classList.remove("comment-form__comment--error");
    return;
  }

  //If comment is empty but name is filled out apply the error class to comment but remove it from name
  else if (comment === "" && name) {
    const nameError = document.querySelector("#name");
    const commentError = document.querySelector("#comment");
    commentError.classList.add("comment-form__comment--error");
    nameError.classList.remove("comment-form__name--error");
    return;
  }

  //If both fields are filled out ensure to remove error classes form the both the fields and return back to event listener function to execute the other functions
  else {
    const nameError = document.querySelector("#name");
    const commentError = document.querySelector("#comment");
    nameError.classList.remove("comment-form__name--error");
    commentError.classList.remove("comment-form__comment--error");
    return;
  }
}
