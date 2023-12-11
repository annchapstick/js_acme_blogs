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