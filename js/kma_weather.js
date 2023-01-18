const KMA_WEATHER_API_KEY = API_KEY.kmaweather;

let Re = 6371.00877;		// 사용할 지구(지도)반경 [km]
let grid = 5.0; 		// 격자간격 [km]
let slat1 = 30.0;		// 표준위도1 [degree]
let slat2 = 60.0;		// 표준위도2 [degree]
let olon = 126.0;		// 기준점의 경도 [degree]
let olat = 38.0; 		// 기준점의 위도 [degree]
let xo = 210 / grid;		// 기준점 X좌표 [격자거리]
let yo = 675 / grid;		// 기준점 Y좌표 [격자거리]
const DEGRAD = Math.PI / 180.0;

let re = Re / grid;
slat1 = slat1 * DEGRAD;
slat2 = slat2 * DEGRAD;
olon = olon * DEGRAD;
olat = olat * DEGRAD;

let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
ro = re * sf / Math.pow(ro, sn);

function getBaseDateTime() {
    let baseDateTime = "";
    const baseDate = new Date();
    baseDate.setMinutes(baseDate.getMinutes() - 45);    // API 제공 시간 고려

    baseDateTime = baseDate.getFullYear().toString() + 
        (baseDate.getMonth() + 1).toString().padStart(2, "0") +
        baseDate.getDate().toString().padStart(2, "0") +
        baseDate.getHours().toString().padStart(2, "0") +
        baseDate.getMinutes().toString().padStart(2, "0");
    
    return baseDateTime;
}

function getWeatherFromJSON(data) {
    forecast = data.response.body.items.item.sort(function(a, b) {
        return a.fcstDate - b.fcstDate || a.fcstTime - b.fcstTime;
    }).slice(0, 10);

    const t1h = forecast.find((item) => item.category == 'T1H').fcstValue;
    const sky = forecast.find((item) => item.category == 'SKY').fcstValue;
    const rn1 = forecast.find((item) => item.category == 'RN1').fcstValue;
    // const pty = forecast.find((item) => item.category == 'PTY');
    
    let c = "";
    if (sky == 1) {
        c = "맑음";
    } else if (sky == 2) {
        c = "구름 조금";
    } else if (sky == 3) {
        c = "구름 많음";
    } else if (sky == 4) {
        c = "흐림";
    }

    let fore = {
        temp: t1h,
        cloud: c,
        rain: rn1,
    }

    return fore;
}

function onGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let ra = Math.tan(Math.PI * 0.25 + latitude * DEGRAD * 0.5);
    ra = re * sf / Math.pow(ra, sn);
    let theta = longitude * DEGRAD - olon;
    if (theta > Math.PI) {
        theta -= 2.0 * Math.PI;
    }
    if (theta < -Math.PI) {
        theta += 2.0 * Math.PI;
    }
    theta *= sn;

    let nx = parseInt(parseFloat(ra * Math.sin(theta)) + xo + 1.5);
    let ny = parseInt(parseFloat(ro - ra * Math.cos(theta)) + yo + 1.5);

    const basetime = getBaseDateTime();

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst` + 
        `?serviceKey=${KMA_WEATHER_API_KEY}` +
        `&pageNo=1` +
        `&numOfRows=1000` +
        `&dataType=JSON` +
        `&base_date=${basetime.substring(0, 8)}` +
        `&base_time=${basetime.substring(8, 12)}` +
        `&nx=${nx}` +
        `&ny=${ny}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        tmp = data;
        data.response.body.items.item
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:last-child");

        fore = getWeatherFromJSON(data);

        // city.innerText = data.name;
        weather.innerText = `${fore.temp}℃, ${fore.cloud}, ${fore.rain}`;
    });
}

function onGeoError() {
    alert("Can't find your area.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);