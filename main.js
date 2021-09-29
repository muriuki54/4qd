const tabSelectors = document.querySelectorAll(".tab_selector");
const controllerTabs = document.querySelectorAll(".controller_tab");

let preferedOption;

const innerTabs = document.querySelectorAll(".tab_inner_details");

const reverseDisplays = document.querySelectorAll(".reverse_required_display");
const reverseRequiredCheckboxes = document.querySelectorAll(".reverse_checkbox");

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
    switch(key) {
        case 0:
            preferedOption = "chooseByApplication";
            break;
        case 1:
            preferedOption = "chooseByMotor";
            break;
        case 2:
            preferedOption = "letUsChoose";
            break;
        default:
            preferedOption = "letUsChoose";
    }

    console.log(preferedOption);
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
        if(this.startIndex >= this.innerTabs.length - 1) {
            this.goToNextButton.classList.add("disable");
            return;
        } else {
            this.goToNextButton.classList.remove("disable");
            this.goToPreviousButton.classList.remove("disable");
        }
        this.startIndex += 1;
        this.translateX();
    })

    this.goToPreviousButton.addEventListener("click", () => {
        if(this.startIndex <= 0) {
            this.goToPreviousButton.classList.add("disable");
            return;
        } else {
            this.goToPreviousButton.classList.remove("disable");
            this.goToNextButton.classList.remove("disable");
        }
        this.startIndex -= 1;
        this.translateX();
    })
}

/** END INNER TABS */


/**CHECKBOX      */

Object.keys(reverseRequiredCheckboxes).forEach(function(key) {
    reverseRequiredCheckboxes[+key].addEventListener("change", function(e) {
        
        if(e.target.checked) {
            reverseDisplays[+key].innerText = "Yes";
        } else {
            reverseDisplays[+key].innerText = "No";
        }
    })
})

/** END CHECKBOX */

/** RANGE STYLES     */
const ranges = document.querySelectorAll("input[type='range']");
const rangesArr = [];
const toolTips = document.querySelectorAll(".range_tooltip");

Object.keys(ranges).forEach(function(key) {
    rangesArr.push(new Range(+key));

    ranges[key].addEventListener("input", function() {
        rangesArr[key].setToolTipText();
    })
})

function Range(key) {
        this.currentRangeIndex = key;
        // set tooltip text
        this.setToolTipText = function() {
        toolTips[this.currentRangeIndex].innerText = ranges[this.currentRangeIndex].value;

        let rangeVal = ranges[this.currentRangeIndex].value;
        let min = ranges[this.currentRangeIndex].min ? ranges[this.currentRangeIndex].min : 0;
        let max = ranges[this.currentRangeIndex].max ? ranges[this.currentRangeIndex].max : 24;
        let newVal = Number((rangeVal - min) * 100) / (max - min);

        // progress
        ranges[this.currentRangeIndex].style.backgroundSize = (rangeVal - min) * 100 / (max - min) + "% 100%";

        // Tooltip
        toolTips[this.currentRangeIndex].style.setProperty("left", "calc("+newVal+"% - 26px)");
    }
}
/** END RANGE STYLES */