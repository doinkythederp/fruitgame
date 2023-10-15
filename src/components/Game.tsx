import { Signal, signal } from "@preact/signals";

const fruitList = "🍎 🥕 🍉 🍌 🥚".split(" ");
const scores = new Map(fruitList.map((fruit, i) => [fruit, i + 1]));
const checkedDirections = Array.from({ length: 3 }, (_, y) => {
    return Array.from({ length: 3 }, (_, x) => {
        return [y - 1, x - 1];
    });
})
    .flat()
    .filter(([y, x]) => !(y === 0 && x === 0));
const boardWidth = 5;
const boardHeight = 5;

function randomFruit() {
    if (import.meta.env.SSR) {
        return fruitList[2];
    } else {
        return fruitList[Math.floor(Math.random() * fruitList.length)];
    }
}

function createBoard() {
    return Array.from({ length: boardHeight }, () => {
        return Array.from({ length: boardWidth }, () => signal(randomFruit()));
    });
}

function discoverItemsAround(x: number, y: number, discovered: Set<string>) {
    const fruitTy = board[y][x].value;
    discovered.add(`${x},${y}`);
    for (const [dy, dx] of checkedDirections) {
        const nx = x + dx;
        const ny = y + dy;
        const nextFruit = board[ny]?.[nx]?.value;
        if (nextFruit === fruitTy && !discovered.has(`${nx},${ny}`)) {
            discoverItemsAround(nx, ny, discovered);
        }
    }
}

function itemClicked(x: number, y: number) {
    const fruitTy = board[y][x].value;
    const discovered = new Set<string>();
    // debugger;
    discoverItemsAround(x, y, discovered);
    if (discovered.size < 3) {
        return;
    }

    const poppedCoords = Array.from(discovered)
        .map((coordinates) => {
            const [nx, ny] = coordinates.split(",").map(Number);
            return [nx, ny];
        })
        .sort(([x1, y1], [x2, y2]) => {
            return y1 - y2;
        });
    for (const [nx, ny] of poppedCoords) {
        console.debug("popping", ny, nx);
        let belowY = ny;
        while (belowY >= 0) {
            const belowFruit = board[belowY][nx];
            const aboveFruit = board[belowY - 1]?.[nx].value ?? randomFruit();
            console.debug(
                `[${belowY}][${nx}] ${belowFruit.value} = [${
                    belowY - 1
                }][${nx}] ${aboveFruit}`
            );
            belowFruit.value = aboveFruit;
            belowY -= 1;
        }
    }
}

const board = createBoard();
export default function Game() {
    console.log(board);
    return (
        <table>
            {board.map((row, y) => (
                <Row row={row} y={y} />
            ))}
        </table>
    );
}

function Row(props: { row: Signal<string>[]; y: number }) {
    const { row, y } = props;
    return (
        <tr>
            {row.map((fruit, x) => (
                <td>
                    <Item fruit={fruit} x={x} y={y} />
                </td>
            ))}
        </tr>
    );
}

function Item(props: { fruit: Signal<string>; x: number; y: number }) {
    const { fruit, x, y } = props;
    return (
        <button type="button" onClick={() => itemClicked(x, y)}>
            {fruit}
        </button>
    );
}
