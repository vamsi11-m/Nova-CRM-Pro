/* ====================================
   NOVA CRM - LEADS MODULE
==================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();

    initializeFilters();

    initializeModals();

    initializeDeleteButtons();

    initializeExport();

});

/* ====================================
   SEARCH LEADS
==================================== */

function initializeSearch() {

    const searchInput =
        document.getElementById(
            "leadSearch"
        );

    if (!searchInput) return;

    searchInput.addEventListener(
        "keyup",
        () => {

            const value =
                searchInput.value
                .toLowerCase();

            const rows =
                document.querySelectorAll(
                    "#leadTableBody tr"
                );

            rows.forEach(row => {

                const text =
                    row.innerText
                    .toLowerCase();

                row.style.display =
                    text.includes(value)
                    ? ""
                    : "none";

            });

        }
    );

}

/* ====================================
   STATUS FILTER
==================================== */

function initializeFilters() {

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const priorityFilter =
        document.getElementById(
            "priorityFilter"
        );

    if (!statusFilter ||
        !priorityFilter)
        return;

    function applyFilters() {

        const status =
            statusFilter.value;

        const priority =
            priorityFilter.value;

        const rows =
            document.querySelectorAll(
                "#leadTableBody tr"
            );

        rows.forEach(row => {

            const rowText =
                row.innerText;

            const statusMatch =
                status ===
                "All Status" ||
                rowText.includes(
                    status
                );

            const priorityMatch =
                priority ===
                "All Priority" ||
                rowText.includes(
                    priority
                );

            row.style.display =
                statusMatch &&
                priorityMatch
                ? ""
                : "none";

        });

    }

    statusFilter.addEventListener(
        "change",
        applyFilters
    );

    priorityFilter.addEventListener(
        "change",
        applyFilters
    );

}

/* ====================================
   MODALS
==================================== */

function initializeModals() {

    const addButtons =
        document.querySelectorAll(
            ".manage-btn"
        );

    const modal =
        document.getElementById(
            "leadModal"
        );

    const viewModal =
        document.getElementById(
            "viewLeadModal"
        );

    const closeButtons =
        document.querySelectorAll(
            ".close-modal"
        );

    addButtons.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                if (modal) {

                    modal.style.display =
                        "flex";

                }

            }
        );

    });

    closeButtons.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                if (modal)
                    modal.style.display =
                        "none";

                if (viewModal)
                    viewModal.style.display =
                        "none";

            }
        );

    });

    window.addEventListener(
        "click",
        e => {

            if (e.target === modal)
                modal.style.display =
                    "none";

            if (e.target === viewModal)
                viewModal.style.display =
                    "none";

        }
    );

    document
    .querySelectorAll(".view-btn")
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                if (viewModal)
                    viewModal.style.display =
                        "flex";

            }
        );

    });

}
/* ====================================
   LEAD STORAGE
==================================== */

let leadCount = document.querySelectorAll(
"#leadTableBody tr"
).length;

/* ====================================
   ADD LEAD
==================================== */

const leadForm =
document.getElementById(
"leadForm"
);

if(leadForm){

leadForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const inputs =
leadForm.querySelectorAll(
"input,select"
);

const name =
inputs[0].value;

const company =
inputs[1].value;

const email =
inputs[2].value;

const phone =
inputs[3].value;

const status =
inputs[4].value;

const priority =
inputs[5].value;

const value =
inputs[6].value;

if(
!name ||
!company ||
!email
){

alert(
"Please fill all required fields"
);

return;

}

addLeadRow(
name,
company,
email,
status,
priority,
value
);

saveLeadToStorage({

name,
company,
email,
phone,
status,
priority,
value

});

leadForm.reset();

const modal =
document.getElementById(
"leadModal"
);

if(modal){

modal.style.display =
"none";

}

showToast(
"Lead Added Successfully"
);

}
);

}

/* ====================================
   ADD TABLE ROW
==================================== */

function addLeadRow(

name,
company,
email,
status,
priority,
value

){

const tbody =
document.getElementById(
"leadTableBody"
);

if(!tbody) return;

const firstLetter =
name.charAt(0);

const row =
document.createElement(
"tr"
);

row.innerHTML = `

<td>

<div class="user-cell">

<div class="user-avatar">

${firstLetter}

</div>

<div>

<strong>${name}</strong>

<small>${email}</small>

</div>

</div>

</td>

<td>${company}</td>

<td>

<span class="status-badge status-${status.toLowerCase()}">

${status}

</span>

</td>

<td>

<span class="priority-badge ${priority.toLowerCase()}">

${priority}

</span>

</td>

<td>

$${value}

</td>

<td>

<div class="action-buttons">

<button class="icon-btn view-btn">

<i class="fa-solid fa-eye"></i>

</button>

<button class="icon-btn edit-btn">

<i class="fa-solid fa-pen"></i>

</button>

<button class="icon-btn delete-btn">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</td>

`;

tbody.prepend(row);

leadCount++;

updateLeadCount();

attachDeleteEvents();

}

/* ====================================
   DELETE LEAD
==================================== */

function initializeDeleteButtons(){

attachDeleteEvents();

}

function attachDeleteEvents(){

document
.querySelectorAll(
".delete-btn"
)
.forEach(btn=>{

btn.onclick=()=>{

const row =
btn.closest("tr");

if(
confirm(
"Delete this lead?"
)
){

row.remove();

leadCount--;

updateLeadCount();

showToast(
"Lead Deleted"
);

}

};

});

}

/* ====================================
   UPDATE COUNT
==================================== */

function updateLeadCount(){

const badge =
document.querySelector(
".lead-count"
);

if(badge){

badge.textContent =
`${leadCount} Leads`;

}

}

/* ====================================
   LOCAL STORAGE
==================================== */

function saveLeadToStorage(
lead
){

let leads =
JSON.parse(
localStorage.getItem(
"novaLeads"
)
) || [];

leads.push(lead);

localStorage.setItem(

"novaLeads",

JSON.stringify(leads)

);

}

/* ====================================
   EXPORT CSV
==================================== */

function initializeExport(){

const exportBtn =
document.querySelector(
".secondary-btn"
);

if(!exportBtn) return;

exportBtn.addEventListener(
"click",
exportCSV
);

}

function exportCSV(){

let csv =
"Name,Company,Status,Priority,Value\n";

document
.querySelectorAll(
"#leadTableBody tr"
)
.forEach(row=>{

const cols =
row.querySelectorAll(
"td"
);

csv +=

cols[0]
.innerText
.replace(/\n/g," ") +

"," +

cols[1]
.innerText +

"," +

cols[2]
.innerText +

"," +

cols[3]
.innerText +

"," +

cols[4]
.innerText +

"\n";

});

const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);

const url =
URL.createObjectURL(
blob
);

const a =
document.createElement(
"a"
);

a.href=url;

a.download=
"nova-crm-leads.csv";

a.click();

URL.revokeObjectURL(
url
);

showToast(
"CSV Exported"
);

}

/* ====================================
   TOAST NOTIFICATION
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

setTimeout(()=>{

toast.classList.add(
"show"
);

},100);

setTimeout(()=>{

toast.remove();

},3000);

            }
