const tabSelectors = document.querySelectorAll(".tab_selector");
const controllerTabs = document.querySelectorAll(".controller_tab");

const innerTabs = document.querySelectorAll(".tab_inner_details");

const reverseDisplay = document.querySelector("strong#reverse_required");
const reverseRequiredCheckbox = document.querySelector("#application_reverse_checkbox");

/** TABS */
Object.keys(tabSelectors).forEach(key => {
    tabSelectors[key].addEventListener("click", () => {
        // reset all tabs to display none
        Object.keys(controllerTabs).forEach(key => {
            controllerTabs[key].classList.remove("show");
        });

        Object.keys(tabSelectors).forEach(key => {
            tabSelectors[key].classList.remove("current");
        });

        hightLightCurrentTab(+key);
        showTab(+key);
    })
})

function showTab(key) {
    controllerTabs[key].classList.add("show");
}

function hightLightCurrentTab(key) {
    tabSelectors[key].classList.add("current");
}

// Highlight tab1 initially
hightLightCurrentTab(0);

// show the 1st tab initially
showTab(0);

/** END TABS */

/** INNER TABS */

Object.keys(innerTabs).forEach(key => new Slide(+key));

function Slide(key) {
    this.size = controllerTabs[0].clientWidth;
    this.startIndex = 0;
    this.stepsIndicator = controllerTabs[key].querySelector(".controller_tab_steps_indicator");
    this.innerTabs = controllerTabs[key].querySelectorAll(".inner_tab");
    this.steps = controllerTabs[key].querySelectorAll(".step");
    this.goToPreviousButton = controllerTabs[key].querySelector(".inner_tab_controls .go_to_previous");
    this.goToNextButton = controllerTabs[key].querySelector(".inner_tab_controls .go_to_next");

    this.translateX= function() {
        
        innerTabs[key].style.transform = "translate("+this.startIndex * -this.size+"px)";
        this.stepsIndicator.style.backgroundSize = ""+(this.startIndex/(this.innerTabs.length-1))*100+"% 100%";
        
        Object.keys(this.steps).forEach(key => this.steps[+key].classList.remove("current"));

        for(let i = 0; i < this.startIndex + 1; i++) {
            this.steps[i].classList.add("current");
        }
    }
    
    this.goToNextButton.addEventListener("click", () => {
        if(this.startIndex >= this.innerTabs.length - 1) return;
        this.startIndex += 1;
        this.translateX();
    })

    this.goToPreviousButton.addEventListener("click", () => {
        if(this.startIndex <= 0) return;
        this.startIndex -= 1;
        this.translateX();
    })
}

/** END INNER TABS */


/**CHECKBOX      */

reverseRequiredCheckbox.addEventListener("change", function () {
    if(this.checked) {
        reverseDisplay.innerText = "Yes";
    } else {
        reverseDisplay.innerText = "No";
    }
})

/** END CHECKBOX */