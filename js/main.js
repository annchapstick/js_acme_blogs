//code by Anastasia Chaplin

/*
1. createElemWithText
a. Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is an empty string.
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element.
*/

function createElemWithText(HTMLele = "p", textContent = "", className) {
    //creates new htmlele
    const newHTMLele = document.createElement(HTMLele);
    //makes textcontent... text content
    newHTMLele.textContent = textContent;
    //if classname exist, add newHTMLele to class
    if (className) {
        newHTMLele.classList.add(className);
    }
    return newHTMLele;
}

/*
createSelectOptions
a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
b. For testing (not in function) you may want to define users with the test data.
c. Receives users JSON data as a parameter
d. Returns undefined if no parameter received
e. Loops through the users data
f. Creates an option element for each user with document.createElement()
g. Assigns the user.id to the option.value
h. Assigns the user.name to the option.textContent
i. Return an array of options elements
*/

function createSelectOptions(userJSON) {
    //test parameter exists, if not return
    if (!userJSON) return;
    const optionArray = [];
    //create an option foreach user, assign value and textcontent
    userJSON.forEach(user => {
        const userOption = document.createElement("option")
        userOption.value = user.id;
        userOption.textContent = user.name;
        optionArray.push(userOption);
    })
    return optionArray;
}

/*
3. toggleCommentSection
a. Receives a postId as the parameter
b. Selects the section element with the data-post-id attribute equal to the postId
received as a parameter
c. Use code to verify the section exists before attempting to access the classList
property
d. At this point in your code, the section will not exist. You can create one to test if
desired.
e. Toggles the class 'hide' on the section element
f. Return the section element
*/

function toggleCommentSection(postId) {
    //return undefined if postId not provided
    if (!postId) return;
    //b.
    const section = document.querySelector(`section[data-post-id='${postId}']`);
    //verify section, toggle hide
    if (section) {
        section.classList.toggle('hide');
    }
    //if parameter does not match a postID, return null
    else {
        return null;
    }
    return section;
}

/*
4. toggleCommentButton
a. Receives a postId as the parameter
b. Selects the button with the data-post-id attribute equal to the postId received as a
parameter
c. If the button textContent is 'Show Comments' switch textContent to 'Hide
Comments'
d. If the button textContent is 'Hide Comments' switch textContent to 'Show
Comments'
e. Suggestion (not required) for above: try a ternary statement
f. Return the button element
*/

function toggleCommentButton(postId) {
    //return undefined if postId not provided
    if (!postId) return;
    //b.
    const button = document.querySelector(`button[data-post-id='${postId}']`);
    //verifies button, change textContent
    if (button) {
        (button.textContent === 'Show Comments') ? button.textContent = 'Hide Comments' : button.textContent = 'Show Comments';
    }
    //return null if parameter does not match postid
    else {
        return null;
    }
    return button;
}

/*
5. deleteChildElements
a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement
*/

function deleteChildElements(parentElement) {
    //return unfedined if not an HTML element
    if (!parentElement?.tagName) return;
    //define child
    let child = parentElement.lastElementChild;
    //while child exists, d & e
    while(child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}

/*
6. addButtonListeners
a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. If a postId exists, add a click event listener to the button (reference
addEventListener) - inside the loop so this happens to each button
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the
event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. The listener
test will NOT pass for addButtonListeners until toggleComments is completed.
Nevertheless, I recommend waiting on the logic inside the toggleComments
function until we get there.
*/

function addButtonListeners() {
    //select all buttons in main
  const buttons = document.querySelectorAll("main button");
  const selectedButtons = [];
  //loop through each button in list
  buttons.forEach(button => {
    const postId = button.dataset.postId;
    //if postId exists...
    if (postId) {
      button.addEventListener('click', (event) => toggleComments(event, postId));
      selectedButtons.push(button);
    }
  });
    //return array of selected buttons
    return selectedButtons;
}

/*
7. removeButtonListeners
a. Selects all buttons nested inside the main element
b. Loops through the NodeList of buttons
c. Gets the postId from button.dataset.id
d. If a postId exists, remove the click event listener from the button (reference
removeEventListener) - inside the loop so this happens to each button
e. Refer to the addButtonListeners function as this should be nearly identical
f. Return the button elements which were selected

*/

function removeButtonListeners() {
    //select buttons in main
    const buttons = document.querySelectorAll("main button");
    const selectedButtons = [];
    //loop through each button in list
    buttons.forEach(button => {
        const postId = button.dataset.postId;
        //if postId exist...
        if (postId) {
            button.removeEventListener('click', (event) => toggleComments(event, postId));
            selectedButtons.push(button);
        }
    });
    //return array of selected buttons
    return selectedButtons;
}

/*
8. createComments
a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:
${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element
*/

function createComments(JSONcomment) {
    //check if param exist
      if (!JSONcomment) return;
      let fragment = document.createDocumentFragment();
    //for each comment, f-k
      JSONcomment.forEach(comment => {
          let article = document.createElement("article");
          const h3 = createElemWithText('h3', comment.name);
          const p1 = createElemWithText('p', comment.body);
          const p2 = createElemWithText('p', `From: ${comment.email}`);
          article.append(h3);
          article.append(p1);
          article.append(p2);
          fragment.append(article);
      })
      return fragment;
  }

/*
9. populateSelectMenu
a. Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the
select menu
g. Return the selectMenu element
*/

function populateSelectMenu(JSONuser) {
    //check if param exist
    if (!JSONuser) return;
    const select = document.getElementById("selectMenu");
    const options = createSelectOptions(JSONuser);
    options.forEach(option => {
        select.append(option);
    })
    return select;
}

function toggleComments(a, b) {}