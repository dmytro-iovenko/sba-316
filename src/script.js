const messages = [
  {
    id: 1,
    title: "Mary Sue",
    text: "Hi, I'm looking for wireless noise-canceling headphones.",
    is_outgoing: true,
  },
  {
    id: 2,
    title: "Mary Sue",
    text: "Ideally white ones.",
    is_outgoing: true,
  },
  {
    id: 3,
    title: "John Doe",
    text: "Hi Tina, sure, check these out!",
    is_outgoing: false,
  },
  {
    id: 4,
    title: "John Doe",
    text: "www.perfectsoud.com/GTXmasterheadphones",
    is_outgoing: false,
  },
  {
    id: 5,
    title: "John Doe",
    // https://www.pexels.com/photo/black-cordless-headphone-in-black-pouch-2080611/
    image: {
      src: "https://images.pexels.com/photos/2080611/pexels-photo-2080611.jpeg?auto=compress&cs=tinysrgb&w=320",
      alt: "GT-R-6",
    },
    is_outgoing: false,
  },
  {
    id: 6,
    title: "John Doe",
    text: "Customers love their durability too - just take a look at the reviews.",
    is_outgoing: false,
  },
  {
    id: 7,
    title: "Mary Sue",
    text: "Looking good! What's their battery life on a single charge? And are they foldable?",
    is_outgoing: true,
  },
  {
    id: 8,
    title: "John Doe",
    text: "You can listen to 20 hours of music on a single charge! They are foldable and come with a trave case.",
    is_outgoing: false,
  },
  {
    id: 9,
    title: "Mary Sue",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    // https://tenor.com/gifapi/documentation#quickstart
    image: {
      src: "https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866",
    },
    is_outgoing: true,
  },
];

const storage = window.localStorage;
const chatContainer = document.querySelector(".chat-container");

const createRegistrationForm = (parent = document) => {
  // Using an HTML template clone
  const registrationTemplate = document.getElementById("registration-template");
  const clone = registrationTemplate.content.cloneNode(true);
  const form = clone.getElementById("registration");
  parent.prepend(clone);
  return form;
};
// Create Registration Form using template
const registrationForm = createRegistrationForm(chatContainer);
// Handle Registration Form submission
registrationForm.addEventListener("submit", handleRegistration);

function handleRegistration(event) {
  // Prevent default submit logic
  event.preventDefault();
  // Get Registration Form element
  const registrationForm = event.target;
  try {
    // Perform Name Validation
    const nameEl = registrationForm.elements.name;
    validateName(nameEl);
    // Perform Email Validation
    const emailEl = registrationForm.elements.email;
    validateEmail(emailEl);
    /** Registration Form - Form Submission */
    // Generate username from user's name
    const username = nameEl.value.split(" ").join("_").toLowerCase();
    // Convert email to all lowercase before being stored.
    const email = emailEl.value.toLowerCase();
    // If all validation is successful, store the username, email, and password using localStorage.
    storage.setItem(
      username,
      JSON.stringify({
        username: username,
        name: nameEl.value,
        email: email,
      })
    );
    // Clear all form fields after successful submission
    registrationForm.reset();
    console.log("OK");
  } catch (err) {
    displayError(err.message);
    console.log(err);
  }

  // Registration Form - Username Validation:
  function validateName(element) {
    try {
      //The name cannot be blank.
      if (element.value === "") {
        throw new Error("The name cannot be blank.");
      }
      //The name must be at least four characters long.
      if (element.value.length < 4) {
        throw new Error("The name must be at least four characters long.");
      }
      //The username must contain at least two unique characters.
      if (element.value.match(/^(.)\1+$/)) {
        throw new Error(
          "The name must contain at least two unique characters."
        );
      }
      //The name must not contain any special characters.
      if (element.value.match(/[^A-Za-z ]/)) {
        throw new Error("The name must not contain any special characters.");
      }
      //The name must not contain leading or trailing spaces.
      if (element.value.match(/^\s|\s$/)) {
        throw new Error(
          "The name must not contain leading or trailing spaces."
        );
      }
    } catch (err) {
      element.focus();
      throw new Error(err);
    }
  }
  // Registration Form - Email Validation:
  function validateEmail(element) {
    try {
      //The email must be a valid email address.
      if (!element.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)) {
        throw new Error("The email must be a valid email address.");
      }
      //The email must not be from the domain "example.com"
      if (element.value.match(/example\.com$/i)) {
        throw new Error('The email must not be from the domain "example.com"');
      }
    } catch (err) {
      element.focus();
      throw new Error(err);
    }
  }
  // Display error
  function displayError(error) {
    const errorDisplay = document.getElementById("error-display");
    errorDisplay.textContent = error;
    errorDisplay.style.display = "block";
    setTimeout(() => {
      errorDisplay.style.display = "none";
    }, 2000);
  }
}

const chatMessages = document.getElementById("chat-messages");
const messageForm = document.getElementById("message-form");
const messageText = document.getElementById("message-text");
const sendButton = document.getElementById("send-btn");

// A builder function to create message in the chat
const createMessage = (message = {}) => {
  // Creating a DocumentFragment
  const frag = document.createDocumentFragment();
  const chat = frag.appendChild(document.createElement("div"));
  chat.classList.add("chat-message");
  chat.classList.add(message.is_outgoing ? "message-out" : "message-in");
  const title = chat.appendChild(document.createElement("div"));
  title.classList.add("chat-message-title");
  title.textContent = message.title;
  const content = chat.appendChild(document.createElement("div"));
  content.classList.add("chat-message-content");
  if (message.image) {
    const image = content.appendChild(document.createElement("div"));
    image.classList.add("chat-message-image");
    const img = image.appendChild(document.createElement("img"));
    img.setAttribute("src", message.image.src);
    img.setAttribute("alt", message.image.alt);
  }
  if (message.text) {
    const text = content.appendChild(document.createElement("div"));
    text.classList.add("chat-message-text");
    text.innerHTML = message.text;
  }
  return frag;
};

// Loop through chat messages to display them
messages.forEach((message) => {
  //   chatMessages.appendChild(createMessage(message));
});

// A function to scroll content down
const scrollDown = (content) => {
  if (content.scrollHeight > content.clientHeight) {
    content.scrollTop = content.scrollHeight;
  }
};
// Scroll Chat Messages down
scrollDown(chatMessages);

// Set up message textarea to grow automatically
messageText.addEventListener("input", () => {
  const grower = messageText.parentNode;
  grower.dataset.replicatedValue = messageText.value;
  if (countLines(messageText) > 1) {
    grower.classList.remove("fixed");
  } else if (!grower.classList.contains("fixed")) {
    grower.classList.add("fixed");
  }
  // https://stackoverflow.com/a/45252226
  // Function to returns the number of lines in a textarea,
  // including wrapped lines.
  function countLines(textarea) {
    let clone = textarea.cloneNode();
    clone.style.border = "none";
    clone.style.height = "0";
    clone.style.overflow = "hidden";
    clone.style.padding = "0";
    clone.style.position = "absolute";
    clone.style.left = "0";
    clone.style.top = "0";
    clone.style.zIndex = "-1";
    clone.style.visibility = "hidden";

    textarea.parentNode.appendChild(clone);

    let cs = window.getComputedStyle(textarea);
    let pl = parseInt(cs.paddingLeft);
    let pr = parseInt(cs.paddingRight);
    let lh = parseInt(cs.lineHeight);

    // [cs.lineHeight] may return 'normal', which means line height = font size.
    if (isNaN(lh)) lh = parseInt(cs.fontSize);

    // Copy content width.
    clone.style.width = textarea.clientWidth - pl - pr + "px";

    // Copy text properties.
    clone.style.font = cs.font;
    clone.style.letterSpacing = cs.letterSpacing;
    clone.style.whiteSpace = cs.whiteSpace;
    clone.style.wordBreak = cs.wordBreak;
    clone.style.wordSpacing = cs.wordSpacing;
    clone.style.wordWrap = cs.wordWrap;

    // Copy value.
    clone.value = textarea.value;

    let result = Math.floor(clone.scrollHeight / lh);
    if (result == 0) result = 1;
    textarea.parentNode.removeChild(clone);
    return result;
  }
});

// Insert emoji to the message
const emoji = document.querySelector(".message-emoji .tab-content");
emoji.addEventListener("click", (event) => {
  if (messageText && event.target.classList.contains("emoji-icon")) {
    const [start, end] = [messageText.selectionStart, messageText.selectionEnd];
    messageText.setRangeText(event.target.textContent, start, end, "select");
    if (sendButton.disabled) sendButton.disabled = false;
  }
});

// Enable/Disable Send button
messageText.addEventListener("input", (event) => {
  if (sendButton.disabled && event.currentTarget.value !== "") {
    sendButton.disabled = false;
  } else if (event.currentTarget.value === "") {
    sendButton.disabled = true;
  }
});

// Handle sending new message
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (messageText.value === "") return;
  const message = {
    id: Date.now(),
    title: "Mary Sue",
    text: encodeHTML(messageText.value),
    is_outgoing: true,
  };
  chatMessages.appendChild(createMessage(message));
  scrollDown(chatMessages);
  resetForm();

  // Return encoded (safe) text in html format
  function encodeHTML(text) {
    const encoded = text.replace(
      /[\u00A0-\u9999<>\&]/g,
      (i) => "&#" + i.charCodeAt(0) + ";"
    );
    return encoded.split(/\r?\n/).join("<br>");
  }

  // Reset form and resize message textarea
  function resetForm() {
    const grower = messageText.parentNode;
    if (!grower.classList.contains("fixed")) {
      grower.classList.add("fixed");
    }
    messageForm.reset();
  }
});
