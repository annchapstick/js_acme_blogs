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

/*
10. getUsers
a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data
*/

async function getUsers() {
    try {
        const userData = await fetch('https://jsonplaceholder.typicode.com/users');
        //throws error if cant fetch
        if (!userData.ok) {
            throw new Error('Data unable to be gathered');
        }
        const userJSON = await userData.json();
        return userJSON;
    } catch (error) {
        console.log(error);
    }
}

/*
11. getUserPosts
a. Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data
*/

async function getUserPosts(userId) {
    if (!userId) return;
    try {
        const postArray = [];
        const postData = await fetch('https://jsonplaceholder.typicode.com/posts');
        //throws error if cant fetch
        if (!postData.ok) {
            throw new Error('Data unable to be gathered');
        }
        const JSONposts = await postData.json();
        JSONposts.forEach(post => {
            if (post.userId === userId) {
                postArray.push(post);
            }
        })
        return postArray;
    } catch (error) {
        console.log(error);
    }
}

/*
12. getUser
a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data
*/

async function getUser(userId) {
    if(!userId) return;
    try {
        const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        //throws error if cant fetch
        if(!userData.ok) {
            throw new Error('Data unable to be gathered');
        }
        const userJSON = await userData.json();
        return userJSON;
    } catch (error) {
        console.log(error);
    }
}

/*
13. getPostComments
a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data
*/

async function getPostComments(postId) {
    if (!postId) return;
    try {
        const postComment = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        if(!postComment.ok) {
            throw new Error('Data unable to be gathered');
        }
        const postJSON = await postComment.json();
        return postJSON;
    } catch (error) {
        console.log(error);
    }
}

/*
14. displayComments
a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element
*/

async function displayComments(postId) {
    if (!postId) return;
    let section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add("comments");
    section.classList.add("hide");
    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    section.append(fragment);
    return section;
}

/*
15. createPosts
a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:
g. Create an article element with document.createElement()
h. Create an h2 element with the post title
i. Create an p element with the post body
j. Create another p element with text of `Post ID: ${post.id}`
k. Define an author variable equal to the result of await getUser(post.userId)
l. Create another p element with text of `Author: ${author.name} with
${author.company.name}`
m. Create another p element with the author’s company catch phrase.
n. Create a button with the text 'Show Comments'
o. Set an attribute on the button with button.dataset.postId = post.id
p. Append the h2, paragraphs, button, and section elements you have created to
the article element.
q. Create a variable named section equal to the result of await
displayComments(post.id);
r. Append the section element to the article element
s. After the loop completes, append the article element to the fragment
t. Return the fragment element
*/

async function createPosts(postJSONdata) {
    if (!postJSONdata) return;
    //d.
    const fragment = document.createDocumentFragment();
    for (const post of postJSONdata) {
        let article = document.createElement("article");
        //h.
        let h2 = createElemWithText('h2', post.title);
        //i.
        let p1 = createElemWithText('p', post.body);
        //j.
        let p2 = createElemWithText('p', `Post ID: ${post.id}`);
        //k.
        let author = await getUser(post.userId);
        //l. 
        let p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        //m
        let p4 = createElemWithText('p', `${author.company.catchPhrase}`);
        //n
        let button = createElemWithText('button', `Show Comments`);
        //o
        button.dataset.postId = post.id;
        //p
        article.append(h2);
        article.append(p1);
        article.append(p2);
        article.append(p3);
        article.append(p4);
        article.append(button);
        //q
        let section = await displayComments(post.id);
        //r
        article.append(section);
        //s
        fragment.append(article);
    }
    //t
    return fragment;
}

/*
16. displayPosts
a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable
*/

async function displayPosts(postData) {
    //d.
    const main = document.querySelector("main");
    //ternary - if i, then createposts but if ii. main p
    const element = (postData) ? await createPosts(postData) : document.querySelector("main p");
    //f.
    main.append(element);
    //g.
    return element;
}

function toggleComments(a, b) {}