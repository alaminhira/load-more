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
            `<div class="grid__item showing">${item}</div>`
        )
    })
    
    setTimeout(() =>  {
        const items = gridContainer.querySelectorAll('.grid__item.showing');
        items.forEach(item => item.classList.remove('showing'));
    }, 200);

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

    console.log(removedItems)
    
    const removedEls = removedItems.map((_, i) => gridContainer.querySelector(`.grid__item:nth-last-child(${i + 1})`));
    removedEls.forEach(el => el.classList.add('hiding'));
    
    setTimeout(() =>  {
        removedEls.forEach(el => el.classList.remove('hiding'));
        removedEls.forEach(_ => gridContainer.lastChild.remove());
    }, 700);
    // const removedEls = removedItems.map(item => );
    console.log(removedEls)
    

    if (loadedItems.length === initItemCount) {
        btnGrid.textContent = 'Load More';
        loadMore = !loadMore;
    }
}

const processItems = function () {
    loadMore ? LoadMoreItems(loadMore) : LoadLessItems();
}

btnGrid.addEventListener('click', processItems);