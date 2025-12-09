function sendMessage() {
    let box = document.getElementById("chatbox");
    let input = document.getElementById("userInput");
    let text = input.value.trim();

    if (!text) return;

    let userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.innerText = text;
    box.appendChild(userMsg);

    input.value = "";
    box.scrollTop = box.scrollHeight;

    let count = Number(localStorage.getItem("chatCount") || 0);
    localStorage.setItem("chatCount", count + 1);

    setTimeout(function () {
        let reply = generateReply(text.toLowerCase());
        let botMsg = document.createElement("div");
        botMsg.className = "msg bot";
        botMsg.innerText = reply;
        box.appendChild(botMsg);
        box.scrollTop = box.scrollHeight;
    }, 500);
}

function generateReply(msg) {
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How can I help you today?";
    if (msg.includes("track")) return "Please use the tracking page to check your package.";
    if (msg.includes("delivery")) return "Deliveries usually take 2–4 days.";
    if (msg.includes("delay")) return "Some delays may happen due to transport or weather.";
    return "I can help with tracking and delivery information.";
}

function trackPackage() {
    let number = document.getElementById("trackInput").value.trim();
    let result = document.getElementById("trackResult");

    if (!number) {
        result.textContent = "Please enter a tracking number.";
        return;
    }

    let choices = ["In Transit", "Delivered", "Out for Delivery", "Delayed"];
    let status = choices[Math.floor(Math.random() * choices.length)];

    result.textContent = "Tracking Number: " + number + "\nStatus: " + status;

    let history = JSON.parse(localStorage.getItem("trackHistory") || "[]");
    history.push({ number: number, status: status });
    localStorage.setItem("trackHistory", JSON.stringify(history));
}
