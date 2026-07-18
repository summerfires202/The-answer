const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

const size = 4;
const total = size * size;

// Shuffle array
let order = [...Array(total).keys()];
order.sort(() => Math.random() - 0.5);

let clicked = [];

for (let i = 0; i < total; i++) {

    const piece = document.createElement("div");
    piece.className = "piece";

    const imgIndex = order[i];

    piece.style.backgroundImage = "url('file_00000000dab07208bef9dfc27fdec606.png')";
    piece.style.backgroundSize = "400px 400px";
    piece.style.backgroundPosition =
        `${-(imgIndex % size) * 100}px ${-Math.floor(imgIndex / size) * 100}px`;

    piece.dataset.correct = i;
    piece.dataset.current = imgIndex;

    piece.onclick = () => {

        if (clicked.includes(piece)) return;

        clicked.push(piece);
        piece.style.outline = "3px solid red";

        if (clicked.length === 2) {

            const a = clicked[0];
            const b = clicked[1];

            let bg = a.style.backgroundPosition;
            a.style.backgroundPosition = b.style.backgroundPosition;
            b.style.backgroundPosition = bg;

            let cur = a.dataset.current;
            a.dataset.current = b.dataset.current;
            b.dataset.current = cur;

            a.style.outline = "";
            b.style.outline = "";

            clicked = [];

            checkWin();
        }
    };

    puzzle.appendChild(piece);
}

function checkWin() {

    let win = true;

    document.querySelectorAll(".piece").forEach(piece => {
        if (piece.dataset.correct != piece.dataset.current) {
            win = false;
        }
    });

    if (win) {
        puzzle.style.display = "none";
        message.classList.remove("hidden");
    }
}
