const puzzle = document.getElementById("puzzle");
const message = document.getElementById("message");

let clicked = [];

for (let i = 0; i < 16; i++) {
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.style.backgroundImage = "url('anime.jpg')";
    piece.style.backgroundPosition =
        `${-(i % 4) * 80}px ${-Math.floor(i / 4) * 80}px`;

    piece.dataset.correct = i;
    piece.dataset.current = Math.floor(Math.random() * 16);

    piece.onclick = () => {
        if (clicked.length < 2) {
            clicked.push(piece);
            piece.style.outline = "3px solid red";
        }

        if (clicked.length === 2) {
            let a = clicked[0];
            let b = clicked[1];

            let temp = a.style.backgroundPosition;
            a.style.backgroundPosition = b.style.backgroundPosition;
            b.style.backgroundPosition = temp;

            let t = a.dataset.current;
            a.dataset.current = b.dataset.current;
            b.dataset.current = t;

            a.style.outline = "";
            b.style.outline = "";
            clicked = [];

            checkWin();
        }
    };

    puzzle.appendChild(piece);
}

function checkWin() {
    let ok = true;
    document.querySelectorAll(".piece").forEach(p => {
        if (p.dataset.correct !== p.dataset.current)
            ok = false;
    });

    if (ok) {
        puzzle.style.display = "none";
        message.classList.remove("hidden");
    }
}
