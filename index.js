const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector(".input");
const infoText = wrapper.querySelector(".info-text");
const synonyms = wrapper.querySelector(".synonyms .list");
const volume = wrapper.querySelector(".word i");
const removeIcon = wrapper.querySelector("span");
function result(data,word){
    if(data.title)
    {
        infoText.innerHTML=`cant find the meaning of ${word}.Please search for another word`
    }
    else
    {
        console.log(data);
        wrapper.classList.add("active");
        let phonetics=`${data[0].meanings[0].partOfSpeech}/${data[0].phonetics[0].text} `;
        wrapper.classList.add("active");
        document.querySelector(".word p").innerText = data[0].word;
        document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = data[0].meanings[0].definitions[0].definition;
        document.querySelector(".Example span").innerText = data[0].meanings[0].definitions[0].example;
        audio = new Audio("https:" + data[0].phonetics[0].audio);


        if(data[0].meanings[0].definitions[0].synonyms[0]==undefined)
        {
             synonyms.parentElement.style.display="none";
        }
        else{
            synonyms.parentElement.style.display="block";
            synonyms.innerHTML="";
            for(let i=0;i<5;i++)
            {
            let tag=`<span>${data[0].meanings[0].definitions[0].synonyms[i]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }
    }
}

function fetchApi(word){
   infoText.innerHTML=`Searching the maeaning of "${word}"`;
   let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
   fetch(url).then((res)=>res.json()).then(data=>result(data,word));
}
searchInput.addEventListener("keyup",(e)=>{
    if(e.key==="Enter" && e.target.value)
    {
        fetchApi(e.target.value);
    }
})
volume.addEventListener("click",()=>{
    audio.play();
});
removeIcon.addEventListener(("click"),()=>{
    searchInput.value="";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.innerHTML="Type a word and press enter to get meaning,example,pronunciation and synonyms"
})