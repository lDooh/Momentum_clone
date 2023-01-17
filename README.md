# Momentum 클론 코딩

## Lecture

[노마드코더 바닐라 JS로 크롬 앱 만들기](https://nomadcoders.co/javascript-for-beginners)

## 추가&변경점

### API KEY

+ js/key.js 파일에 API키를 추가

```js
// key.js file
const API_KEY = {
    openweather: '{API_KEY}',
}
```

```html
<html>
    <body>
        <script src="js/key.js"></script>
        ...
```

```js
// weather.js file
const OPEN_API_KEY = API_KEY.openweather;
```

### 이름 & ToDo 공백검사 함수

```js
// str_validate.js file
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
```

+ 입력한 이름 & ToDo가 공백으로만 이루어져 있다면 true를 반환한다.

## 기상청 날씨 API 이용

+ [기상청기상청_단기예보 ((구)_동네예보) 조회서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084)