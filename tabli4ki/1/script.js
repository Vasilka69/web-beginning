let btn = document.querySelector('button');
let tds = document.querySelectorAll('td');

let colors = ['#9acd32', '#1677ff', '#fe428e', '#555555', '#db2420'];

let rand = (length) => {
    let index = Math.floor(Math.random() * length);
    return index;
};

let qwe = () => {
    for (t of tds) {
        t.style.backgroundColor = colors[rand(colors.length)];
    }
};

btn.addEventListener('click', qwe);
