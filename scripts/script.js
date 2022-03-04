const squareBody = document.querySelector('.square-body');
const blocks = document.querySelectorAll('.block');

const rows = 5;
const arrBlocks = [];
let arr = [];

blocks.forEach((b, i) => {
    arr.push(b);
    if (arr.length == rows) {
        arrBlocks.push(arr);
        arr = [];
    }
});

document.body.addEventListener('click', e => {
    let isError = false;
    if (e.target.closest('.arrow')) {
        currentBlock = e.target.closest('.block');
        arrow = e.target.closest('.arrow').classList[1];

        let blockX;
        let blockY;

        arrBlocks.forEach((arr, i) => {
            arr.forEach((b, j) => {
                if (b === currentBlock) {
                    blockX = j;
                    blockY = i;
                }
            });
        });
        let newBlockX = blockX;
        let newBlockY = blockY;

        switch (arrow) {
            case 'top':
                newBlockY -= 1;
                if (newBlockY < 0) isError = true;
                break;
            case 'bottom':
                newBlockY += 1;
                if (newBlockY > rows - 1) isError = true;
                break;
            case 'left':
                newBlockX -= 1;
                if (newBlockX < 0) {
                    if (newBlockY - 1 >= 0) {
                        newBlockY -= 1;
                        newBlockX = rows - 1;
                    } else {
                        isError = true;
                    }
                }
                break;
            case 'right':
                newBlockX += 1;
                if (newBlockX > rows - 1) {
                    if (newBlockY + 1 < rows) {
                        newBlockX = 0;
                        newBlockY += 1;
                    } else {
                        isError = true;
                    }
                }
                break;
        }
        if (!isError) {
            const currentBlockNum = currentBlock.querySelector('.block-number');
            const moveBlockNum = arrBlocks[newBlockY][newBlockX].querySelector('.block-number');

            const forTo = moveBlockNum.textContent;
            moveBlockNum.textContent = currentBlockNum.textContent;
            currentBlockNum.textContent = forTo;
        }
    } else if (e.target.matches('.btn-reset')) {
        blocks.forEach((b, i) => {
            b.querySelector('.block-number').textContent = i + 1;
        });
    }
});
