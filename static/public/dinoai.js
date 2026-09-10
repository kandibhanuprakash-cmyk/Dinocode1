
const userInput =
    document.getElementById("userInput");

const sendButton =
    document.getElementById("sendButton");

const chatMessages =
    document.getElementById("chatMessages");


// =====================================
// ENTER KEY
// =====================================

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});


// =====================================
// SUGGESTION BUTTON
// =====================================

function askQuestion(question) {

    userInput.value = question;

    sendMessage();

}


// =====================================
// SEND MESSAGE
// =====================================

async function sendMessage() {

    const message =
        userInput.value.trim();


    if (!message) {

        return;

    }


    // Show user message

    addMessage(message, "user");


    // Clear input

    userInput.value = "";


    // Disable send

    sendButton.disabled = true;


    // Loading

    const loading =
        addMessage(
            "Dino AI is thinking...",
            "ai"
        );


    try {

        const response = await fetch(
            "/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        const data =
            await response.json();


        // Remove loading

        loading.remove();


        if (!response.ok) {

            addMessage(
                data.error ||
                "Something went wrong.",
                "ai"
            );

            return;

        }


        // AI response

        addMessage(
            data.response,
            "ai"
        );


    } catch (error) {

        console.error(error);


        loading.remove();


        addMessage(
            "Unable to connect to Dino AI. Please try again.",
            "ai"
        );


    } finally {

        sendButton.disabled = false;

        userInput.focus();

    }

}


// =====================================
// ADD MESSAGE
// =====================================

function addMessage(text, sender) {

    const message =
        document.createElement("div");


    message.classList.add(
        "message"
    );


    if (sender === "user") {

        message.classList.add(
            "user-message"
        );

    }


    const avatar =
        document.createElement("div");

    avatar.classList.add("avatar");

    avatar.textContent =
        sender === "user"
            ? "👤"
            : "🤖";


    const bubble =
        document.createElement("div");

    bubble.classList.add("bubble");


    const name =
        document.createElement("strong");

    name.textContent =
        sender === "user"
            ? "You"
            : "Dino AI";


    const paragraph =
        document.createElement("p");

    paragraph.textContent = text;


    bubble.appendChild(name);

    bubble.appendChild(paragraph);


    message.appendChild(avatar);

    message.appendChild(bubble);


    chatMessages.appendChild(message);


    // Scroll to bottom

    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return message;

}


