
let url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-40584778-A798-44B7-BAB6-6C1A92CD0002'

let cities = [
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'],
    ['基隆市', '新北市', '臺北市', '桃園市', '新竹市', '新竹縣',],
    ['苗栗縣', '臺中市', '南投縣', '彰化縣', '雲林縣'],
    ['嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣'],
    ['宜蘭縣', '花蓮縣', '臺東縣'],
    ['澎湖縣', '金門縣', '連江縣'],
];

// 取得現在當下時間
var nowTime = setInterval(function(){ myTimer() }, 1000);
 
function myTimer() {
    const date = new Date().toLocaleString();
    let local = document.querySelector('.local');
    local.innerHTML = date;
}

// function nowTime(){
//     const date = new Date().toLocaleString();
//     // new Date(year, month, day, hour, minutes, seconds, milliseconds);
//     console.log(date);  // "2019/10/11 下午3:25:00"
//     let local = document.querySelector('.local');
//     local.innerHTML = date;
// } setInterval(nowTime ,1000) //重覆每秒執行


// //先創建一個Date實體
// var time = new Date();
// //獲取當前時間(取得的值為一個毫秒数值)
// var theTime = time.getTime(); //1558492972644
// var timeDetails = {
//   year: time.getFullYear(),
//   month: time.getMonth() + 1, 注意月份值由 0 開始
//   date: time.getDate(),
//   hour: time.getHours(),
//   minute: time.getMinutes(),
//   second: time.getSeconds(),
// };



//應用二維陣列
// a = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
// ]
// a[0] = [1,2,3];
// a[0][1] = 2;
let nowCities; //天氣卡需要顯示的那些城市
let orgData = {}; //用來放組織過後的資料
let orgData2 = {};
nowCities = cities[0]; //第一列=>全部城市

fetch_data(); //取資料

function fetch_data() { //非同步處理=>ajax
    fetch(url) //去遠端取資料
        .then(function (response) { //然後=>把資料做轉換
            return response.json();
        })
        .then(function (data) { //然後=>打轉換後的資料回傳
            console.log(data); //顯示你所接收後的資料後=>再來決定如何使用
            organizationData(data); //處理資料的組織
            arrange_cities(); //處理所有的每一個城市
        });
}

function organizationData(data) {
    let locations = data.records.location; //所有城市
    locations.forEach(location => { //箭頭函數的表示方法,location名稱可以隨意
        // console.log('location=', location);
        let locationName = location.locationName; //取城市名稱
        // console.log(locationName);
        let loc_we_t_0 = location.weatherElement[0].time[0]; //取出時間訊息
        let loc_we_t_1 = location.weatherElement[0].time[1]; //取出時間訊息(第6-12小時)


        let startTime = loc_we_t_0.startTime; //取開始時間
        let endTime = loc_we_t_0.endTime; //取結束時間
        let wx = loc_we_t_0.parameter.parameterName;
        let maxT = location.weatherElement[4].time[0].parameter.parameterName;
        let minT = location.weatherElement[2].time[0].parameter.parameterName;
        // console.log(maxT, minT);
        let pop = location.weatherElement[1].time[0].parameter.parameterName; //舒適度
        // console.log(pop);
        let ci = location.weatherElement[3].time[0].parameter.parameterName;
        // console.log(ci);

        let wxNum = loc_we_t_0.parameter.parameterValue;//天氣type
        let wxNumFuture = loc_we_t_1.parameter.parameterValue;
        console.log(wxNum, wxNumFuture);

        let startTime2 = loc_we_t_1.startTime;
        let endTime2 = loc_we_t_1.endTime;
        let wx2 = loc_we_t_1.parameter.parameterName;
        let maxT2 = location.weatherElement[4].time[1].parameter.parameterName;
        let minT2 = location.weatherElement[2].time[1].parameter.parameterName;
        let pop2 = location.weatherElement[1].time[1].parameter.parameterName;
        let ci2 = location.weatherElement[3].time[1].parameter.parameterName;

        orgData[locationName] = {
            'wx': wx,
            'startTime': startTime,
            'endTime': endTime,
            'maxT': maxT,
            'minT': minT,
            'pop': pop,
            'ci': ci,
            'wxNum': wxNum,
            'wx2': wx2,
            'startTime2': startTime2,
            'endTime2': endTime2,
            'maxT2': maxT2,
            'minT2': minT2,
            'pop2': pop2,
            'ci2': ci2,
            'wxNumFuture': wxNumFuture,
        }
        console.log(orgData);

    });
}






// 處理每一個城市
function arrange_cities() {
   
    let region = document.querySelector('.region');
    region.innerHTML = '';

    nowCities.forEach((city, index) => { //使用箭頭函數表示
        let cityData = orgData[city];
        console.log('cityData=>', city, cityData);
        //////////////////////
        let number1 = parseInt(cityData.wxNum);
        switch (number1) {

            case 1: case 2: case 3:
                weather_pic = "./img/day.svg";
                break;
            ///多雲
            case 4: case 5: case 6:
                weather_pic = "./img/cloudy-day-2.svg";
                break;
            case 7: //陰天
                weather_pic = "./img/cloudy.svg";
                break;
            case 8: case 9: case 10: case 11: case 12: case 13: case 14: //雨
                weather_pic = "./img/rainy-5.svg";
                break;
            case 15: case 16: case 17: case 18: //雷
                weather_pic = "./img/thunder.svg";
                break;
            case 19: case 20: //雷雨
                weather_pic = "./img/thunder.svg";
                break;
            case 21: case 22: //雷雨
                weather_pic = "./img/thunder.svg";
                break;
            case 23: //雪雨
                weather_pic = "./img/snowy-3.svg";
                break;
            case 24: //晴
                weather_pic = "./img/day.svg";
                break;
            case 25: case 26: case 27: case 28: //陰
                weather_pic = "./img/cloudy.svg";
                break;
            case 29: case 30: //雨
                weather_pic = "./img/rainy-7.svg";
                break;
            default:
                weather_pic = "./img/weather.svg";
                break
        }
        console.log(weather_pic)


        ////////////////////// 

        region.innerHTML +=
            `
            <div class="all">
            <h3>${city}</h3>
            <div class="weather">
                <span>${cityData.wx}</span>
                <img src=${weather_pic} alt="">
            </div>
            <p>溫度：${cityData.minT} ~${cityData.maxT}度</p>
            <p>降雨機率：${cityData.pop}%</p>
            </div>
            `

        function arrange_cities_flip() {
            let region = document.querySelector('.region');
            region.innerHTML = '';

            nowCities.forEach((city, index) => { //使用箭頭函數表示
                let cityData = orgData[city];
                console.log('cityData=>', city, cityData);

                let number1 = parseInt(cityData.wxNum);
                let number2 = parseInt(cityData.wxNumFuture);
                console.log(number1, number2);

                switch (number1) {

                    case 1: case 2: case 3:
                        weather_pic = "./img/day.svg";
                        break;
                    ///多雲
                    case 4: case 5: case 6:
                        weather_pic = "./img/cloudy-day-2.svg";
                        break;
                    case 7: //陰天
                        weather_pic = "./img/cloudy.svg";
                        break;
                    case 8: case 9: case 10: case 11: case 12: case 13: case 14: //雨
                        weather_pic = "./img/rainy-5.svg";
                        break;
                    case 15: case 16: case 17: case 18: //雷
                        weather_pic = "./img/thunder.svg";
                        break;
                    case 19: case 20: //雷雨
                        weather_pic = "./img/thunder.svg";
                        break;
                    case 21: case 22: //雷雨
                        weather_pic = "./img/thunder.svg";
                        break;
                    case 23: //雪雨
                        weather_pic = "./img/snowy-3.svg";
                        break;
                    case 24: //晴
                        weather_pic = "./img/day.svg";
                        break;
                    case 25: case 26: case 27: case 28: //陰
                        weather_pic = "./img/cloudy.svg";
                        break;
                    case 29: case 30: //雨
                        weather_pic = "./img/rainy-7.svg";
                        break;
                    default:
                        weather_pic = "./img/weather.svg";
                        break
                }
                switch (number2) {

                    case 1: case 2: case 3:
                        weather_pic2 = "./img/day.svg";
                        break;
                    ///多雲
                    case 4: case 5: case 6:
                        weather_pic2 = "./img/cloudy-day-2.svg";
                        break;
                    case 7: //陰天
                        weather_pic2 = "./img/cloudy.svg";
                        break;
                    case 8: case 9: case 10: case 11: case 12: case 13: case 14: //雨
                        weather_pic2 = "./img/rainy-5.svg";
                        break;
                    case 15: case 16: case 17: case 18: //雷
                        weather_pic2 = "./img/thunder.svg";
                        break;
                    case 19: case 20: //雷雨
                        weather_pic2 = "./img/thunder.svg";
                        break;
                    case 21: case 22: //雷雨
                        weather_pic2 = "./img/thunder.svg";
                        break;
                    case 23: //雪雨
                        weather_pic2 = "./img/snowy-3.svg";
                        break;
                    case 24: //晴
                        weather_pic2 = "./img/day.svg";
                        break;
                    case 25: case 26: case 27: case 28: //陰
                        weather_pic2 = "./img/cloudy.svg";
                        break;
                    case 29: case 30: //雨
                        weather_pic2 = "./img/rainy-7.svg";
                        break;
                    default:
                        weather_pic2 = "./img/weather.svg";
                        break
                }
                console.log(weather_pic)
                console.log(weather_pic2)

                region.innerHTML +=
                    `
                    <div class="flip-card">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <h3>${city}</h3>
                                        <div class="weather-now">
                                        <span>${cityData.wx}</span>
                                        <img src=${weather_pic} alt="">
                                        </div>
                                        <p>${cityData.ci}，降雨機率：${cityData.pop}%</p>
                                        <p>最低溫：${cityData.minT} 最高溫：${cityData.maxT}</p>
                                        <h6>${cityData.startTime.substr(0, 16).replace('-', '/')} -${cityData.endTime.substr(0, 16).replace('-', '/')}</h6>
                                    </div>
                                    <div class="flip-card-back">
                                        <div class="weather-future">
                                        <span>${cityData.wx2}</span>
                                        <img src=${weather_pic2} alt="">
                                        </div>
                                        <p>${cityData.ci2}，降雨機率：${cityData.pop2}%</p>
                                        <p>最低溫：${cityData.minT2} 最高溫：${cityData.maxT2}</p>
                                        <h6>${cityData.startTime2.substr(0, 16).replace('-', '/')} -${cityData.endTime2.substr(0, 16).replace('-', '/')}</h6>
                                        </div>
                                </div>
                    </div>
                    `
            });
            //字串.substr(loc,num); 從loc位置取num個
            //字串.replace(str1,str2); 把所有的str1換成str2

        }

        let btn_all = document.querySelector('#btn-all');
        btn_all.addEventListener('click', function () {
            window.location.reload();//重新載入頁面
        })

        let btn_north = document.querySelector('#btn-north');
        btn_north.addEventListener('click', function () {
            region.innerHTML = '';
            nowCities = cities[1];
            arrange_cities_flip();
        });

        let btn_middle = document.querySelector('#btn-middle');
        btn_middle.addEventListener('click', function () {
            region.innerHTML = '';
            nowCities = cities[2];
            arrange_cities_flip();
        });
        let btn_south = document.querySelector('#btn-south');
        btn_south.addEventListener('click', function () {
            region.innerHTML = '';
            nowCities = cities[3];
            arrange_cities_flip();
        });
        let btn_east = document.querySelector('#btn-east');
        btn_east.addEventListener('click', function () {
            region.innerHTML = '';
            nowCities = cities[4];
            arrange_cities_flip();
        });

        let btn_island = document.querySelector('#btn-island');
        btn_island.addEventListener('click', function () {
            region.innerHTML = '';
            nowCities = cities[5];
            arrange_cities_flip();
        });
    })
}

// `
// <div class="single-card">
//     ${index}單張卡片切版內容
//     <p>${city}</p>
//     <p>${cityData.wx}</p>
//     <p>最高溫度：${cityData.maxT}</p>
//     <p>最低溫度：${cityData.minT}</p>
//     <p>舒適度：${cityData.ci}</p>
//     <p>降雨機率：${cityData.pop} %</p>
//     <p>${cityData.startTime.substr(0, 16).replace('-', '/')}</p>
//     <p>${cityData.endTime.substr(0, 16).replace('-', '/')}</p>
//     </div>
//     `




