let amount = document.querySelector("#amount");
const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const convert  = document.querySelectorAll(".convert select");
const msg=document.querySelector("#msg");
const btn=document.querySelector("form button");


 for(let select of convert)
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD")
            newOption.selected="selected";
        if(select.name==="to" && currCode==="INR")
            newOption.selected="selected";
        select.append(newOption);
    }
    select.addEventListener("change",(item) =>{
        updateFlag(item.target);
    })
}

const updateFlag = (item) =>{
    const newCoun = item.value;
    let val = countryList[newCoun];
    let newSrc = `https://flagsapi.com/${val}/flat/64.png`;
    let flag = item.parentElement.querySelector("img");
    flag.src=newSrc;
}

const fetchAmt = async()=>{
    const amt = document.querySelector("form input");
    let amtVal = amt.value;
    if(amtVal < 1)
    {
        amt.value="1";
        amtVal="1";
    }
    const newUrl = `${url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    const res = await fetch(newUrl);
    let data = await res.json();
    let rate = data[to.value.toLowerCase()];
    let ans = rate * amtVal;
    msg.innerText=`${amtVal} ${from.value} = ${ans} ${to.value}`;
}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    fetchAmt();
})

window.addEventListener("load", ()=>{
    fetchAmt();
});