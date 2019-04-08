
var form = document.getElementsByName("addComment")[0];
var commentList = document.querySelector(".comments");
var answerBlock = document.querySelector(".status");


// Функция вывода статуса
function printResult(type, status) {
    answerBlock.classList.remove(`status_type_${!type}`);
    answerBlock.classList.add(`status_type_${type}`);
    answerBlock.textContent = status;
}

// Загружаем с базы комменарии
function loadFromDatabase() {
    let loadPromise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../../ajax/load.php", true);

        xhr.onload = function() {
            let res = JSON.parse(xhr.response);
            resolve(res);
        };
        xhr.send();
    });

    loadPromise.then(function(res) {
        for(let i = 0; i < res.length; i++) {
            let item = res[i];

            if(document.querySelector("li[id='" + item.id + "']")) {
                continue;
            }else {
                let comment = document.createElement("li");
                let title = document.createElement("div");
                let email = document.createElement("div");
                let text = document.createElement("div");

                comment.classList.add("comments__item", "comment");
                comment.setAttribute("id", item.id);

                title.classList.add("comment__title");
                email.classList.add("comment__email");
                text.classList.add("comment__text");

                title.textContent = item.name;
                email.textContent = item.email;
                text.textContent = item.text;

                comment.appendChild(title);
                comment.appendChild(email);
                comment.appendChild(text);

                commentList.appendChild(comment);
            }
        };

    });
}
loadFromDatabase();

// Загружаем в базу комментарий
if(form) {
    form.querySelector("button").addEventListener("click", function(e) {
        e.preventDefault();

        let writePromise = new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "../../ajax/write.php", true);

            let data = new FormData();
            data.append("name", form["name"].value);
            data.append("email", form["email"].value);
            data.append("text", form["text"].value);

            xhr.onload = function() {
                let res = xhr.responseText.trim();
                if(res === "ok") {
                    resolve("Комментарий успешно добавлен");
                }else {
                    reject(res);
                }
            }
            xhr.send(data);

            answerBlock.textContent = "Идет загрузка комментария ...";
        });

        writePromise.then(function() {
            printResult(true, "Комментарий успешно добавлен");

            form["name"].value = "";
            form["email"].value = "";
            form["text"].value = "";

            setTimeout(function() {
                answerBlock.textContent = "";
                answerBlock.style.display = "none";
            }, 5000);

            loadFromDatabase();
        }, function(e) {
            printResult(false, e);
        });
    })
}