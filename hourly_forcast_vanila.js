(function (){
    const forcastPanel = document.querySelector('.forcast-panel');
    const title = document.querySelector('.title');
    const key = '4e67a153a370f2cd2ef8117b50c8401c';

    // 도시 정보 초기화
    const url = "http://api.openweathermap.org/data/2.5/forecast?q=seoul&lang=kr&mode=json&units=metric&appid=" + key;
    
    // ajax 객체를 생성
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('httpRequest failed');
      return false;
    }

    httpRequest.onreadystatechange = forcastResult;
    httpRequest.open('GET', url, true);
    httpRequest.send();

    function forcastResult() {
      if(httpRequest.readyState === XMLHttpRequest.DONE) {
        if(httpRequest.status === 200) {
          const responseJSON = JSON.parse(httpRequest.responseText);
          // const formattedJSON = JSON.stringify(responseJSON, null, 2);
          console.log(responseJSON);
          // console.log(formattedJSON);

          resultWeather(responseJSON);
        } else {
          console.log('fail, code is ' + httpRequest.status);
        }
      }
    }

    function resultWeather(data) {
      let onlyDate;
      let currDate;

      data.list.map((eachList) => {
        currDate = new Date(eachList.dt_txt).toLocaleDateString();
        currTime = new Date(eachList.dt_txt).toLocaleTimeString();

        // 일 단위 데이터
        if(onlyDate !== currDate) {
          onlyDate = currDate;

          // 일 단위 노드 생성
          const dailyForcast_div = document.createElement('div');
          const h2 = document.createElement('h2');

          // 클래스 추가
          dailyForcast_div.classList.add('daily-forcast');

          // 일자 표시
          h2.textContent = onlyDate;

          // 노드 순서대로 적용?
          dailyForcast_div.appendChild(h2);
          forcastPanel.appendChild(dailyForcast_div);
        }

        // 시간단위 데이터
        // 노드 생성
        const hourlyWrapper_div = document.createElement('div');
        const innerHourly_div = document.createElement('div');
        const h3 = document.createElement('h3');
        const iconWrapper_div = document.createElement('div');
        const iconImg_img = document.createElement('img');
        const weatherStatus = document.createElement('p');
        const ul = document.createElement('ul');
        const currTemp_li = document.createElement('li');
        const feelTemp_li = document.createElement('li');
        const maxTemp_li = document.createElement('li');
        const minTemp_li = document.createElement('li');

        // 클래스 추가
        hourlyWrapper_div.classList.add('hourly-wrapper');
        iconWrapper_div.classList.add('icon-wrapper');

        // 내용 삽입
        h3.textContent = currTime;
        iconImg_img.setAttribute('src', "http://openweathermap.org/img/wn/" +
        eachList.weather[0].icon +
        "@2x.png")
        weatherStatus.textContent = eachList.weather[0].main;
        currTemp_li.textContent = '현재온도' + eachList.main.temp + ' ℃';
        feelTemp_li.textContent = '체감온도' + eachList.main.feels_like + ' ℃';
        maxTemp_li.textContent = '최고온도' + eachList.main.temp_max + ' ℃';
        minTemp_li.textContent = '최저온도' + eachList.main.temp_min + ' ℃';
        
        // 노드 구조 
        iconWrapper_div.appendChild(iconImg_img);
        iconWrapper_div.appendChild(weatherStatus);
        ul.appendChild(currTemp_li);
        ul.appendChild(feelTemp_li);
        ul.appendChild(maxTemp_li);
        ul.appendChild(minTemp_li);
        innerHourly_div.appendChild(h3);
        innerHourly_div.appendChild(iconWrapper_div);
        innerHourly_div.appendChild(ul);
        hourlyWrapper_div.appendChild(innerHourly_div);
        forcastPanel.appendChild(hourlyWrapper_div);
      });
    };
})(); 