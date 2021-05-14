(function() {
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=4e67a153a370f2cd2ef8117b50c8401c&units=metric';

  weatherObject = $.ajax(url);

  weatherObject.then((data) => {
    console.log(data);

    $('.current_weather').append(
      $('<h2>').text('Current Weather Info'),
      $('<h3>').text(data.name),
      $('<div>').text('현재온도: ' + data.main.temp + ' ℃'),
      $('<div>').text('체감온도: ' + data.main.feels_like + ' ℃'),
      $('<div>').text('최저온도: ' + data.main.temp_min + ' ℃'),
      $('<div>').text('최고온도: ' + data.main.temp_max + ' ℃'),
      $('<div>').text('습도: ' + data.main.humidity + ' ％'),
      $('<img>').attr('src', 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@2x.png'),

    )
    
  }).fail((err) => {
    console.log(err)
  });

  // $.ajax(url, {
  //   success: function(data) {
  //     console.log(data)
  //   },
  //   error: function(err) {
  //     console.log(err)
  //   }
  // })
      
})();

// openweathermap key
// 4e67a153a370f2cd2ef8117b50c8401c

// 기상청_지상(종관, ASOS) 시간자료 조회서비스 key
//	UVRlv3EEGKtzDQFucVFqvIjvKH7VYFa1DyDx6udcJdYUk8MtgUmS4suJ2mjLi4e9kscJXOhAGyXLt%2Bd4G71CfA%3D%3D 



// UVRlv3EEGKtzDQFucVFqvIjvKH7VYFa1DyDx6udcJdYUk8MtgUmS4suJ2mjLi4e9kscJXOhAGyXLt%2Bd4G71CfA%3D%3D
// 
// UVRlv3EEGKtzDQFucVFqvIjvKH7VYFa1DyDx6udcJdYUk8MtgUmS4suJ2mjLi4e9kscJXOhAGyXLt+d4G71CfA==