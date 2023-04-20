// элементы управления
let inputName = document.querySelector("#name");
let inputTitle = document.querySelector("#jobTitle");
let inputSkills = document.querySelector("#skills");
let inputCount = document.querySelector("#count");
let okButton = document.querySelector("#submitButton");

// место для карточек
let cardsList = document.querySelector("#cards");
// место для кнопок пагинации
let pagesList = document.querySelector("#pagesList");

// начальный список карточек
let initialCards = [
    {
        id: 1,
        name: "Гена",
        job: "Сантех",
        skills: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
    {
        id: 2,
        name: "Саня",
        job: "Мурилка",
        skills: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
    {
        id: 3,
        name: "Ваня",
        job: "Курилка",
        skills: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    },
];

// пагинация
let itemsOnPage = +inputCount.value;
let currentPage = 1;

// массив всех карточек
let allCards = [...initialCards];
// массив только видимых карточек
let visibleCards = [];

// сделать карточку на основании объекта
function createHtmlDiv({ id, name, job, skills }) {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
        <p class="name">${id}. ${name}</p>
        <p class="job">${job}</p>
        <p class="skills">${skills}</p>
    `;
    return div;
}

// обновить список карточек на странице
function rerenderCards() {
    cardsList.innerHTML = ""; // затереть предыдущие карточки

    // устанавливаем, какие карточки отображать ОТ (вкл) ДО (не вкл)
    let start = (currentPage - 1) * itemsOnPage;
    let end = start + itemsOnPage;
    visibleCards = allCards.slice(start, end);

    // для каждой карточки из списка видимых...
    visibleCards.forEach((cardObj) => {
        let div = createHtmlDiv(cardObj); // создаем div
        cardsList.append(div); // и выводим его на страницу
    });
}

// обновить список пагинации на странице
function rerenderButtons() {
    // проходим по всем кнопкам в pagesList и добавляем/убираем класс
    function refreshActiveClass() {
        pagesList.childNodes.forEach((button) => {
            if (Number(button.innerText) === currentPage) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }

    pagesList.innerHTML = ""; // убрать предыдущий список

    let countPages = Math.ceil(allCards.length / itemsOnPage); // всего страниц

    // для каждой page создаем кнопку и вставляем на страницу
    for (let i = 1; i <= countPages; i++) {
        let button = document.createElement("button");
        button.innerText = i;

        button.addEventListener("click", (e) => {
            currentPage = +e.target.innerHTML;
            rerenderCards(); // обновляем карточки
            refreshActiveClass(); // перерисовываем классы
        });

        pagesList.append(button);
    }

    // после каждой новой отрисовки кнопок перерисовываем классы
    refreshActiveClass();
}

// начальная отрисовка карточек и пагинации
rerenderCards();
rerenderButtons();

// нажатие на кнопку добавления карточки (OK)
okButton.addEventListener("click", (e) => {
    // создание нового обьъекта карточки
    let newCard = {
        id: allCards.length + 1,
        name: inputName.value,
        job: inputTitle.value,
        skills: inputSkills.value,
    };

    // добавление этого объекта в общий список карт
    allCards.push(newCard);

    // обнуление инпутов
    inputName.value = "";
    inputTitle.value = "";
    inputSkills.value = "";

    // перерисовать список карточек и пагинацию
    rerenderCards();
    rerenderButtons();
});

// изменение колчества отображаемых карточек на странице
inputCount.addEventListener("change", () => {
    itemsOnPage = Number(inputCount.value); // считываем на что нажали
    currentPage = 1; // переприсваиваем текущую страницу

    // идем на первую страницу и перерисовываем краточки и пиганицию
    rerenderCards();
    rerenderButtons();
});
