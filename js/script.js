document.addEventListener("DOMContentLoaded", function () {

    addTab('.tab-link','.tab-content');
    addTab('.tab-link-logs','.tab-content-logs');
    addTab('.tab-link-nav','.tab-content-nav');
    addCollapsible("collapsible")
}); 
function addTab(tabsT, tabsContentT) {
    let tabs = document.querySelectorAll(tabsT);
    let tabsContent = document.querySelectorAll(tabsContentT);
    console.log(tabs)
    console.log(tabsContent)
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
    //tabContents[0].style.display = 'block';
}
function addCollapsible(className){
    var coll = document.getElementsByClassName(className);
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
}