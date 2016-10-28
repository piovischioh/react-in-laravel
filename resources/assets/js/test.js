var container = $('.container');
var table = $('<table/>').appendTo(container);
var tr = $('<tr/>').addClass('loading')
                   .appendTo(table);
var td = $('<td/>').attr('colspan', 4)
                   .text('Loading...')
                   .appendTo(tr);
var title = $('<tr/>').attr('id','title')
                   .appendTo(table);
$('<th/>').text('Name').appendTo(title);
$('<th/>').text('Email').appendTo(title);
$('<th/>').text('Number').appendTo(title);
$('<th/>').text('Content').appendTo(title);
$('<th/>').text('Edit').appendTo(title);
$('<th/>').text('Delete').appendTo(title);

var page = 1;
function getList() {
  $.ajax({
    url: '/list/' + page,
    dataType: 'json',
    success: function(res) {
      $('.loading', container).hide();
      $('.data', container).remove();
      if ( res.length ) {
        for ( var i in res ) {
          tr = $('<tr/>').addClass('data')
                         .data('id', res[i].id)
                         .appendTo(table);
          $('<td/>').text(res[i].name)
                    .appendTo(tr);
          $('<td/>').text(res[i].email)
                    .appendTo(tr);
          $('<td/>').text(res[i].number)
                    .appendTo(tr);
          $('<td/>').text(res[i].content)
                    .appendTo(tr);
          $('<td/>').addClass('edit')
                    .text('edit')
                    .appendTo(tr);
          $('<td/>').addClass('del')
                    .text('x')
                    .appendTo(tr);
        }
      }
      $('.del').click(del);
      $('.edit').click(edit);
    }
  });
}
getList();
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
    }
});
var dila = $('<p/>').addClass('warn').appendTo(container).hide(),
    form = $('<form/>').appendTo(container),
    labelforname = $('<label/>').attr("for","name").text('Name').appendTo(form),
    name = $('<input>').attr({"type":"text","name":"name","id":"name","placeholder":"Name"}).appendTo(form),
    labelforemail = $('<label/>').attr("for","email").text('Email').appendTo(form),
    email = $('<input>').attr({"type":"text","name":"email","id":"email","placeholder":"Email"}).appendTo(form),
    labelfornumber = $('<label/>').attr("for","number").text('Number').appendTo(form),
    number = $('<input>').attr({"type":"text","name":"number","id":"number","placeholder":"Number"}).appendTo(form),
    labelforcontent = $('<label/>').attr("for","content").text('Content').appendTo(form),
    content = $('<textarea></textarea>').attr({"name":"content","cols":"30","rows":"10","id":"content","placeholder":"Content"}).appendTo(form),
    btn = $('<button></button>').attr("type","submit").text('Add').appendTo(form);

function formCheck() {
  var isPass = true;
  var pattern1 = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var pattern2 = /^[09]{2}[0-9]{8}$/;
  var pattern3 = /^[\u4E00-\u9FA5]{2,4}$/;
  var name = $('#name').val();
  var email = $('#email').val();
  var number = $('#number').val();
  var content = $('#content').val();
  if(! content){
      dila.show().text('請填寫內容');
      isPass = false;
  }
  if (! pattern2.test(number)){
      dila.show().text('請填寫正確的手機格式');
      isPass = false;
  }
  if(! pattern1.test(email)){
      dila.show().text('請填寫正確的信箱格式');
      isPass = false;
  }
  if(! pattern3.test(name)){
      dila.show().text('請填寫正確的名字');
      isPass = false;
  }
  return isPass;
}
form.submit(function(e) {
  e.preventDefault();
  if (formCheck()) {
    $.ajax({
      url: '/content',
      type: 'post',
      dataType: 'json',
      data: {
        name: $('#name').val(),
        email: $('#email').val(),
        number: $('#number').val(),
        content: $('#content').val()
      },
      success: function(res) {
        tr = $('<tr/>').addClass('data')
                       .data('id', res.id)
                       .insertAfter(title);
        $('<td/>').text(res.name)
                  .appendTo(tr);
        $('<td/>').text(res.email)
                  .appendTo(tr);
        $('<td/>').text(res.number)
                  .appendTo(tr);
        $('<td/>').text(res.content)
                  .appendTo(tr);
        $('<td/>').addClass('edit')
                  .text('edit')
                  .appendTo(tr);
        $('<td/>').addClass('del')
                  .text('x')
                  .appendTo(tr);
        $('#name').val('');
        $('#email').val('');
        $('#number').val('');
        $('#content').val('');
        LengthCheck();
        $('.del').click(del);
        $('.edit').click(edit);
      },
      error: function(xhr) {

      }
    })
  }
});
function LengthCheck() {
  if ($('tr.data').length>15) {
    $('tr.data').eq(15).remove();
  }
}

function del() {
  var id = $(this).parent('tr').data('id');
  $.ajax({
    url: '/del',
    type: 'post',
    dataType: 'json',
    data: {
      id: id
    },
    success: function(res) {
      console.log(res);
      getList();
    }
  })
}
function edit() {
  var id = $(this).parent('tr').data('id');
  console.log('hit');
  var div = $('<div/>').appendTo($('body'));
  $('<label/>').attr("for","name").text('Name').appendTo(div),
  $('<input>').attr({"type":"text","name":"name","id":"name2","placeholder":"Name"}).val($(this).siblings().eq(0).text()).appendTo(div),
  $('<label/>').attr("for","email").text('Email').appendTo(div),
  $('<input>').attr({"type":"text","name":"email","id":"email2","placeholder":"Email"}).val($(this).siblings().eq(1).text()).appendTo(div),
  $('<label/>').attr("for","number").text('Number').appendTo(div),
  $('<input>').attr({"type":"text","name":"number","id":"number2","placeholder":"Number"}).val($(this).siblings().eq(2).text()).appendTo(div),
  $('<label/>').attr("for","content").text('Content').appendTo(div),
  $('<textarea></textarea>').attr({"name":"content","cols":"30","rows":"10","id":"content2","placeholder":"Content"}).val($(this).siblings().eq(3).text()).appendTo(div),
  $('<button></button>').attr("id","editbtn").text('Edit').appendTo(div);
  div.css({
     'display': 'none',
     'position': 'fixed',
     'top': '0',
     'z-index': '2',
     'background-color': 'white',
     'width': '100%',
     'height': '100%'
  });
  div.fadeIn(300);
  $('#editbtn').click(function () {
    $.ajax({
      url: '/edit',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        name: $('#name2').val(),
        email: $('#email2').val(),
        number: $('#number2').val(),
        content: $('#content2').val()
      },
      success: function(res) {
        console.log(res);
        div.remove();
        getList();
      }
    })
  })

}
