document.addEventListener("DOMContentLoaded", function () {

  switchTheme('standard')
  addTab('.tab-link', '.tab-content');
  addTab('.tab-link-logs', '.tab-content-logs');
  addTab('.tab-link-nav', '.tab-content-nav');
  addCollapsible("collapsible",)
  xmlParser();
  initiateWinAmp();
  renderCalendar();
  setInterval(() => { updateClock(); }, 1000);
});

function setUpSelectable(){

}

function updateClock(){
  const now = new Date();
  now.setHours(now.getUTCHours() - 5);
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  document.getElementById('clock').textContent = displayHours + " : " + minutes + ' ' + ampm; 
}

function switchTheme(theme){
  const bodyDiv = document.body;
  bodyDiv.className=theme;
}

function initiateWinAmp() {
  const app = document.getElementById("winamp-container")
  const webamp = new Webamp({
    initialTracks: [{
      metaData: {
        artist: "vicleblond",
        title: "pickurpoison",
      },
      url: "../audio/pickurpoison.wav"
    }, {
      metaData: {
        artist: "454",
        title: "4 LIFE",
      },
      url: "../audio/454-4life.wav"
    }, {
      metaData: {
        artist: "454",
        title: "DR5",
      },
      url: "../audio/454-DR5.wav"
    }, {
      metaData: {
        artist: "Niontay",
        title: "Ridewimmie(I95er)",
      },
      url: "../audio/niontay-ride.wav"
    }, {
      metaData: {
        artist: "454",
        title: "Ice Age + Tales of the Hood",
      },
      url: "../audio/talesofthehood.wav"
    }],
  });
  webamp.renderWhenReady(app);
}

function renderCalendar(){
    const calendarContainer = document.querySelector('.calendar-container');
    const monthYearDisplay = document.querySelector('.calendar-current-month');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');

    let currentDate = new Date();

    updateCalendar(calendarGrid,currentDate,monthYearDisplay);

    // Navigation buttons
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(calendarGrid,currentDate,monthYearDisplay);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(calendarGrid,currentDate,monthYearDisplay);
    });
}
function updateCalendar(calendarGrid, currentDate, monthYearDisplay) {
  calendarGrid.innerHTML = ''; // Clear existing days
  console.log(monthYearDisplay)
  console.log(currentDate)
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set month and year display
  monthYearDisplay.textContent = currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' });

  // Calculate days in the month and the starting day of the week
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill initial empty days for the first row
  for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('calendar-day');
      calendarGrid.appendChild(emptyCell);
  }

  // Fill actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('calendar-day');
      dayCell.textContent = day;

      // Highlight the current day
      const today = new Date();
      if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
          dayCell.classList.add('today');
      }

      calendarGrid.appendChild(dayCell);
  }
}
function xmlParser() {
  let xmlContent = '';
  fetch('changelogs.xml').then((response) => {
    response.text().then((xml) => {
      xmlContent = xml;
      let parser = new DOMParser();
      let xmlDOM = parser.parseFromString(xmlContent, 'text/xml');
      let logs = xmlDOM.querySelectorAll("log");
      let logsHolder = document.getElementById('updates');

      logs.forEach(bookXmlEntry => {
        const entryTitle = document.createElement("div");
        const entryDescription = document.createElement("p");
        const entryDate = document.createElement("p");

        entryTitle.className = "title";
        entryDate.className = "rightSided";

        entryTitle.innerText = bookXmlEntry.children[0].innerHTML;
        entryDescription.innerText = bookXmlEntry.children[1].innerHTML;
        entryDate.innerText = bookXmlEntry.children[2].innerHTML;

        logsHolder.append(entryTitle);
        logsHolder.append(entryDescription);
        logsHolder.append(entryDate);
      });
    });
  });
}

function addTab(tabsT, tabsContentT) {
  let tabs = document.querySelectorAll(tabsT);
  let tabsContent = document.querySelectorAll(tabsContentT);
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
function addCollapsible(className) {
  var coll = document.getElementsByClassName(className);
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}