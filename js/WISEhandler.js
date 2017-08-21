var deviceIpAddress = "192.168.0.15";
var deviceAccount = "root";
var devicePassword = "00000000";

$(document).ready(function(){
  putLoginData();
  loadDIvalues();
  loadAIvalues();
  loadDOvalues();
  setInterval(function(){
      loadDIvalues();
      loadAIvalues();
      loadDOvalues();
    }, 1000);
});

function putLoginData(){
  $("#ip").html(deviceIpAddress);
  $("#login").html(deviceAccount);
}

function loadDIvalues()
{
    $(function() {
        $.ajax({
          url: 'http://' + deviceIpAddress + '/di_value/slot_0',
          type: 'GET',
          dataType: 'json',
          success: function(data){
            if (data.DIVal[0].Val==0){
              $("#DI0").addClass("btn-light").removeClass("btn-warning").html('OFF');
            } else {
              $("#DI0").addClass("btn-warning").removeClass("btn-light").html('ON');
            }
            if (data.DIVal[1].Val==0){
              $("#DI1").addClass("btn-light").removeClass("btn-warning").html('OFF');
            } else {
              $("#DI1").addClass("btn-warning").removeClass("btn-light").html('ON'); 
            }
          },
          error: function(xhr, ajaxOptions, thrownError) {console.log(xhr.status)},
          beforeSend: setHeader
        });
      });
    
    function setHeader(xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(deviceAccount + ":" + devicePassword));
    }
}

function loadAIvalues()
{
    $(function() {
        $.ajax({
          url: 'http://' + deviceIpAddress + '/ai_value/slot_0',
          type: 'GET',
          dataType: 'json',
          success: function(data){
            $("#AI0").html(data.AIVal[0].Val/1000);
            $("#AI1").html(data.AIVal[1].Val/1000);
          },
          error: function(xhr, ajaxOptions, thrownError) {console.log(xhr.status)},
          beforeSend: setHeader
        });
      });
    
    function setHeader(xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(deviceAccount + ":" + devicePassword));
    }
}

function loadDOvalues(){

    $(function() {
        $.ajax({
          url: 'http://' + deviceIpAddress + '/do_value/slot_0',
          type: 'GET',
          dataType: 'json',
          success: function(data){
            if (data.DOVal[0].Val==0){
              $("#DO0").addClass("btn-light").removeClass("btn-warning").html('OFF');
            } else {
              $("#DO0").addClass("btn-warning").removeClass("btn-light").html('ON');
            }
            if (data.DOVal[1].Val==0){
              $("#DO1").addClass("btn-light").removeClass("btn-warning").html('OFF');
            } else {
              $("#DO1").addClass("btn-warning").removeClass("btn-light").html('ON'); 
            }
          },
          error: function(xhr, ajaxOptions, thrownError) {console.log(xhr.status)},
          beforeSend: setHeader
        });
      });
    
    function setHeader(xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(deviceAccount + ":" + devicePassword));
    }
}

function setDOvalue(channelNumber, value){

  $(function() {
    $.ajax({
      url: 'http://' + deviceIpAddress + '/do_value/slot_0',
      type: 'PATCH',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
              "DOVal":
                [{
                  "Ch": channelNumber,
                  "Val": value
                }]
            }),
      // success: function(data){
      //   console.log(data);
      // },
      error: function(xhr, ajaxOptions, thrownError) {
        if (xhr.status==200){
          loadDOvalues();
        }
      },
      beforeSend: setHeader
    });
  });

  function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(deviceAccount + ":" + devicePassword));
  }

}

function toggleDO(channelNumber) {
  if ($("#DO"+channelNumber).html()=="ON") {
    setDOvalue(channelNumber, 0);
  }
  if ($("#DO"+channelNumber).html()=="OFF") {
    setDOvalue(channelNumber, 1);
  }
  
}
