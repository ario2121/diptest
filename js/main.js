let form = document.querySelector(".form");
let seeAnswer = document.querySelector("#see-answer");
let questions = [];

// ✅ خواندن فایل txt
fetch("./data/questions.txt")
    .then(response => response.text())
    .then(text => {
        // هر خط رو جدا کن
        let lines = text.split("\n");

        lines.forEach(line => {
            line = line.trim();
            if (line) {
                // از | به عنوان جداکننده سوال و جواب استفاده می‌کنیم
                let parts = line.split("|");
                if (parts.length >= 2) {
                    questions.push({
                        question: parts[0].trim(),
                        answer: parts[1].trim()
                    });
                }
            }
        });

        console.log("سوال‌ها با موفقیت لود شدند:", questions.length);
    })
    .catch(error => {
        console.error("خطا در خواندن فایل:", error);
    });

// ✅ رویداد جستجو
form.question.addEventListener("keyup", e => {
    let value = e.target.value.trim();

    if (value) {
        let an = searcher(value.split(" "), questions);
        seeAnswer.innerHTML = an || `<i class="text-danger">چیزی پیدا نشد!</i>`;
    } else {
        seeAnswer.innerHTML = `<i>چیزی بنویسید...</i>`;
    }
});

// ✅ تابع جستجو
function searcher(words, questions) {
    let answer = "";

    questions.forEach(q => {
        let counter = 0;

        words.forEach(word => {
            if (word && q.question.includes(word)) {
                counter++;
            }
        });

        if (counter >= words.length) {
            answer += `
                <div class="mb-3">
                    <h5 class="text-right">${q.question}</h5>
                    <h3 class="text-center">
                        <span class="badge badge-success">${q.answer}</span>
                    </h3>
                    <hr>
                </div>
            `;
        }
    });

    return answer;
}