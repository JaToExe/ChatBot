const items = document.querySelectorAll('.item');
const sendBtn = document.querySelector('.sendBtn');
let theme = "Odpowiedaj na wszysko";

items.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.add('active');

        if (item.textContent === "🌍 niespecyfikowane") {
            theme = "Polecenie: Odpowiedaj na wszysko po tym:";
        } else if (item.textContent === "💻 programosanie") {
            theme = "Polecenie: Odpowiedaj na wszysko po tym, ale kładź nacisk na programowanie";
        } else if (item.textContent === "➗ matematyka") {
            theme = "Polecenie: Odpowiedaj na wszysko po tym, ale kładź nacisk na matematyka, staraj się wszystko wytłumaczyć";
        } else if (item.textContent === "📖 📚 humanistyczne") {
            theme = "Polecenie: Odpowiedaj na wszysko po tym, ale kładź nacisk na humanistyke, staraj się wszystko wytłumaczyć (bedź kreatywny)";
        }

        items.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });
    })
});

sendBtn.addEventListener('click', () => {
    sendMessage(theme);
});

addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage(theme);
    }
});


function sendMessage(theme) {
    const inputElement = document.querySelector('.input');
    const input = inputElement.value.trim();
    const textBox = document.querySelector('.textBox');

    if (input === "") {
        return;
    } else {
        textBox.innerHTML += `<div class="userText"><p><div class="displayflex"><span class="material-symbols-outlined">person</span></div><p>${input}</p></p></div>`;
    
        generateResponse(input, theme);

        inputElement.value = "";
    }
}


async function generateResponse(input, theme) {
    try {
        const response = await fetch('https://aichatbotserver-3wrb.onrender.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input, theme: theme })
        });

        if (!response.ok) {
            const errorText = await response.text();
            showResponse("Bot", `Wystąpił błąd: ${response.status} - ${errorText}`);
            return;
        }

        const data = await response.json();
        if (response.ok) {
            showResponse("Bot", data.reply);
        } else {
            showResponse("Bot", `Wystąpił błąd: ${data.reply}`);
        }
    } catch (error) {
        showResponse("Bot", "Wystąpił błąd. Sprawdź konsolę przeglądarki. Upewnij się, że serwer działa.");
        console.error("Błąd:", error);
    }
}

function showResponse(name, reply) {
    const textBox = document.querySelector('.textBox');
    textBox.innerHTML += `<div class="botText"><p><div class="displayflex"><span class="material-symbols-outlined">robot_2</span></div><p>${reply}</p></p></div>`;
}
