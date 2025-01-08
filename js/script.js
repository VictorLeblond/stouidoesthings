document.addEventListener("DOMContentLoaded", function () {

    addTab('.tab-link','.tab-content');
}); 
function addTab(tabsT, tabsContentT) {
    const tabs = document.querySelectorAll(tabsT);
    const tabsContent = document.querySelectorAll(tabsContentT);


    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            tabsContent.forEach(content => {
                content.classList.add('hidden');
                content.style.display = 'none';
            })
            tab.classList.add('active');
            const activeTab = document.querySelector(`#${tab.getAttribute('data-tab')}`);
            activeTab.classList.remove('hidden');
            activeTab.style.display = 'block';
        })
    })
    tabs[0].classList.add('active');
    tabContents[0].style.display = 'block';
}