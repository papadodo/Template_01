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





/*
    해결해야하는 문제
    3) Show Hide를 Class로 통제하는 방식. 지금 해야할 듯. NumSpans 값에 의해서 옵션의 개수가 변하네.
    4) NumSpans 값에 따라서 초기값도 변하네.
    4번은 3번과 같은 방식으로 해결하면 될 것 같은데 ?? Object를 사용하면 문제 없을 듯.

    dataTarget 이라는 이름을 부여한 이유: 1) json 파일 수월하게 만들기 위해.
    2) 토글 버튼을 바꿀 때 get과 set 함수를 수월하게 사용하기 위해.

    그런데 "equation" 및 "sum"을 사용하고 싶은 경우 id 를 사용해야할 것 같네.

    id 사용하는 거는 ㄹㅇ 미련한 짓일 수 있어.

    왜냐면 저 값이 계속해서 업데이트 되기 위해서는 onblur 함수로 연결이 되어야 해.
    그런데 여기서 id 를 넣는다고 그게 해결이 되니 ?? 네버 에버 에버 에버 에버
    onblur의 적용 대상이 바뀌어야 한다는 점 -> 이게 제일로 중요한 거니까... 무일아.
    지금 equation, sum 이 짓하는 거는 ㄹㅇ 노쓸모임.

    아냐아냐 쓸모 많을 것 같아... onblur 를 붙일 대상과 합에 포함시킬 대상은 결과적으로 같잖아.
    id로 통제하는 것이 결과적으로는 쓸모가 꽤 많을 것 같은데 ??
    그리고 솔직히 선택자를 자동으로 생성해주는 것은 내가 자신이 없다.

    지금까지는 set 이랑 get 에서 그리고 json 생성에서 dataTarget 이라는 이름으로 갔었는데...
    길게 봤을 때 id 를 부여하는 방식이 결코 틀리지 않을 것 같아.

    일단 다 바꾸려고는 하지 말고, equation 은 id 로 통제하는 방식을 구현해보자.
    이거를 먼저 구현하고 클래스로 Function 통제하는 것 구현해보면 될 것 같네.

    와 eval 함수가 진짜로 혁신적이구나 ㄷㄷ 계산은 끝마쳤네 성공적으로 !!

    이렇게까지 해야하는 가에 대해서는 좀 고민이 되네.

    그런데 문제가 set을 부른 후 get을 부르다 보니 함수를 해제시켜 버리네 ㅠㅠㅠㅠㅠ
    처음부터 Label을 들고 있게끔 만들어야 해 !!

    일단 깔끔하게 누를 경우에는 잘 작동하고 있네.
    입력하던 중에 Number of Spans 값을 바꿔버릴 경우에 문제가 발생하고 있음.
    이 부분을 해결합시다 !!

    해결해야하는 문제.
    1. 없는 옵션을 선택했을 때 Number of Spans 값을 바꾸면 체크해제 되어야 함.
    2. 이 체크 해제 때문에 문제가 많음.

    Create 버튼 이벤트는 체크 해제 없이도 일단 구현은 가능하니까.
    내일 하도록 합시다.
*/




// Layout 탭 Support 토글에 넣을 초기값
let toggleSupportData = {
    "1": [
        ["A1", ["readonly", "0.00000 m"], ["readonly", "0.00000 m"], "0.10000 m", "0.05000 m", "Start", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"],
        ["A1", ["readonlyequation", "toggleSupportData['1'][0][3]+toggleSupportData['1'][0][4]+#layout-GirderLength+#layout-ExpansionLength+#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", "0.10000 m", "0.05000 m", "End", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"]
    ], 
    "2": [
        ["A1", ["readonly", "0.00000 m"], ["readonly", "0.00000 m"], "0.10000 m", "0.05000 m", "Start", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"],
        ["A1", ["readonlyequation", "toggleSupportData['2'][0][3]+toggleSupportData['2'][0][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.40000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['2'][1][4]+#layout-GirderLength+#layout-ExpansionLength+#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", "0.10000 m", "0.05000 m", "End", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"]
    ], 
    "3": [
        ["A1", ["readonly", "0.00000 m"], ["readonly", "0.00000 m"], "0.10000 m", "0.05000 m", "Start", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"],
        ["A1", ["readonlyequation", "toggleSupportData['3'][0][3]+toggleSupportData['3'][0][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.40000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['3'][1][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['3'][2][4]+#layout-GirderLength+#layout-ExpansionLength+#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", "0.10000 m", "0.05000 m", "End", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"]
    ], 
    "4": [
        ["A1", ["readonly", "0.00000 m"], ["readonly", "0.00000 m"], "0.10000 m", "0.05000 m", "Start", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"],
        ["A1", ["readonlyequation", "toggleSupportData['4'][0][3]+toggleSupportData['4'][0][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.40000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['4'][1][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['4'][2][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['4'][3][4]+#layout-GirderLength+#layout-ExpansionLength+#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", "0.10000 m", "0.05000 m", "End", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"]
    ], 
    "5": [
        ["A1", ["readonly", "0.00000 m"], ["readonly", "0.00000 m"], "0.10000 m", "0.05000 m", "Start", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"],
        ["A1", ["readonlyequation", "toggleSupportData['5'][0][3]+toggleSupportData['5'][0][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.40000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['5'][1][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['5'][2][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['5'][3][4]+#layout-GirderLength+0.5*#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", ["readonly", "0.00000 m"], "0.10000 m", "Start", "0.40000 m", "0.00000 m", "0.50000 m"],
        ["A1", ["readonlyequation", "0.5*toggleSupportData['5'][4][4]+#layout-GirderLength+#layout-ExpansionLength+#layout-SlabProtrusionLength", "0.00000 m"], "29.90000 m", "0.10000 m", "0.05000 m", "End", "0.40000 m", ["readonly", "0.00000 m"], "0.50000 m"]
    ]
};
let toggleSupportDataLabel = ["Support Name", "Span Length", "Girder Length", "Expansion Length", "Slab Protrusion Length", "Girder Connection", "Bearing Location(B1)", "Bearing Location(B2)", "Height Spacing"];

// Model 탭 Span 토글에 넣을 초기값
let toggleSpanData = [
    ["0.00000 m", "7", "0.00000 m", "2.50000 m", "-11.25000 m", "-8.75000 m", "-6.25000 m", "-3.75000 m", "-1.25000 m", "1.25000 m", "3.75000 m", "6.25000 m", "8.75000 m", "11.25000 m", "0.08000 m", "0.24000 m", "0.00000 m", "18.00000 m", "0.45000 m", ["readonly", "8.24500 m"], "0.61000 m", ["readonly", "8.24500 m"], "0.45000 m", "Left Barrier", "Road", "Median Strip", "Road", "Right Barrier", "1", "0.40000 m", "14.55000 m", "14.55000 m", "0.00000 m", "0.00000 m", "0.40000 m", "0.70000 m", "0.90000 m", "1.50000 m", "0.71000 m", "1.30000 m", "0.30000 m", "0.30000 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m"],  
    ["0.00000 m", "7", "0.00000 m", "2.50000 m", "-11.25000 m", "-8.75000 m", "-6.25000 m", "-3.75000 m", "-1.25000 m", "1.25000 m", "3.75000 m", "6.25000 m", "8.75000 m", "11.25000 m", "0.08000 m", "0.24000 m", "0.00000 m", "18.00000 m", "0.45000 m", ["readonly", "8.24500 m"], "0.61000 m", ["readonly", "8.24500 m"], "0.45000 m", "Left Barrier", "Road", "Median Strip", "Road", "Right Barrier", "1", "0.40000 m", "14.55000 m", "14.55000 m", "0.00000 m", "0.00000 m", "0.40000 m", "0.70000 m", "0.90000 m", "1.50000 m", "0.71000 m", "1.30000 m", "0.30000 m", "0.30000 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m"],  
    ["0.00000 m", "7", "0.00000 m", "2.50000 m", "-11.25000 m", "-8.75000 m", "-6.25000 m", "-3.75000 m", "-1.25000 m", "1.25000 m", "3.75000 m", "6.25000 m", "8.75000 m", "11.25000 m", "0.08000 m", "0.24000 m", "0.00000 m", "18.00000 m", "0.45000 m", ["readonly", "8.24500 m"], "0.61000 m", ["readonly", "8.24500 m"], "0.45000 m", "Left Barrier", "Road", "Median Strip", "Road", "Right Barrier", "1", "0.40000 m", "14.55000 m", "14.55000 m", "0.00000 m", "0.00000 m", "0.40000 m", "0.70000 m", "0.90000 m", "1.50000 m", "0.71000 m", "1.30000 m", "0.30000 m", "0.30000 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m"],  
    ["0.00000 m", "7", "0.00000 m", "2.50000 m", "-11.25000 m", "-8.75000 m", "-6.25000 m", "-3.75000 m", "-1.25000 m", "1.25000 m", "3.75000 m", "6.25000 m", "8.75000 m", "11.25000 m", "0.08000 m", "0.24000 m", "0.00000 m", "18.00000 m", "0.45000 m", ["readonly", "8.24500 m"], "0.61000 m", ["readonly", "8.24500 m"], "0.45000 m", "Left Barrier", "Road", "Median Strip", "Road", "Right Barrier", "1", "0.40000 m", "14.55000 m", "14.55000 m", "0.00000 m", "0.00000 m", "0.40000 m", "0.70000 m", "0.90000 m", "1.50000 m", "0.71000 m", "1.30000 m", "0.30000 m", "0.30000 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m"],  
    ["0.00000 m", "7", "0.00000 m", "2.50000 m", "-11.25000 m", "-8.75000 m", "-6.25000 m", "-3.75000 m", "-1.25000 m", "1.25000 m", "3.75000 m", "6.25000 m", "8.75000 m", "11.25000 m", "0.08000 m", "0.24000 m", "0.00000 m", "18.00000 m", "0.45000 m", ["readonly", "8.24500 m"], "0.61000 m", ["readonly", "8.24500 m"], "0.45000 m", "Left Barrier", "Road", "Median Strip", "Road", "Right Barrier", "1", "0.40000 m", "14.55000 m", "14.55000 m", "0.00000 m", "0.00000 m", "0.40000 m", "0.70000 m", "0.90000 m", "1.50000 m", "0.71000 m", "1.30000 m", "0.30000 m", "0.30000 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m", "0.17500 m"]
];
let toggleSpanDataLabel = ["Girder Alignment", "Girder Number", "Layout Offset", "Girder Spacing", "Girder-1", "Girder-2", "Girder-3", "Girder-4", "Girder-5", "Girder-6", "Girder-7", "Girder-8", "Girder-9", "Girder-10", "Pave.Thickness", "Slab Thickness", "Vertical Sag", "Desk Width", "Spacing(L1)", "Spacing(L2)", "Spacing(L3)", "Spacing(L4)", "Spacing(L5)", "Type(L1)", "Type(L2)", "Type(L3)", "Type(L4)", "Type(L5)", "Mid.Cross Beam", "Spacing(BS)", "Spacing(CR1)", "Spacing(CR2)", "Spacing(CR3)", "Spacing(CR4)", "Spacing(BE)", "Girder(a)", "Girder(b)", "Girder(c)", "End Cross Beam(a)", "Middle Cross Beam(a)", "End Cross Beam(b)", "Middle Cross Beam(b)", "Girder-1(Start)", "Girder-2(Start)", "Girder-3(Start)", "Girder-4(Start)", "Girder-5(Start)", "Girder-6(Start)", "Girder-7(Start)", "Girder-8(Start)", "Girder-9(Start)", "Girder-10(Start)", "Girder-1(End)", "Girder-2(End)", "Girder-3(End)", "Girder-4(End)", "Girder-5(End)", "Girder-6(End)", "Girder-7(End)", "Girder-8(End)", "Girder-9(End)", "Girder-10(End)"];





const numberOfSpans = document.querySelector("#layout-numberOfSpans");
let numberOfSpansValue = numberOfSpans.value;
numberOfSpans.addEventListener("focus", () => {
    numberOfSpansValue = numberOfSpans.value;
    console.log(numberOfSpansValue);
});
numberOfSpans.addEventListener("change", () => {
    let currentSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);
    getCurrentData(supportContents, toggleSupportData[numberOfSpansValue], currentSupportNumber);

    if(supportToggles.querySelector("input:checked").nextElementSibling.style.display === "none") {
        document.querySelector("#layout-support1toggle").checked = true;
    }

    numberOfSpansValue = numberOfSpans.value;
    console.log(numberOfSpansValue);
    let targetSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);
    console.log(targetSupportNumber);
    setTargerData(supportContents, toggleSupportData[numberOfSpansValue], targetSupportNumber);
});

// Layout 탭 Support 토글 작동
const supportToggles = document.querySelector("#supportToggles");
const supportLabels = supportToggles.querySelectorAll("label");
const supportContents = document.querySelector("#supportContents");
supportLabels.forEach((supportLabel) => {
    supportLabel.addEventListener("click", (e) => {
        let currentSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);
        
        numberOfSpansValue = numberOfSpans.value;
        getCurrentData(supportContents, toggleSupportData[numberOfSpansValue], currentSupportNumber);
    
        let targetSupportNumber = parseInt(document.querySelector("#" + supportLabel.getAttribute("for")).dataset.value);
        setTargerData(supportContents, toggleSupportData[numberOfSpansValue], targetSupportNumber);
    });
});
let defaultSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);

numberOfSpansValue = numberOfSpans.value;
setTargerData(supportContents, toggleSupportData[numberOfSpansValue], defaultSupportNumber);

// Model 탭 Span 토글 작동
const spanToggles = document.querySelector("#spanToggles");
const spanLabels = spanToggles.querySelectorAll("label");
const spanContents = document.querySelector("#spanContents");
spanLabels.forEach((spanLabel) => {
    spanLabel.addEventListener("click", (e) => {
        let currentSpanNumber = parseInt(spanToggles.querySelector("input:checked").dataset.value);
        getCurrentData(spanContents, toggleSpanData, currentSpanNumber);
    
        let targetSpanNumber = parseInt(document.querySelector("#" + spanLabel.getAttribute("for")).dataset.value);
        setTargerData(spanContents, toggleSpanData, targetSpanNumber);
    });
});
let defaultSpanNumber = parseInt(spanToggles.querySelector("input:checked").dataset.value);
setTargerData(spanContents, toggleSpanData, defaultSpanNumber);



function getCurrentData(contents, toggleData, currentSupportNumber) {
    let currentSupportData = toggleData[currentSupportNumber];

    const inputSelects = [];
    const labels = [];

    const dataTargets = contents.querySelectorAll(".dataTarget");
    dataTargets.forEach((dataTarget) => {
        const tempInputSelects = dataTarget.querySelectorAll("input, select");
        const tempLabels = dataTarget.querySelectorAll("label");

        inputSelects.push(...tempInputSelects);
        labels.push(...tempLabels);
    });
    
    if(currentSupportData.length !== inputSelects.length) {
        console.log("Data Number Error.");
        return;
    }

    for (let i = 0; i < currentSupportData.length; i++) {
        if(getType(currentSupportData[i]) === "Array") {
            switch(currentSupportData[i][0]) {
                case "readonly":
                    currentSupportData[i][1] = inputSelects[i].value;
                    break;

                case "equation":
                    // 수식이 들어가는 경우 onblur함수 해제는 필요함. But 계산 방식 변경은 없기에. 리스트 값 변경은 불필요할 듯.
                    break;

                case "readonlyequation":
                    // 수식이 들어가는 경우 onblur함수 해제는 필요함. But 계산 방식 변경은 없기에. 리스트 값 변경은 불필요할 듯.

                    inputSelects[i].readOnly = true;
                    // 수식이 들어가는 경우 set은 값 변경 뿐만아니라 onblur함수도 연결해야 함.

                    let operators = currentSupportData[i][1].match(/[\+\*\/]/g);
                    let values = currentSupportData[i][1].split(/[\+\*\/]/);
                    let calculateArray = [];
                    for (let i = 0; i < operators.length; i++) {
                        calculateArray.push(values[i]);
                        calculateArray.push(operators[i]);
                    }
                    calculateArray.push(values[values.length - 1]);

                    for (let j = 0; j < calculateArray.length; j++) {
                        // #으로 시작한 경우.
                        if (/^#/.test(calculateArray[j])) {
                            let target = document.querySelector(calculateArray[j]);

                            target.onblur = function() {
                                console.log("Deleted");
                            };

                            oneForBlur = target;
                        }
                    }
                    
                    break;
            }
        }
        else {
            currentSupportData[i] = inputSelects[i].value;
        }
    }

    toggleSupportDataLabelFilled = true;
    toggleSpanDataLabelFilled = true;
}

function setTargerData(contents, toggleData, targetSupportNumber) {
    let targetSupportData = toggleData[targetSupportNumber];

    if(targetSupportData === undefined) {
        console.log("Data Empty.");
        return;
    }

    const inputSelects = [];

    const dataTargets = contents.querySelectorAll(".dataTarget");
    dataTargets.forEach((dataTarget) => {
        const tempInputSelectList = dataTarget.querySelectorAll("input, select");

        inputSelects.push(...tempInputSelectList);
    });
    
    if(targetSupportData.length !== inputSelects.length) {
        console.log("Data Number Error.");
        return;
    }

    let oneForBlur = null;
    for (let i = 0; i < targetSupportData.length; i++) {
        // console.log(inputSelects[i]);
        if (getType(targetSupportData[i]) === "String") {
            inputSelects[i].readOnly = false;
            inputSelects[i].value = targetSupportData[i];
        }
        else if (getType(targetSupportData[i]) === "Array") {
            switch(targetSupportData[i][0]) {
                case "readonly":
                    // console.log(inputSelects[i]);
                    inputSelects[i].readOnly = true;
                    inputSelects[i].value = targetSupportData[i][1];
                    break;

                case "equation":
                    // 수식이 들어가는 경우 set은 값 변경 뿐만아니라 onblur함수도 연결해야 함.
                    break;

                case "readonlyequation":
                    inputSelects[i].readOnly = true;
                    // 수식이 들어가는 경우 set은 값 변경 뿐만아니라 onblur함수도 연결해야 함.

                    let operators = targetSupportData[i][1].match(/[\+\*\/]/g);
                    let values = targetSupportData[i][1].split(/[\+\*\/]/);
                    let calculateArray = [];
                    for (let i = 0; i < operators.length; i++) {
                        calculateArray.push(values[i]);
                        calculateArray.push(operators[i]);
                    }
                    calculateArray.push(values[values.length - 1]);

                    for (let j = 0; j < calculateArray.length; j++) {
                        // #으로 시작한 경우.
                        if (/^#/.test(calculateArray[j])) {
                            let target = document.querySelector(calculateArray[j]);
                            
                            target.onblur = function() {
                                let result = calculateFunction(calculateArray);
                                inputSelects[i].value = floatToMeter(result);
                                targetSupportData[i][2] = floatToMeter(result);
                            };

                            oneForBlur = target;
                        }
                    }

                    break;
            }
        }

        if (inputSelects[i].tagName === "SELECT") {
            inputSelects[i].dispatchEvent(new Event("change"));
        }
    }
    if (oneForBlur !== null) {
        oneForBlur.dispatchEvent(new Event("blur"));
    }
}

function calculateFunction(calculateArray) {
    let equation = "";

    for (let i = 0; i < calculateArray.length; i++) {
        // #으로 시작한 경우.
        if (/^#/.test(calculateArray[i])) {
            let target = document.querySelector(calculateArray[i]);
            equation += meterToFloat(target.value);

            calculateArray[i].onblur;
        }

        // 숫자로 시작한 경우.
        else if (/^\d/.test(calculateArray[i])) {
            equation += parseFloat(calculateArray[i]);
        }

        // 문자로 시작한 경우.
        else if (/^\w/.test(calculateArray[i])) {
            equation += meterToFloat(eval(calculateArray[i]));
        }

        else if (/[\+\*\/]/.test(calculateArray[i])) {
            equation += calculateArray[i];
        }

        else {
            console.log("Wrong initial value.");
            return;
        }
    }

    return eval(equation);
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
let titlesStatus = {};
titles.forEach((title) => {
    titlesStatus[title.querySelector(".title_text").innerHTML] = true;

    title.addEventListener("click", () => {
        let target = title;

        if(titlesStatus[target.querySelector(".title_text").innerHTML]) {
            titlesStatus[target.querySelector(".title_text").innerHTML] = false;

            for(let i = 0; i < title.parentElement.children.length - 1; i++) {
                target = target.nextElementSibling;
    
                target.style.display = "none";
            }
        }

        else {
            titlesStatus[target.querySelector(".title_text").innerHTML] = true;

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
    // console.log(toggleSupportDataLabel);
    // console.log(toggleSupportData);
    // console.log(toggleSpanDataLabel);
    // console.log(toggleSpanData);

    let currentSupportNumber = parseInt(supportToggles.querySelector("input:checked").dataset.value);
    let currentSpanNumber = parseInt(spanToggles.querySelector("input:checked").dataset.value);
    numberOfSpansValue = numberOfSpans.value;
    getCurrentData(supportContents, toggleSupportData[numberOfSpansValue], currentSupportNumber);
    getCurrentData(spanContents, toggleSpanData, currentSpanNumber);
    
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
    for (let i = 0; i < toggleSupportData[numberOfSpansValue].length; i++) {
        for (let j = 0; j < toggleSupportData[numberOfSpansValue][i].length; j++) {
            if(toggleSupportData[numberOfSpansValue][i].length !== toggleSupportDataLabel.length) {
                console.log("Data Number Error.");
                break;
            }

            if(!result.hasOwnProperty(toggleSupportDataLabel[j])) {
                result[toggleSupportDataLabel[j]] = [toggleSupportData[numberOfSpansValue][i][j]];

                continue;
            }

            result[toggleSupportDataLabel[j]].push(toggleSupportData[numberOfSpansValue][i][j]);
        }
    }

    console.log(result);

    window.chrome.webview.postMessage(JSON.stringify(result));
}

function meterToFloat(strNumber) {
    return parseFloat(strNumber.replace(" m", ""));
}

function floatToMeter(number) {
    return number.toFixed(5) + " m";
}

function getType(target){
    return Object.prototype.toString.call(target).slice(8,-1);
}