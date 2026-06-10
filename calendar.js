/* ====================================
   NOVA CRM CALENDAR
==================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCalendarModal();

    initializeEventForm();

    initializeMonthNavigation();

    loadStoredEvents();

    animateCalendarCards();

});

/* ====================================
   MODAL
==================================== */

function initializeCalendarModal() {

    const addBtn =
        document.getElementById(
            "addEventBtn"
        );

    const modal =
        document.getElementById(
            "eventModal"
        );

    const closeBtns =
        document.querySelectorAll(
            ".close-modal"
        );

    if(addBtn){

        addBtn.addEventListener(
            "click",
            () => {

                modal.style.display =
                    "flex";

            }
        );

    }

    closeBtns.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                modal.style.display =
                    "none";

            }
        );

    });

    window.addEventListener(
        "click",
        e => {

            if(
                e.target === modal
            ){

                modal.style.display =
                    "none";

            }

        }
    );

}

/* ====================================
   SAVE EVENT
==================================== */

function initializeEventForm() {

    const form =
        document.getElementById(
            "eventForm"
        );

    if(!form) return;

    form.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const inputs =
                form.querySelectorAll(
                    "input"
                );

            const title =
                inputs[0].value;

            const client =
                inputs[1].value;

            const date =
                inputs[2].value;

            const time =
                inputs[3].value;

            const description =
                inputs[4].value;

            if(
                !title ||
                !date
            ){

                showToast(
                    "Please fill required fields"
                );

                return;

            }

            const eventData = {

                title,
                client,
                date,
                time,
                description

            };

            saveEvent(
                eventData
            );

            createCalendarEvent(
                eventData
            );

            form.reset();

            document
            .getElementById(
                "eventModal"
            )
            .style.display =
            "none";

            showToast(
                "Event Added Successfully"
            );

        }
    );

}

/* ====================================
   LOCAL STORAGE
==================================== */

function saveEvent(eventData){

    let events =
        JSON.parse(
            localStorage.getItem(
                "novaEvents"
            )
        ) || [];

    events.push(
        eventData
    );

    localStorage.setItem(

        "novaEvents",

        JSON.stringify(
            events
        )

    );

}

function loadStoredEvents(){

    const events =
        JSON.parse(
            localStorage.getItem(
                "novaEvents"
            )
        ) || [];

    events.forEach(eventData => {

        createCalendarEvent(
            eventData
        );

    });

}

/* ====================================
   ADD EVENT TO CALENDAR
==================================== */

function createCalendarEvent(
    eventData
){

    if(
        !eventData.date
    ) return;

    const date =
        new Date(
            eventData.date
        );

    const day =
        date.getDate();

    const cells =
        document.querySelectorAll(
            ".day-cell"
        );

    cells.forEach(cell => {

        const dayNumber =
            cell.querySelector(
                ".day-number"
            );

        if(
            !dayNumber
        ) return;

        if(
            parseInt(
                dayNumber.textContent
            ) === day
        ){

            const event =
                document.createElement(
                    "div"
                );

            event.className =
                "event gold";

            event.textContent =
                eventData.title;

            event.title =
                `${eventData.title}
${eventData.time}
${eventData.client}`;

            cell.appendChild(
                event
            );

        }

    });

}

/* ====================================
   MONTH NAVIGATION
==================================== */

let currentMonth = 4;
let currentYear = 2026;

const months = [

"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"

];

function initializeMonthNavigation(){

    const buttons =
        document.querySelectorAll(
            ".calendar-toolbar button"
        );

    const title =
        document.querySelector(
            ".calendar-toolbar h2"
        );

    if(
        buttons.length < 2
    ) return;

    buttons[0].addEventListener(
        "click",
        () => {

            currentMonth--;

            if(
                currentMonth < 0
            ){

                currentMonth = 11;

                currentYear--;

            }

            title.textContent =
                `${months[currentMonth]} ${currentYear}`;

        }
    );

    buttons[1].addEventListener(
        "click",
        () => {

            currentMonth++;

            if(
                currentMonth > 11
            ){

                currentMonth = 0;

                currentYear++;

            }

            title.textContent =
                `${months[currentMonth]} ${currentYear}`;

        }
    );

}

/* ====================================
   TOAST
==================================== */

function showToast(message){

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "crm-toast";

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "show"
        );

    },100);

    setTimeout(() => {

        toast.remove();

    },3000);

}

/* ====================================
   ANIMATION
==================================== */

function animateCalendarCards(){

    const cards =
        document.querySelectorAll(

            ".calendar-card,.chart-card,.activity-card,.hot-leads-card"

        );

    cards.forEach(
        (card,index) => {

            card.style.opacity =
                "0";

            card.style.transform =
                "translateY(20px)";

            setTimeout(() => {

                card.style.transition =
                    ".5s ease";

                card.style.opacity =
                    "1";

                card.style.transform =
                    "translateY(0)";

            }, index * 120);

        }
    );

}

/* ====================================
   EVENT CLICK DETAILS
==================================== */

document.addEventListener(
    "click",
    e => {

        if(
            e.target.classList.contains(
                "event"
            )
        ){

            showToast(
                e.target.textContent
            );

        }

    }
);
      
