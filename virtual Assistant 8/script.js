let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let userInput = document.getElementById('userInput'); // Get the input field
let responseDiv = document.getElementById('response'); // Response area

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    let greeting = "";

    if (hours >= 0 && hours < 12) {
        greeting = "Good Morning";
    } else if (hours >= 12 && hours < 16) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    speak(greeting);
}

window.addEventListener('load', () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

// Update the function to handle both text input and voice commands
function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    // Use the message directly from the input field if available
    if (!message) {
        message = userInput.value.toLowerCase();
        userInput.value = ""; // Clear input after sending
    }

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Ujjwal.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let searchQuery = message.replace("ujjwal", "").replace("ujwal", "").trim();
        speak(`This is what I found on the internet regarding ${searchQuery}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
    }
}

// Add an event listener for the text input field
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        takeCommand(userInput.value); // Call takeCommand when Enter is pressed
    }
});
