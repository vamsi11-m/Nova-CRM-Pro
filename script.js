/* ======================================
   NOVA CRM V2
   DASHBOARD SCRIPT
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCounters();

    createPipelineChart();

    createStatusChart();

    createSourceChart();

    startActivityFeed();

});

/* ======================================
   KPI COUNTERS
====================================== */

function animateCounter(id, target, duration = 1500) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = 0;

    const increment = target / (duration / 16);

    function update() {

        start += increment;

        if (start >= target) {

            element.textContent = target;

            return;
        }

        element.textContent = Math.floor(start);

        requestAnimationFrame(update);
    }

    update();
}

function initializeCounters() {

    animateCounter("totalLeads", 10);

    animateCounter("hotLeads", 3);

}

/* ======================================
   PIPELINE TREND CHART
====================================== */

function createPipelineChart() {

    const ctx =
        document.getElementById(
            "pipelineChart"
        );

    if (!ctx) return;

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            datasets: [{

                label: "Leads",

                data: [
                    12,
                    19,
                    24,
                    35,
                    48,
                    58
                ],

                borderColor: "#d4b13f",

                backgroundColor:
                    "rgba(212,177,63,.15)",

                fill: true,

                tension: .4,

                pointRadius: 5,

                pointBackgroundColor:
                    "#d4b13f"

            }]

        },

        options: {

            responsive: true,

            interaction: {

                mode: "nearest",

                intersect: false

            },

            plugins: {

                legend: {

                    labels: {

                        color: "#fff"

                    }

                },

                tooltip: {

                    enabled: true,

                    backgroundColor:
                        "#081d15",

                    titleColor:
                        "#fff",

                    bodyColor:
                        "#fff",

                    borderColor:
                        "#d4b13f",

                    borderWidth: 1

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#94a3b8"

                    }

                },

                y: {

                    ticks: {

                        color: "#94a3b8"

                    }

                }

            }

        }

    });

}

/* ======================================
   LEADS BY STATUS
====================================== */

function createStatusChart() {

    const ctx =
        document.getElementById(
            "statusChart"
        );

    if (!ctx) return;

    new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Converted",
                "Contacted",
                "New",
                "Lost"

            ],

            datasets: [{

                data: [
                    3,
                    2,
                    3,
                    2
                ],

                backgroundColor: [

                    "#00d084",
                    "#3b82f6",
                    "#d4b13f",
                    "#ef4444"

                ],

                borderWidth: 0

            }]

        },

        options: {

            cutout: "70%",

            plugins: {

                legend: {

                    display: false

                },

                tooltip: {

                    enabled: true

                }

            }

        }

    });

}
/* ======================================
   SOURCE BREAKDOWN CHART
====================================== */

function createSourceChart() {

    const ctx =
        document.getElementById(
            "sourceChart"
        );

    if (!ctx) return;

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Website",
                "Instagram",
                "Referral",
                "LinkedIn"

            ],

            datasets: [{

                label: "Leads",

                data: [

                    4,
                    3,
                    2,
                    1

                ],

                backgroundColor: [

                    "#d4b13f",
                    "#00d084",
                    "#3b82f6",
                    "#8b5cf6"

                ],

                borderRadius: 10,

                borderSkipped: false

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                },

                tooltip: {

                    enabled: true,

                    backgroundColor:
                        "#081d15",

                    titleColor:
                        "#fff",

                    bodyColor:
                        "#fff",

                    borderColor:
                        "#d4b13f",

                    borderWidth: 1

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#94a3b8"

                    },

                    grid: {

                        display: false

                    }

                },

                y: {

                    ticks: {

                        color: "#94a3b8"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,.05)"

                    }

                }

            }

        }

    });

}

/* ======================================
   LIVE ACTIVITY FEED
====================================== */

const activityData = [

    {
        title: "New Lead Added",
        text: "Alex Johnson from TechCorp"
    },

    {
        title: "Meeting Scheduled",
        text: "Discovery call at 3 PM"
    },

    {
        title: "Lead Converted",
        text: "Premium package purchased"
    },

    {
        title: "Revenue Updated",
        text: "$2,500 added"
    },

    {
        title: "Follow-up Completed",
        text: "Client responded positively"
    }

];

function startActivityFeed() {

    const container =
        document.getElementById(
            "activityList"
        );

    if (!container) return;

    setInterval(() => {

        const item =
            activityData[
                Math.floor(
                    Math.random() *
                    activityData.length
                )
            ];

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "activity-item";

        card.innerHTML = `

        <div class="activity-icon gold-bg">
            <i class="fa-solid fa-bolt"></i>
        </div>

        <div>
            <h4>${item.title}</h4>
            <p>${item.text}</p>
        </div>

        <span>Now</span>

        `;

        container.prepend(card);

        if (
            container.children.length > 6
        ) {

            container.removeChild(
                container.lastElementChild
            );

        }

    }, 7000);

}

/* ======================================
   NOTIFICATION COUNTER
====================================== */

let notificationCount = 3;

function updateNotifications() {

    const badge =
        document.querySelector(
            ".notification-dot"
        );

    if (!badge) return;

    setInterval(() => {

        notificationCount++;

        badge.textContent =
            notificationCount;

    }, 15000);

}

updateNotifications();

/* ======================================
   KPI CARD HOVER EFFECT
====================================== */

document
.querySelectorAll(".stat-card")
.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-6px)";

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0px)";

        }
    );

});

/* ======================================
   PERFORMANCE SUMMARY
====================================== */

function updateSummaryData() {

    const summaryValues = [

        "+24%",
        "30%",
        "+18%",
        "92%"

    ];

    const summary =
        document.querySelectorAll(
            ".summary-item strong"
        );

    summary.forEach(
        (item, index) => {

            item.textContent =
                summaryValues[index];

        }
    );

}

updateSummaryData();

/* ======================================
   SEARCH BAR INTERACTION
====================================== */

const searchInput =
    document.querySelector(
        ".search-container input"
    );

if (searchInput) {

    searchInput.addEventListener(
        "focus",
        () => {

            searchInput.parentElement
            .style.borderColor =
            "#d4b13f";

        }
    );

    searchInput.addEventListener(
        "blur",
        () => {

            searchInput.parentElement
            .style.borderColor =
            "rgba(212,177,63,.15)";

        }
    );

}
/* ======================================
   NOVA CRM V2
   PREMIUM EFFECTS
====================================== */

/* ======================================
   REVENUE COUNTER
====================================== */

function animateRevenue() {

    const revenue =
        document.getElementById(
            "revenue"
        );

    if (!revenue) return;

    let current = 0;

    const target = 17595;

    const timer = setInterval(() => {

        current += 175;

        revenue.textContent =
            "$" +
            current.toLocaleString();

        if (current >= target) {

            revenue.textContent =
                "$17,595";

            clearInterval(timer);

        }

    }, 25);

}

animateRevenue();

/* ======================================
   PAGE LOAD ANIMATION
====================================== */

window.addEventListener(
    "load",
    () => {

        const cards =
            document.querySelectorAll(
                ".stat-card,.chart-card,.activity-card,.hot-leads-card"
            );

        cards.forEach(
            (card, index) => {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(30px)";

                setTimeout(() => {

                    card.style.transition =
                        ".6s ease";

                    card.style.opacity =
                        "1";

                    card.style.transform =
                        "translateY(0px)";

                }, index * 100);

            }
        );

    }
);

/* ======================================
   FLOATING ORBS
====================================== */

function createFloatingOrbs() {

    const orbContainer =
        document.createElement("div");

    orbContainer.id =
        "orbContainer";

    document.body.appendChild(
        orbContainer
    );

    for (let i = 0; i < 8; i++) {

        const orb =
            document.createElement(
                "div"
            );

        orb.className =
            "floating-orb";

        orb.style.left =
            Math.random() * 100 + "%";

        orb.style.top =
            Math.random() * 100 + "%";

        orb.style.animationDuration =
            10 +
            Math.random() * 10 +
            "s";

        orbContainer.appendChild(
            orb
        );

    }

}

createFloatingOrbs();

/* ======================================
   LIVE KPI UPDATES
====================================== */

function startLiveStats() {

    setInterval(() => {

        const total =
            document.getElementById(
                "totalLeads"
            );

        if (!total) return;

        let current =
            parseInt(
                total.textContent
            );

        current++;

        total.textContent =
            current;

    }, 30000);

}

startLiveStats();

/* ======================================
   CHART REFRESH
====================================== */

function refreshDashboardCharts() {

    console.log(
        "Dashboard Updated"
    );

}

setInterval(
    refreshDashboardCharts,
    60000
);

/* ======================================
   NOTIFICATION PULSE
====================================== */

const badge =
document.querySelector(
".notification-dot"
);

if (badge) {

setInterval(() => {

badge.classList.add(
"pulse"
);

setTimeout(() => {

badge.classList.remove(
"pulse"
);

},1000);

},10000);

}

/* ======================================
   GREETING
====================================== */

function updateGreeting() {

const heading =
document.querySelector(
".hero h1"
);

if (!heading) return;

const hour =
new Date().getHours();

let greeting =
"Welcome back";

if(hour < 12){

greeting =
"Good Morning";

}
else if(hour < 18){

greeting =
"Good Afternoon";

}
else{

greeting =
"Good Evening";

}

heading.innerHTML =
`${greeting},
<span>Admin</span>`;

}

updateGreeting();

/* ======================================
   MANAGE LEADS BUTTON
====================================== */

const manageBtn =
document.querySelector(
".manage-btn"
);

if(manageBtn){

manageBtn.addEventListener(
"click",
() => {

alert(
"Lead Management Module Coming Next"
);

}
);

}

/* ======================================
   CONSOLE MESSAGE
====================================== */

console.log(
"%c NOVA CRM V2 LOADED",
"color:#d4b13f;font-size:18px;font-weight:bold;"
);
              
