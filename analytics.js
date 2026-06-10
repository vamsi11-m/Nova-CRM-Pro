/* ====================================
   NOVA CRM ANALYTICS
==================================== */

document.addEventListener("DOMContentLoaded", () => {

    createRevenueChart();

    createFunnelChart();

    createLeadSourceChart();

    createSalesPerformanceChart();

    animateAnalyticsCounters();

    initializeExportReport();

    startAnalyticsUpdates();

});

/* ====================================
   KPI COUNTERS
==================================== */

function animateValue(element, start, end, duration) {

    let startTime = null;

    function animate(currentTime) {

        if (!startTime)
            startTime = currentTime;

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );

        const value =
            Math.floor(
                progress *
                (end - start) +
                start
            );

        element.textContent =
            value.toLocaleString();

        if (progress < 1)
            requestAnimationFrame(
                animate
            );

    }

    requestAnimationFrame(
        animate
    );

}

function animateAnalyticsCounters() {

    const cards =
        document.querySelectorAll(
            ".stat-card h2"
        );

    cards.forEach(card => {

        const text =
            card.textContent;

        if (text.includes("$")) {

            card.textContent =
                "$0";

            setTimeout(() => {

                card.textContent =
                    "$124K";

            }, 1200);

        }

    });

}

/* ====================================
   REVENUE CHART
==================================== */

function createRevenueChart() {

    const canvas =
        document.getElementById(
            "revenueChart"
        );

    if (!canvas) return;

    new Chart(canvas, {

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

                label: "Revenue",

                data: [

                    12000,
                    18000,
                    25000,
                    32000,
                    45000,
                    62000

                ],

                borderColor:
                    "#d4b13f",

                backgroundColor:
                    "rgba(212,177,63,.15)",

                fill: true,

                tension: .4

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "#fff"

                    }

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

/* ====================================
   FUNNEL CHART
==================================== */

function createFunnelChart() {

    const canvas =
        document.getElementById(
            "funnelChart"
        );

    if (!canvas) return;

    new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "New",
                "Contacted",
                "Qualified",
                "Converted"

            ],

            datasets: [{

                data: [

                    120,
                    85,
                    55,
                    30

                ],

                backgroundColor: [

                    "#d4b13f",
                    "#3b82f6",
                    "#8b5cf6",
                    "#00d084"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            cutout: "65%",

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#fff"

                    }

                }

            }

        }

    });

}

/* ====================================
   LEAD SOURCE CHART
==================================== */

function createLeadSourceChart() {

    const canvas =
        document.getElementById(
            "leadSourceChart"
        );

    if (!canvas) return;

    new Chart(canvas, {

        type: "pie",

        data: {

            labels: [

                "Website",
                "LinkedIn",
                "Instagram",
                "Referral"

            ],

            datasets: [{

                data: [

                    35,
                    28,
                    20,
                    17

                ],

                backgroundColor: [

                    "#d4b13f",
                    "#00d084",
                    "#3b82f6",
                    "#8b5cf6"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        color: "#fff"

                    }

                }

            }

        }

    });

}

/* ====================================
   SALES PERFORMANCE
==================================== */

function createSalesPerformanceChart() {

    const canvas =
        document.getElementById(
            "salesPerformanceChart"
        );

    if (!canvas) return;

    new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Q1",
                "Q2",
                "Q3",
                "Q4"

            ],

            datasets: [{

                label: "Sales",

                data: [

                    32000,
                    45000,
                    58000,
                    72000

                ],

                backgroundColor:
                    "#d4b13f",

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "#fff"

                    }

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

/* ====================================
   EXPORT REPORT
==================================== */

function initializeExportReport() {

    const btn =
        document.querySelector(
            ".manage-btn"
        );

    if (!btn) return;

    btn.addEventListener(
        "click",
        () => {

            showToast(
                "Analytics Report Exported"
            );

        }
    );

}

/* ====================================
   LIVE UPDATES
==================================== */

function startAnalyticsUpdates() {

    setInterval(() => {

        console.log(
            "Analytics refreshed"
        );

    }, 60000);

}

/* ====================================
   TOAST
==================================== */

function showToast(message) {

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        "crm-toast show";

    toast.textContent =
        message;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

/* ====================================
   PAGE LOAD ANIMATION
==================================== */

window.addEventListener(
    "load",
    () => {

        document
        .querySelectorAll(
            ".stat-card,.chart-card,.activity-card,.hot-leads-card"
        )
        .forEach(
            (card, index) => {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(25px)";

                setTimeout(() => {

                    card.style.transition =
                        ".5s ease";

                    card.style.opacity =
                        "1";

                    card.style.transform =
                        "translateY(0)";

                }, index * 100);

            }
        );

    }
);
