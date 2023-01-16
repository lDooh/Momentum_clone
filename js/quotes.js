const quotes = [
    {
        quote: "폭력이란 무능력자들의 마지막 피난처이다.",
        author: "<파운데이션 시리즈> 아이작 아시모프",
    },
    {
        quote: "하나는 모두를 위해, 모두는 하나를 위해.",
        author: "<삼총사>, 알렉상드르 뒤마",
    },
    {
        quote: "Pain is temporary. Quitting lasts forever.",
        author: "Lance Armstrong",
    },
    {
        quote: "누군가가 씹다 뱉어버린 껌 같은 삶이라도 나는 그걸 견디어 그 속에 얼마남지 않은 단물까지 집요하게 뽑을 것이다.",
        author: "<위저드 베이커리>, 구병모",
    },
    {
        quote: "수백년 동안 졌다고 해서 시작하기도 전에 이기려는 노력도 하지 말아야 할 까닭은 없으니까.",
        author: "<앵무새 죽이기>, 하퍼 리",
    },
    {
        quote: "중요한 것은 무엇이 주어졌느냐가 아니라, 주어진 것을 어떻게 활용하느냐이다.",
        author: "<미움받을 용기>, 기시미 이치로/고가 후미타케",
    },
    {
        quote: "인생은 남과 비교하는 것이 아니라, 어제의 나와 비교하는 것이다.",
        author: "<어떤 하루>, 신준모",
    },
    {
        quote: "헤아릴 수 없이 넓은 공간과 셀 수 없이 긴 시간 속에서 지구라는 작은 행성과 찰나의 순간을 그대와 함께 보낼 수 있음은 나에겐 큰 기쁨이었다.",
        author: "칼 세이건",
    },
    {
        quote: "훌륭한 주장은 훌륭한 증명이 수반되어야 한다.",
        author: "칼 세이건",
    },
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;