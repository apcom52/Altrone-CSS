function openTab(tabElement) {
    let siblingsTabs = [];

    let cursor = tabElement;
    while (cursor.previousElementSibling) {
        const currentNode = cursor.previousElementSibling;
        if (currentNode.classList.contains('tabs__item')) {
            siblingsTabs.push(currentNode);
        }

        cursor = currentNode;
    }

    cursor = tabElement;
    while (cursor.nextElementSibling) {
        const currentNode = cursor.nextElementSibling;
        if (currentNode.classList.contains('tabs__item')) {
            siblingsTabs.push(currentNode);
        }

        cursor = currentNode;
    }

    siblingsTabs.forEach((tabItem) => {
        const tabContent = document.body.querySelector(tabItem.dataset.tab);

        if (tabContent) {
            tabContent.classList.remove('tab-content--visible');
        }

        tabItem.classList.remove('tab__item--selected');
    })

    const currentTabContent = document.body.querySelector(tabElement.dataset.tab);

    console.log(tabElement, tabElement.dataset.tab, currentTabContent);
    if (!currentTabContent) {
        return;
    }

    currentTabContent.classList.add('tab-content--visible');
    tabElement.classList.add('tab__item--selected');
}

document.body.addEventListener('click', e => {
    if (e.target.closest('.tabs__item')) {
        openTab(e.target);
    }
})

document.body.querySelectorAll('.tabs__item--selected').forEach((activeTabItem) => {
    console.log(activeTabItem);
    openTab(activeTabItem);
})