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

async function createSelectOptions(userJSON) {
    //test parameter exists, if not return
    if (!userJSON) {
        return;
    }
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