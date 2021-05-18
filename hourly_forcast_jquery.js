(function () {
    // 결과 표시 프레임
    const $forcastPanel = $(".forcast-panel");
    const $title = $(".title");

    // api
    const key = "4e67a153a370f2cd2ef8117b50c8401c";

    // 도시 정보 초기화
    const url = "http://api.openweathermap.org/data/2.5/forecast?q=seoul&lang=kr&mode=json&units=metric&appid=" + key;


    // 날씨 데이터 객체
    let forcastObject = $.ajax(url);

    forcastObject
      .then((data) => {
        // 데이터 성공시 실행
        forcastResult(data);
        // console.log("Date");
      })
      .fail((err) => {
        // 데이터 실패시 실행
        console.log(err);
      });

    // 데이터 받아오기 성공시 실행항 함수
    function forcastResult(data) {
      let onlyDate;
      let currDate;

      $forcastPanel.children().remove();

      $.map(data.list, (eachList) => {
        currDate = new Date(eachList.dt_txt).toLocaleDateString();
        currTime = new Date(eachList.dt_txt).toLocaleTimeString();

        if (onlyDate !== currDate) {
          onlyDate = currDate;
          $forcastPanel.append(
            $('<div class="daily-forcast">').append($("<h2>").text(onlyDate))
          );
        }

        $forcastPanel.append(
          $('<div class="hourly-wrapper">').append(
            $("<div>").append(
              $("<h3>").text(currTime),
              $('<div class="icon-wrapper">').append(
                $("<img>").attr(
                  "src",
                  "http://openweathermap.org/img/wn/" +
                    eachList.weather[0].icon +
                    "@2x.png"
                ),
                $("<p>").text(eachList.weather[0].main)
              ),
              $("<ul>").append(
                $("<li>").text("현재온도: " + eachList.main.temp + " ℃"),
                $("<li>").text("체감온도: " + eachList.main.feels_like + " ℃"),
                $("<li>").text("최고온도: " + eachList.main.temp_max + " ℃"),
                $("<li>").text("최저온도: " + eachList.main.temp_min + " ℃")
              )
            )
          )
        );
      });
    }
})();
