//retrieve comments from API
const apiKey = "62f3dbfe-ee60-419a-b9f6-22a96317578a";
const apiAppend = "?api_key=";
const url = "https://project-1-api.herokuapp.com/";
const commentsRoute = "comments/";

commentsRetrieve();
// console.log(commentsList);

// for (let i=0; i<commentsList.length; i++) {
//   displayComment(commentsList[i]);
// }


const formEl = document.getElementById("form");
console.log(formEl);
      
formEl.addEventListener("submit", (e) => {
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

    console.log(name);

    axios
      .post(`${url}${commentsRoute}${apiAppend}${apiKey}`, newObjectComment) 

      .then(() => {
        // const axiousGet = axios.get(`${url}${commentsRoute}${apiAppend}${apiKey}`)
        // axiousGet.then((response) => {
        // const responseData = response.data;
        // if (responseData.length > 2) {
        //   const newComment = responseData.pop();
        //   responseData.unshift(newComment);
        // }
        commentsRetrieve();
      })
      .catch((err) => {
        console.log(err);
      })
  }




      //Render a new "empty" comment list
      // const newCommentArrayEl = document.querySelector(".comment-array");
      // newCommentArrayEl.innerHTML = "";
      // displayComment(newCommentArrayEl);
        
      //Populate the first index of the existing array with the new object you generated after gathering name and comment info of the new user
      
      // comments.unshift(newObjectComment);
        
      //Run the function again and see the magic happen!!!!!!
      
      // displayComment(comments);
});


//axios get function that retrieves the comment array living in the api
function commentsRetrieve() {
  const axiousGet = axios.get(`${url}${commentsRoute}${apiAppend}${apiKey}`)
  axiousGet.then((response) => {
    const responseData = response.data;
    console.log(responseData);

    // let maxtimestamp = 0;
    const newCommentsArray = [];
    
    //Using sort to show the most recent comments first by arranging the timestamp with the highest value to show up on
    responseData.sort((a,b) => {
      return b.timestamp - a.timestamp;
    })

    console.log(responseData);



    // for(let i=0; i<responseData.length; i++) {
    //   if (responseData[i].timestamp > maxtimestamp) {
    //     newCommentsArray.unshift(responseData[i]);
    //     maxtimestamp = responseData[i].timestamp;
    //   }
    //   else {
    //     newCommentsArray.push(responseData[i]);
    //   }
    // }

    // console.log(newCommentsArray);

    document.querySelector(".comment-array").innerHTML = "";

    //Timestamp conversion from epoch format to day/month/year date format
    for (let i=0; i<newCommentsArray.length; i++) {
      newCommentsArray[i].timestamp = dateGenerator(newCommentsArray[i].timestamp);
      displayComment(newCommentsArray[i])
    }
    

    // console.log(newCommentsArray);

    responseData.forEach(displayComment);

  
    // console.log(responseData);

  })
  axiousGet.catch((err) => {
  console.log(err);
  })
}


//function below gets the right format for the date to be added into the comment list
function dateGenerator(date) {
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

// function commentSorter(array) {
//   for (let i=0; i<array.length; i++) {
//     const date = new Date(array[i].timestamp); 
//     const year = date.getFullYear();
//     const month = date.getMonth()+1;
//     const day = date.getDate();
//     if ()
//   }
// }

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
