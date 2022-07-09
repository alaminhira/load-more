const gridContainer = document.querySelector('.grid__container');
const btnGrid = document.querySelector('.grid__btn');

const getJSON = async function (url) {
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

let data = undefined,
    loadedItems = [],
    loadMore = true;
const initItemCount = 6;
const LoadMoreItems = async function (showMore) {
    
    data = data || await getJSON('items.json');

    let items = undefined;
    if (showMore) {
        items = data.slice(loadedItems.length, loadedItems.length + 3);
    } else {
        items = data.slice(0, initItemCount);
    }
    loadedItems.push(...items);

    items.forEach(item => {
        gridContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="grid__item">${item}</div>`
        )
    })

    if (loadedItems.length !== data.length) return;

    btnGrid.textContent = 'See Less';
    loadMore = !loadMore;
}
LoadMoreItems();

const LoadLessItems = function () {

    let removedItems = undefined;
    const itemNum = loadedItems.length % 3

    if (itemNum) {
        removedItems = loadedItems.splice(loadedItems.length - itemNum, itemNum);
    } else {
        removedItems = loadedItems.splice(loadedItems.length - 3, 3);
    }

    removedItems.forEach(item => gridContainer.lastChild.remove());

    if (loadedItems.length === initItemCount) {
        btnGrid.textContent = 'Load More';
        loadMore = !loadMore;
    }
}

const processItems = function () {
    loadMore ? LoadMoreItems(loadMore) : LoadLessItems();
}

btnGrid.addEventListener('click', processItems);