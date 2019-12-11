var that;
class Tab {
  constructor(id) {
    that = this;
    this.main = document.querySelector(id);
    this.lis = this.main.querySelectorAll('.firstnav ul li');
    this.sections = this.main.querySelectorAll('section');
    this.init();
  }
  //init  初始化操作让相关的元素绑定事件
  init() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.sections[i].ondblclick = this.editTab2;
    }
  }
  //1、切换功能
  toggleTab() {
    that.clearClass();
    this.className = 'liactive';
    that.sections[this.index].className = 'sonaction';
  }
  //清除类名
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = '';
      that.sections[i].className = '';
    }
  }
}
new Tab('#tab')

// 列表请求
$(function () {
  $.ajax({
      url: 'http://127.0.0.1:5000/get_all_msg',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        for (let value of data) {
          console.log(value);
          let $cloneli = $('.list').first().clone();
          $cloneli.find('.Head-portrait').attr('src', value.avatar);
          $cloneli.find('.liName').html(value.title);
          $cloneli.find('.time').html(value.time);
          $cloneli.appendTo('.lists ul')
          $cloneli.click(function () {
            console.log(value.detail);
            let $clonedetails = $('.details').first().clone();
            $clonedetails.find('.details-img').attr('src', value.avatar);
            $clonedetails.find('.details-title').html(value.title);
            $clonedetails.find('.details-name').html(value.author);
            $clonedetails.find('.detail-content').html(value.detail);
            $clonedetails.find('.detail-time').html(value.time);
            $clonedetails.appendTo('.In-the')
            $('.Modal-dialog').show();
            $('.Details-page').show();
          })
        }
      }
    }),
    // 提交按钮
    $('#btnclick').click(function () {
      if ($('#nickname').val() != '' && $('#title').val() != '' && $('#text').val() != '' && $('#img ').val() != '') {
        console.log('全部有值');
        // 发送请求
        $.ajax({
          url: 'http://127.0.0.1:5000/add_msg',
          data: {
            title: $('#nickname').val(),
            author: $('#title').val(),
            detail: $('#text').val(),
            avatar: $('#img ').val()
          },
          success(data) {
            console.log(data);
          }
        })
      } else {
        $('.Modal-dialog').show();
        $('.prompt').show();
      }

    })
  $('.determine').click(function () {
    $('.Details-page').hide();
    $('.Modal-dialog').hide();
    $('.In-the').empty();
    $('.prompt').hide();
  })
  // })



  // $(function () {
  $("#search_frame").hide();
  $.ajax({
    url: 'https://api.asilu.com/weather/',
    data: {
      city: '广州'
      /*
      霾:沈阳
      阵雪:长春 吉林
      多云转小雪:牡丹江
      七台河 :小雪转晴 阵雪
      */
    },
    dataType: 'jsonp',
    success(data) {
      $('.site').html(data.city);
      $('.bagtemperature').html(data.weather[0].temp);
      $('.date').html(data.date);
      $('.pm25 a').html(data.pm25);
      $weather = data.weather[0].weather;
      $('.Status').html(data.weather[0].weather);
      $('.weather-img').attr('src', './' + data.weather[0].icon2 + '.png');
      $('.temperature').html(data.weather[0].temp);
      // 更新背景图片
      EstimateWeatherimg($weather);

      // 循环气温列表
      for (let value of data.weather) {
        let $cloneweatherli = $('.weatherli').first().clone();
        $cloneweatherli.find('.day').html(value.date); //日期
        $cloneweatherli.find('.Status').html(value.weather); //状态
        $cloneweatherli.find('.weather-img').attr('src', './' + value.icon2 + '.png'); //状态图
        $cloneweatherli.find('.temperature').html(value.temp); //温度
        $cloneweatherli.appendTo('.weather')
        console.log(value.icon2);

      }
      $('.weather .day').first().html('今天');
      console.log($('.weather .day'));

    }
  })

  $('.search').click(function () {
    $("#search_frame").show(2000);
  })
  $('.searchBtn').click(function () {
    $('.weather').empty();
    let text = $('.searchInput').val();
    $.ajax({
      url: 'https://api.asilu.com/weather/',
      data: {
        city: text
      },
      dataType: 'jsonp',
      success(data) {
        $('.site').html(data.city);
        $('.bagtemperature').html(data.weather[0].temp);
        $('.date').html(data.date);
        $('.pm25 a').html(data.pm25);
        $weather = data.weather[0].weather;
        $('.Status').html(data.weather[0].weather);
        $('.weather-img').attr('src', './' + data.weather[0].icon2 + '.png');
        $('.temperature').html(data.weather[0].temp);
        // 更新背景图片
        EstimateWeatherimg($weather);

        // 循环气温列表
        for (let value of data.weather) {
          let $cloneweatherli = $('.weatherli').first().clone();
          $cloneweatherli.find('.day').html(value.date); //日期
          $cloneweatherli.find('.Status').html(value.weather); //状态
          $cloneweatherli.find('.weather-img').attr('src', './' + value.icon2 + '.png'); //状态图
          $cloneweatherli.find('.temperature').html(value.temp); //温度
          $cloneweatherli.appendTo('.weather');
        }
        $('.weather .day').first().html('今天');
      }
    })
    $("#search_frame").hide(2000);

  })
})
// 更新背景方法
function EstimateWeatherimg(weather) {
  if (weather === '晴') {
    $('#weatherpage').css("background-image", "url(./images/天气_晴.jpg)");
  } else if (weather === '多云转晴') {
    $('#weatherpage').css("background-image", "url(./images/天气_晴.jpg)");
  } else if (weather === '雾转晴') {
    $('#weatherpage').css("background-image", "url(./images/天气_晴.jpg)");
  } else if (weather === '小雪转晴') {
    $('#weatherpage').css("background-image", "url(./images/天气_晴.jpg)");
  } else if (weather === '小雨') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雨.jpg)");
  } else if (weather === '暴雨') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雨.jpg)");
  } else if (weather === '阴转小雨') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雨.jpg)");
  } else if (weather === '阴') {
    $('#weatherpage').css("background-image", "url(./images/天气_阴天.jpg)");
  } else if (weather === '多云转阴') {
    $('#weatherpage').css("background-image", "url(./images/天气_阴天.jpg)");
  } else if (weather === '晴转阴') {
    $('#weatherpage').css("background-image", "url(./images/天气_阴天.jpg)");
  } else if (weather === '晴转多云') {
    $('#weatherpage').css("background-image", "url(./images/天气_多云.jpg)");
  } else if (weather === '小雪转多云') {
    $('#weatherpage').css("background-image", "url(./images/天气_多云.jpg)");
  } else if (weather === '多云') {
    $('#weatherpage').css("background-image", "url(./images/天气_多云.jpg)");
  } else if (weather === '阴转多云') {
    $('#weatherpage').css("background-image", "url(./images/天气_多云.jpg)");
  } else if (weather === '阵雪') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雪.jpg)");
  } else if (weather === '晴转小雪') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雪.jpg)");
  } else if (weather === '小雪') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雪.jpg)");
  } else if (weather === '多云转小雪') {
    $('.#weatherpage').css("background-image", "url(./images/天气_下雪.jpg)");
  } else if (weather === '大雪转小雪') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雪.jpg)");
  } else if (weather === '大雪') {
    $('#weatherpage').css("background-image", "url(./images/天气_下雪.jpg)");
  } else if (weather === '雾') {
    $('#weatherpage').css("background-image", "url(./images/天气_雾天.jpg)");
  } else if (weather === '霾') {
    $('#weatherpage').css("background-image", "url(./images/天气_霾.jpg)");
  } else {
    alert('没有你要的信息')
  }
}