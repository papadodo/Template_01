// 탭 및 토글 버튼 작동
const tabsList = document.querySelectorAll(".tabs");
tabsList.forEach((tabs) => {
    tabs.addEventListener("click", () => {
        const radioList = tabs.querySelectorAll("input[type='radio']");
        const checkedRadio = tabs.querySelector("input[type='radio']:checked");
        radioList.forEach((radio) => {
            document.querySelector(radio.dataset.tabTarget).style.display = "none";
        });
    
        document.querySelector(checkedRadio.dataset.tabTarget).style.display = "flex";
    });

    tabs.dispatchEvent(new Event("click"));
});

// 소수점 다섯자리 맞추기 + m 단위 붙이기
let mUnits = document.querySelectorAll(".mUnit");
mUnits.forEach((mUnit) => {
    mUnit.addEventListener("blur", () => {
        let currentVal = mUnit.value;
        mUnit.value = parseFloat(currentVal).toFixed(5) + " m";

        // let regexp = /\D/;
        // if(!isEmpty(currentVal) && !regexp.test(currentVal)) {
        //     number.value = currentVal + " m";
        // }
    });

    mUnit.addEventListener("focus", () => {
        let currentVal = mUnit.value;
        mUnit.value = currentVal.replace(" m", "");

        // if(!isEmpty(currentVal)) {
        //     number.value = currentVal.replace(" m", "");
        // }
    });
});

// Enter 누를 시 포커스 잃도록
let inputTexts = document.querySelectorAll('input[type="text"]');
inputTexts.forEach((inputText) => {
    inputText.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            inputText.blur();
        }
    });
});

// numberOfSpans 콤보박스 작동 - Layout 탭의 Support 토글
const numberOfSpansFunction1 = document.querySelector(".numberOfSpansFunction1");
numberOfSpansFunction1.addEventListener("change", () => {
    const supportToggles = document.querySelector("#supportToggles");
    const supportTogglesLabels = supportToggles.querySelectorAll("label");

    const value = parseInt(numberOfSpansFunction1.value);
    for(let i = 0; i < 6; i++) {
        supportTogglesLabels[i].style.display = "none"
    }

    for(let i = 0; i < value + 1; i++) {
        supportTogglesLabels[i].style.display = "block"
    }
});
numberOfSpansFunction1.dispatchEvent(new Event("change"));

// numberOfSpans 콤보박스 작동 - Model 탭의 Span 토글
const numberOfSpansFunction2 = document.querySelector(".numberOfSpansFunction2");
numberOfSpansFunction2.addEventListener("change", () => {
    const spanToggles = document.querySelector("#spanToggles");
    const spanTogglesLabels = spanToggles.querySelectorAll("label");

    const value = parseInt(numberOfSpansFunction2.value);
    for(let i = 0; i < 5; i++) {
        spanTogglesLabels[i].style.display = "none"
    }

    for(let i = 0; i < value; i++) {
        spanTogglesLabels[i].style.display = "block"
    }
});
numberOfSpansFunction2.dispatchEvent(new Event("change"));

// Layout 탭 Support 토글에 넣을 초기값
let toggleSupportData =[
    ["A1", "0.00000 m", "0.00000 m", "0.10000 m", "0.05000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"]
];
let toggleSupportDataLabel = [];
let toggleSupportDataLabelFilled = false;

// Layout 탭 Support 토글 작동
const supportToggles = document.querySelector("#supportToggles");
const supportLabels = supportToggles.querySelectorAll("label");
const supportContents = document.querySelector("#supportContents");
supportLabels.forEach((supportLabel) => {
    supportLabel.addEventListener("mousedown", (e) => {
        let currentSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);
        toggleSupportData[currentSupportNumber] = getSupportData(supportContents);
    
        let targetSupportNumber = parseInt(document.querySelector("#" + supportLabel.getAttribute("for")).dataset.value);
        setTargeSupportData(supportContents, toggleSupportData[targetSupportNumber]);
    });
});
let defaultSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);
console.log(supportToggles.querySelector("input:checked"));
setTargeSupportData(supportContents, toggleSupportData[defaultSupportNumber]);

function getSupportData(supportContents) {
    let currentSupportData = [];

    const dataTargets = supportContents.querySelectorAll(".dataTarget");
    dataTargets.forEach((dataTarget) => {
        const labels = dataTarget.querySelectorAll("label");
        const values = dataTarget.querySelectorAll("input, select");
        if (labels.length !== values.length) {
            console.log("Label and value numbers different.");
            return;
        }

        for (let i = 0; i < labels.length; i++) {
            currentSupportData.push(values[i].value);

            if(!toggleSupportDataLabelFilled) {
                toggleSupportDataLabel.push(labels[i].innerHTML);
            }
        }
    });

    toggleSupportDataLabelFilled = true;
    
    return currentSupportData;
}

function setTargeSupportData(supportContents, targetSupportData) {
    if(targetSupportData === undefined) {
        console.log("Data Empty.");
    }

    const inputSelects = [];

    const dataTargets = supportContents.querySelectorAll(".dataTarget");
    dataTargets.forEach((dataTarget) => {
        const tempInputSelectList = dataTarget.querySelectorAll("input, select");

        inputSelects.push(...tempInputSelectList);
    });
    
    if(targetSupportData.length !== inputSelects.length) {
        console.log("Data Number Error.");
    }

    for (let i = 0; i < targetSupportData.length; i++) {
        inputSelects[i].value = targetSupportData[i];

        if (inputSelects[i].tagName === "SELECT") {
            inputSelects[i].dispatchEvent(new Event("change"));
        }
    }
}





// toggleSpanDataLabel을 맨처음에 채워넣지 않았기에, Span 토글을 한 번 이상 클릭해야 지금 제대로 Json이 만들어짐.
// 실행되는 시점에 Label 배열을 채우도록 개선해야함 !!

// Model 탭 Span 토글에 넣을 초기값
let toggleSpanData = [
    ["0.00000 m","7","0.00000 m","2.50000 m","-11.25000 m","-8.75000 m","-6.25000 m","-3.75000 m","-1.25000 m","1.25000 m","3.75000 m","6.25000 m","8.75000 m","11.25000 m","0.08000 m","0.24000 m","0.00000 m","18.00000 m","0.45000 m","8.245000 m","0.61000 m","8.24500 m","0.45000 m","Left Barrier","Road","Median Strip","Road","Right Barrier","1","0.40000 m","14.55000 m","14.55000 m","0.00000 m","0.00000 m","0.40000 m","0.70000 m","0.90000 m","1.50000 m","0.71000 m","1.30000 m","0.30000 m","0.30000 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m"], 
    ["0.00000 m","7","0.00000 m","2.50000 m","-11.25000 m","-8.75000 m","-6.25000 m","-3.75000 m","-1.25000 m","1.25000 m","3.75000 m","6.25000 m","8.75000 m","11.25000 m","0.08000 m","0.24000 m","0.00000 m","18.00000 m","0.45000 m","8.245000 m","0.61000 m","8.24500 m","0.45000 m","Left Barrier","Road","Median Strip","Road","Right Barrier","1","0.40000 m","14.55000 m","14.55000 m","0.00000 m","0.00000 m","0.40000 m","0.70000 m","0.90000 m","1.50000 m","0.71000 m","1.30000 m","0.30000 m","0.30000 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m"], 
    ["0.00000 m","7","0.00000 m","2.50000 m","-11.25000 m","-8.75000 m","-6.25000 m","-3.75000 m","-1.25000 m","1.25000 m","3.75000 m","6.25000 m","8.75000 m","11.25000 m","0.08000 m","0.24000 m","0.00000 m","18.00000 m","0.45000 m","8.245000 m","0.61000 m","8.24500 m","0.45000 m","Left Barrier","Road","Median Strip","Road","Right Barrier","1","0.40000 m","14.55000 m","14.55000 m","0.00000 m","0.00000 m","0.40000 m","0.70000 m","0.90000 m","1.50000 m","0.71000 m","1.30000 m","0.30000 m","0.30000 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m"], 
    ["0.00000 m","7","0.00000 m","2.50000 m","-11.25000 m","-8.75000 m","-6.25000 m","-3.75000 m","-1.25000 m","1.25000 m","3.75000 m","6.25000 m","8.75000 m","11.25000 m","0.08000 m","0.24000 m","0.00000 m","18.00000 m","0.45000 m","8.245000 m","0.61000 m","8.24500 m","0.45000 m","Left Barrier","Road","Median Strip","Road","Right Barrier","1","0.40000 m","14.55000 m","14.55000 m","0.00000 m","0.00000 m","0.40000 m","0.70000 m","0.90000 m","1.50000 m","0.71000 m","1.30000 m","0.30000 m","0.30000 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m"], 
    ["0.00000 m","7","0.00000 m","2.50000 m","-11.25000 m","-8.75000 m","-6.25000 m","-3.75000 m","-1.25000 m","1.25000 m","3.75000 m","6.25000 m","8.75000 m","11.25000 m","0.08000 m","0.24000 m","0.00000 m","18.00000 m","0.45000 m","8.245000 m","0.61000 m","8.24500 m","0.45000 m","Left Barrier","Road","Median Strip","Road","Right Barrier","1","0.40000 m","14.55000 m","14.55000 m","0.00000 m","0.00000 m","0.40000 m","0.70000 m","0.90000 m","1.50000 m","0.71000 m","1.30000 m","0.30000 m","0.30000 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m","0.17500 m"]
];
let toggleSpanDataLabel = [];
let toggleSpanDataLabelFilled = false;

// Model 탭 Span 토글 작동
const spanToggles = document.querySelector("#spanToggles");
const spanLabels = spanToggles.querySelectorAll("label");
const spanContents = document.querySelector("#spanContents");
spanLabels.forEach((spanLabel) => {
    spanLabel.addEventListener("mousedown", (e) => {
        let currentSpanNumber = parseInt(spanToggles.querySelector("input:checked").dataset.value);
        toggleSpanData[currentSpanNumber] = getSpanData(spanContents);
    
        let targetSpanNumber = parseInt(document.querySelector("#" + spanLabel.getAttribute("for")).dataset.value);
        setTargetSpanData(spanContents, toggleSpanData[targetSpanNumber]);
    });
});
let defaultSpanNumber = parseInt(spanToggles.querySelector("input:checked").dataset.value);
setTargetSpanData(spanContents, toggleSpanData[defaultSpanNumber]);

function getSpanData(spanContents) {
    let currentSpanData = [];

    const dataTargets = spanContents.querySelectorAll(".dataTarget");
    dataTargets.forEach((dataTarget) => {
        const labels = dataTarget.querySelectorAll("label");
        const values = dataTarget.querySelectorAll("input, select");
        if (labels.length !== values.length) {
            console.log("Label and value numbers different.");
            return;
        }

        for (let i = 0; i < labels.length; i++) {
            currentSpanData.push(values[i].value);

            if(!toggleSpanDataLabelFilled) {
                toggleSpanDataLabel.push(labels[i].innerHTML);
            }
        }
    });

    toggleSpanDataLabelFilled = true;

    return currentSpanData;
}
function setTargetSpanData(spanContents, targetSpanData) {
    if(targetSpanData === undefined) {
        console.log("Data Empty.");
    }

    const inputSelects = [];

    const dataTargets = spanContents.querySelectorAll(".dataTarget");
    dataTargets.forEach((dataTarget) => {
        const tempInputSelectList = dataTarget.querySelectorAll("input, select");

        inputSelects.push(...tempInputSelectList);
    });
    
    if(targetSpanData.length !== inputSelects.length) {
        console.log("Data Number Error.");
    }

    for (let i = 0; i < targetSpanData.length; i++) {
        inputSelects[i].value = targetSpanData[i];

        if (inputSelects[i].tagName === "SELECT") {
            inputSelects[i].dispatchEvent(new Event("change"));
        }
    }
}

// girderNumber 콤보박스 작동
const girderNumber = document.querySelector("#model-girderNumber");
girderNumber.addEventListener("change", () => {
    let value = parseInt(girderNumber.value);
    for(let i = value + 1; i <= 10; i++) {
        const girders = document.querySelector(".girderNumerFunction1");
        const target = girders.querySelector(`li:nth-child(${i})`);
        target.style.display = "none";
    }

    for(let i = value; i >= 1; i--) {
        const girders = document.querySelector(".girderNumerFunction1");
        const target = girders.querySelector(`li:nth-child(${i})`);
        target.style.display = "block";
    }

    for(let i = value + 1; i <= 10; i++) {
        const girders = document.querySelector(".girderNumerFunction2");
        const target = girders.querySelector(`li:nth-child(${i})`);
        target.style.display = "none";
    }

    for(let i = value; i >= 1; i--) {
        const girders = document.querySelector(".girderNumerFunction2");
        const target = girders.querySelector(`li:nth-child(${i})`);
        target.style.display = "block";
    }

    for(let i = value + 1; i <= 10; i++) {
        const girders = document.querySelector(".girderNumerFunction3");
        const target = girders.querySelector(`li:nth-child(${i})`);
        target.style.display = "none";
    }

    for(let i = value; i >= 1; i--) {
        const girders = document.querySelector(".girderNumerFunction3");
        const target = girders.querySelector(`li:nth-child(${i})`);
        target.style.display = "block";
    }
});
girderNumber.dispatchEvent(new Event("change"));

// midCrossBeam 콤보박스 작동
const midCrossBeam = document.querySelector("#model-midCrossBeam");
midCrossBeam.addEventListener("change", () => {
    let value = parseInt(midCrossBeam.value);

    for(let i = 3; i <= 6; i++) {
        const spacings = document.querySelector(".midCrossBeamFunction1");
        const target = spacings.querySelector(`li:nth-child(${i})`);
        target.style.display = "none";
    }

    for(let i = 3; i <= value + 3; i++) {
        const spacings = document.querySelector(".midCrossBeamFunction1");
        const target = spacings.querySelector(`li:nth-child(${i})`);
        target.style.display = "block";

        let result = 29.1000 / (value + 1);
        target.querySelector("input").value = floatToMeter(result);
    }
});
midCrossBeam.dispatchEvent(new Event("change"));

// Girder Spacing Apply
const girderSpacingApply = document.querySelector("#girderSpacingApply");
girderSpacingApply.addEventListener("click", () => {
    const girderSpacing = document.querySelector("#model-girderSpacing");
    const value = meterToFloat(girderSpacing.value);

    for(let i = 1; i <= 9; i++) {
        const girders = document.querySelector(".girderNumerFunction1");
        const target = girders.querySelector(`li:nth-child(${i + 1}) input`);
        
        let result = meterToFloat(girders.querySelector(`li:nth-child(${i}) input`).value) + value

        target.value = floatToMeter(result);
    }
});

// Bearing Height Apply
const bearingHeightApply = document.querySelector("#bearingHeightApply");
bearingHeightApply.addEventListener("click", () => {
    const bearingHeight = document.querySelector("#model-bearingHeight");
    const value = meterToFloat(bearingHeight.value);

    var girders = document.querySelector(".bearingHeightFunction1");
    for(let i = 1; i <= 10; i++) {
        girders.querySelector(`li:nth-child(${i}) input`).value = floatToMeter(value);
    }

    var girders = document.querySelector(".bearingHeightFunction2");
    for(let i = 1; i <= 10; i++) {
        girders.querySelector(`li:nth-child(${i}) input`).value = floatToMeter(value);
    }
});

// Title 클릭하면 접히는 효과
const titles = document.querySelectorAll(".title");
let titesStatus = {};
titles.forEach((title) => {
    titesStatus[title.querySelector(".title_text").innerHTML] = true;

    title.addEventListener("click", (event) => {
        let target = title;

        if(titesStatus[target.querySelector(".title_text").innerHTML]) {
            titesStatus[target.querySelector(".title_text").innerHTML] = false;

            for(let i = 0; i < title.parentElement.children.length - 1; i++) {
                target = target.nextElementSibling;
    
                target.style.display = "none";
            }
        }

        else {
            titesStatus[target.querySelector(".title_text").innerHTML] = true;

            for(let i = 0; i < title.parentElement.children.length - 1; i++) {
                target = target.nextElementSibling;
    
                target.style.display = "flex";
            }
        }
    });
});

const createAssemblyUnit = document.querySelector("#footer-createAssemblyUnit");
createAssemblyUnit.addEventListener("click", collectData);
function collectData() {
    let currentSpanNumber = parseInt(spanToggles.querySelector("input:checked").dataset.value);
    toggleSpanData[currentSpanNumber] = getSpanData(spanContents);

    let result = {};
    
    for (let i = 0; i < toggleSpanData.length; i++) {
        for (let j = 0; j < toggleSpanData[i].length; j++) {
            if(toggleSpanData[i].length !== toggleSpanDataLabel.length) {
                console.log("Data Number Error.");
                break;
            }

            if(!result.hasOwnProperty(toggleSpanDataLabel[j])) {
                result[toggleSpanDataLabel[j]] = [toggleSpanData[i][j]];

                continue;
            }

            result[toggleSpanDataLabel[j]].push(toggleSpanData[i][j]);
        }
    }

    console.log(result);
    console.log(toggleSpanData);

    // window.chrome.webview.postMessage(JSON.stringify(result));
}

// console.log(document.querySelector("#model-girderNumber").value);
// document.querySelector("#model-girderNumber").value = "5";
// console.log(document.querySelector("#model-girderNumber").value);
// // select 의 value 를 변경하여서 값 변경이 가능.
// // 그런데, 이벤트가 연결되어 있는 경우에는 change 이벤트를 강제로 trigger 해줘야 함.

// console.log(document.querySelector("#model-girderNumber").tagName);
// // tagName 값을 사용해서 해당 DOM 의 태그가 무엇인지 알 수 있음.
// // 이것을 이용해서 해당 태그가 SELECT 인 경우에는 change 이벤트 trigger 이런 식으로 가면 될 듯.

// let dataaaaa = [];
// console.log(dataaaaa);
// dataaaaa[3] = 5;
// console.log(dataaaaa);
// // 자바스크립트 문번 진짜 ㄹㅇ ㅈㄴ 스마트하다... ㄷㄷ 리스트 가운데에 값을
// // 그냥 넣었을 때 문제 없이 넣어주네. [빈 X 3, 5] 이렇게 주네 ㄷㄷ

// let numnum = 10;
// console.log(numnum.length);
// console.log(numnum.length > 0);
// console.log(!numnum.length > 0);
// // 숫자의 경우 length 를 붙이면 undefined 가 리턴되고, undefined 는 숫자와
// // 비교 되었을 때 false 가 나오네.

// dataaaaa.push(...[1, 2]);
// console.log(dataaaaa);
// let newnew = dataaaaa.concat([10, 20]);
// console.log(dataaaaa);
// console.log(newnew);
// // concat 함수도 가능은 한데, 얘는 합쳐진 놈이 리턴되는 방식이라서 불편하네.
// // ... 연산자를 사용해서 리스트의 각 항목들을 push 한다는 방식으로 가는
// // 편이 훨씬 좋을 것 같음.

// const values = [];
// // console.log(values);
// const dataTargets = document.querySelectorAll(".dataTarget");
// dataTargets.forEach((dataTarget) => {
//     const tempInputSelectList = dataTarget.querySelectorAll("input, select");
//     // console.log(tempInputSelectList);
//     values.push(...tempInputSelectList);
// });
// // console.log(values);
// // 일반 Array 가 아니라 NodeList의 경우에도 ... 연산자를 사용해서 모든 구성
// // 요소 각각을 선택할 수도 있음.

// // if(labels[i].parentElement.style.display === "none") {
// //     continue;
// // }

// // parentElement 의 display === "none" 이면  for 문 넘어가기.

function meterToFloat(strNumber) {
    return parseFloat(strNumber.replace(" m", ""));
}

function floatToMeter(number) {
    return number.toFixed(5) + " m";
}