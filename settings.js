/* ====================================
   NOVA CRM SETTINGS
==================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeThemeSelector();

    initializeToggles();

    initializeSaveModal();

    loadSettings();

    animateSettingsCards();

});

/* ====================================
   THEME SELECTOR
==================================== */

function initializeThemeSelector() {

    const themes =
        document.querySelectorAll(
            ".theme-box"
        );

    themes.forEach(theme => {

        theme.addEventListener(
            "click",
            () => {

                themes.forEach(t =>
                    t.classList.remove(
                        "active-theme"
                    )
                );

                theme.classList.add(
                    "active-theme"
                );

                const selectedTheme =
                    theme.querySelector(
                        "h4"
                    ).textContent;

                localStorage.setItem(
                    "novaTheme",
                    selectedTheme
                );

                showToast(
                    `${selectedTheme} Selected`
                );

            }
        );

    });

}

/* ====================================
   TOGGLE SETTINGS
==================================== */

function initializeToggles() {

    const toggles =
        document.querySelectorAll(
            '.switch input[type="checkbox"]'
        );

    toggles.forEach(
        (toggle, index) => {

            toggle.addEventListener(
                "change",
                () => {

                    localStorage.setItem(

                        `toggle_${index}`,

                        toggle.checked

                    );

                }
            );

        }
    );

}

/* ====================================
   LOAD SAVED SETTINGS
==================================== */

function loadSettings() {

    const theme =
        localStorage.getItem(
            "novaTheme"
        );

    if(theme){

        document
        .querySelectorAll(
            ".theme-box"
        )
        .forEach(box => {

            const title =
                box.querySelector(
                    "h4"
                ).textContent;

            if(title === theme){

                box.classList.add(
                    "active-theme"
                );

            }else{

                box.classList.remove(
                    "active-theme"
                );

            }

        });

    }

    const toggles =
        document.querySelectorAll(
            '.switch input[type="checkbox"]'
        );

    toggles.forEach(
        (toggle,index) => {

            const value =
                localStorage.getItem(
                    `toggle_${index}`
                );

            if(value !== null){

                toggle.checked =
                    value === "true";

            }

        }
    );

}

/* ====================================
   SAVE MODAL
==================================== */

function initializeSaveModal() {

    const saveBtn =
        document.querySelector(
            ".manage-btn"
        );

    const modal =
        document.getElementById(
            "saveModal"
        );

    const cancelBtn =
        document.getElementById(
            "cancelSave"
        );

    const confirmBtn =
        document.getElementById(
            "confirmSave"
        );

    if(saveBtn){

        saveBtn.addEventListener(
            "click",
            () => {

                modal.style.display =
                    "flex";

            }
        );

    }

    if(cancelBtn){

        cancelBtn.addEventListener(
            "click",
            () => {

                modal.style.display =
                    "none";

            }
        );

    }

    if(confirmBtn){

        confirmBtn.addEventListener(
            "click",
            () => {

                saveAllSettings();

                modal.style.display =
                    "none";

            }
        );

    }

    window.addEventListener(
        "click",
        e => {

            if(e.target === modal){

                modal.style.display =
                    "none";

            }

        }
    );

}

/* ====================================
   SAVE SETTINGS
==================================== */

function saveAllSettings() {

    const inputs =
        document.querySelectorAll(
            "input"
        );

    const data = [];

    inputs.forEach(input => {

        if(
            input.type !== "checkbox"
        ){

            data.push({
                value: input.value
            });

        }

    });

    localStorage.setItem(

        "novaProfile",

        JSON.stringify(data)

    );

    showToast(
        "Settings Saved Successfully"
    );

}

/* ====================================
   TOAST MESSAGE
==================================== */

function showToast(message) {

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
   CARD ANIMATION
==================================== */

function animateSettingsCards() {

    const cards =
        document.querySelectorAll(
            ".settings-card"
        );

    cards.forEach(
        (card,index) => {

            card.style.opacity =
                "0";

            card.style.transform =
                "translateY(25px)";

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
   ACTIVITY LOG ANIMATION
==================================== */

window.addEventListener(
    "load",
    () => {

        const activity =
            document.querySelectorAll(
                ".activity-item"
            );

        activity.forEach(
            (item,index) => {

                item.style.opacity =
                    "0";

                setTimeout(() => {

                    item.style.transition =
                        ".5s";

                    item.style.opacity =
                        "1";

                }, index * 150);

            }
        );

    }
);

/* ====================================
   PROFILE AUTO SAVE
==================================== */

document.addEventListener(
    "input",
    e => {

        if(
            e.target.tagName ===
            "INPUT"
        ){

            localStorage.setItem(

                "lastEdited",

                new Date()
                .toLocaleString()

            );

        }

    }
);

/* ====================================
   DEBUG INFO
==================================== */

console.log(
    "Nova CRM Settings Loaded"
);
          
