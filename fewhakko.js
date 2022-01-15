function register() {
    $('#fewhakko').prop('disabled', true);
    $("#fewhakko").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    if ($('#usernamefew').val().search(/[^a-zA-Z0-9]/) !== -1) {
        swalalert('ผิดพลาด!', 'ชื่อผู้ใช้กรอกได้เฉพาะ a-Z, A-Z, 0-9 และ _ (underscore)', 'error')

        $('#fewhakko').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko").html("<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก");
    }
    else {
        $.post("../_fewno1.php?register", { username: $('#usernamefew').val(), password1: $('#password1few').val(), password2: $('#password2few').val(), email: $('#emailfew').val(), recaptcha: $('#g-recaptcha-response').val() }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') {
                swalalert('สำเร็จ!', obj.message, 'success')
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
            }
            $('#fewhakko').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
            $("#fewhakko").html("<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก");
        }
        );
    }
}


function vipserver() {
    $('#fewhakko').prop('disabled', true);
    $("#fewhakko").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");
    $.post("../_fewno1.php?vipserver", { step: 1, name: $('#usernamegame').val(), point: $('#amount').val() }, function(data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            Swal.fire({
                title: 'ตรวจสอบข้อมูล',
                html: '<hr><div class="mt-3"><img src=" ' + obj.data.user.avatar + ' " style="height:30px" class="rounded-circle roblox-avatar"> <span class="roblox-username">' + obj.data.user.username + '</span></div>' +
                    '<div class="mt-3"><a href="' + obj.data.place.url + '" target="_blank" id="game-link"><img src="' + obj.data.place.img + '" class="img-fluid" style="height:150px;" id="game-image"></a></div>' +
                    '<div class="py-2 text-center">' +
                    '<a class="btn btn-dark mt-2 mb-2" id="game-config" target="_blank" href="' + obj.data.place.url + '"><i class="fas fa-cogs"></i> Configure Game</a><br>' +
                    'กรุณาไปที่ Access หา Private servers เปลี่ยนเป็น Paid และตั้ง<br><small>ราคาเป็น ' +
                    '<b class="x-2 py-1 badge" style="background:#C32F27;color:white; font-size: 16px;" >' + obj.robux + ' R$</b>&nbsp;&nbsp;' +
                    'เพื่อที่จะได้รับ R$ เข้าในระบบบัญชี <b class="total-current-price badge" style="background:#C32F27;color:white; font-size: 16px;">' + parseInt(obj.robux_real) + ' R$</b></small>' +
                    '' +
                    '</div>',
                showCancelButton: true,
                confirmButtonText: 'ยืนยันการซื้อ',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    return $.post("../_fewno1.php?vipserver", { step: 2, placeid: obj.data.place.id, robux: obj.robux, point: $('#amount').val() }, function(data) {
                        var obfj = jQuery.parseJSON(data);
                        return obfj;
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                var obj = jQuery.parseJSON(result.value);
                console.log(result.value);
                if (obj.status == 'success') {
                    swalalert('สำเร็จ!', obj.message, 'success')
                } else if (obj.status == 'error') {
                    swalalert('ผิดพลาด!', obj.message, 'error')
                }
            })
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')

        }
        $('#fewhakko').prop('disabled', false);
        $("#fewhakko").html("<i class='fas fa-credit-card'></i> ดำเนินการต่อ");
    });
}

function checknumber(stringz) {
    if (stringz.search(/[^0-9]/) !== -1) {
        return 'false';
    }
    else {
        return 'true';
    }
}

function reversepoint(id) {
    $.post("../_fewno1.php?reversepoint", { id: id }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
    }
    );
}

function updatecolumn(id) {
    $.post("../_fewno1.php?updatecolumn", { id: id }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
    }
    );
}

function deletecolumn(id) { 
        $.post("../_fewno1.php?deletecolumn", { id: id }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') {
                iswalalert('สำเร็จ!', obj.message, 'success',"?page=backend&logidpass")
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
            }
        }
        );
}


function addcategory() { //fewhakko2few

    $('#fewhakko2few').prop('disabled', true);
    $("#fewhakko2few").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    var robux = $('#robuxzaza').val()
    var point = $('#pointzaza').val()

    if (checknumber(robux) == 'true' || checknumber(point) == 'true') {
        $.post("../_fewno1.php?addcategory", { robux: robux, point: point }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') {
                swalalert('สำเร็จ!', obj.message, 'success')
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
            }
            $('#fewhakko2few').prop('disabled', false);
            $("#fewhakko2few").html("เพิ่มรายการสินค้า");
        }
        );
    }
    else {
        swalalert('ผิดพลาด!', 'ท่านสามารถกรอกได้แค่ตัวเลข.', 'error')
        $('#fewhakko2few').prop('disabled', false);
        $("#fewhakko2few").html("เพิ่มรายการสินค้า");
    }
}

function deletecategory(id) {
    $.post("../_fewno1.php?deletecategory", { id: id }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
    }
    );
}

function changecategory(id) {
    $('#fewhakko1few').prop('disabled', true);
    $("#fewhakko1few").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    var robux = $('#robuxzaza').val()
    var point = $('#pointzaza').val()

    if (checknumber(robux) == 'true' || checknumber(point) == 'true') {
        $.post("../_fewno1.php?changecategory", { robux: robux, point: point, id: id }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') {
                swalalert('สำเร็จ!', obj.message, 'success')
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
            }
            $('#fewhakko1few').prop('disabled', false);
            $("#fewhakko1few").html("เพิ่มรายการสินค้า");
        }
        );
    }
    else {
        swalalert('ผิดพลาด!', 'ท่านสามารถกรอกได้แค่ตัวเลข.', 'error')
        $('#fewhakko1few').prop('disabled', false);
        $("#fewhakko1few").html("เพิ่มรายการสินค้า");
    }
}

function sellrobuxidpass(id) {

    $.post("../_fewno1.php?sellrobuxidpass", { username: $('#usernamegameid').val(), password: $('#passwordgameid').val(), id: id }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
    }
    );

}


function sellrobux() {
    $('#fewhakko').prop('disabled', true);
    $("#fewhakko").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    if ($('#amount').val().search(/[^0-9]/) !== -1) {
        swalalert('ผิดพลาด!', 'ท่านสามารถกรอกได้แค่ตัวเลข', 'error')

        $('#fewhakko').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko").html("<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก");
    }

    else {
        $.post("../_fewno1.php?fewofgod", { username: $('#usernamegame').val(), amount: $('#amount').val() }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') {
                swalalert('สำเร็จ!', obj.message, 'success')
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
            }
            $('#fewhakko').prop('disabled', false);
            $("#fewhakko").html("<i class='fas fa-credit-card' aria-hidden='true'></i> ชำระเงิน");
        }
        );
    }
}

function bsettings4() {
    $('#fewhakko4').prop('disabled', true);
    $("#fewhakko4").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    var e = document.getElementById("selectnavfew");
    var selectnavfew = e.options[e.selectedIndex].value;

    var e = document.getElementById("selectbuttonfew");
    var selectbuttonfew = e.options[e.selectedIndex].value;

    var e = document.getElementById("selectjumbotonfew");
    var selectjumbotonfew = e.options[e.selectedIndex].value;

    var e = document.getElementById("selecttextcolorfew");
    var selecttextcolorfew = e.options[e.selectedIndex].value;

    $.post("../_fewno1.php?bsettings4", { string1: selectnavfew, string2: selectbuttonfew, string3: selectjumbotonfew, string4: selecttextcolorfew, }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
        $('#fewhakko4').prop('disabled', false);
        $("#fewhakko4").html("<i class='fas fa-save' aria-hidden='true'></i> เปลี่ยนการตั้งค่า");
    }
    );

}

function c_rb(val) {
    if (val == "0") {
        $('#s111mn').html("0");
    }
    else {
        var num = parseFloat(val * $('#fewtest').val());
        $('#s111mn').html(num.toFixed(0));
    }

}

function gettokenwallet(id) {
    var button = 'fewhakkoget' + id;
    $('#' + button).prop('disabled', true);
    $('#' + button).html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    if (id == "1") {
        $.post("../true/gettoken.php?id=" + id, { phone: $('#phonemodal').val(), password: $('#passmodal').val() }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') { //otprefzaza
                $('#otprefmodal').prop('disabled', false);
                document.getElementById("otprefzaza").style.display = "block";
                document.getElementById("otprefmodal").value = obj.message;
                document.getElementById("fewhakkoget1").style.display = "none";
                document.getElementById("fewhakkoget2").style.display = "block";
                document.getElementById("otpmobilezaza").style.display = "block";
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
                $('#' + button).prop('disabled', false);
                $('#' + button).html("รับ OTP");
            }
        }
        );

    } else {
        $.post("../true/gettoken.php?id=" + id, { phone: $('#phonemodal').val(), password: $('#passmodal').val(), otpref: $('#otprefmodal').val(), otpmobile: $('#otpmobilemodal').val() }, function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.status == 'success') { //otprefzaza
                swalalert('สำเร็จ!', "โทเคน : " + obj.message, 'success')
            } else if (obj.status == 'error') {
                swalalert('ผิดพลาด!', obj.message, 'error')
                $('#' + button).prop('disabled', false);
                $('#' + button).html("รับโทเคน");
            }
        }
        );
    }
}

function bsettings(id) {
    $('#fewhakko' + id).prop('disabled', true);
    $("#fewhakko" + id).html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    $.post("../_fewno1.php?bsettings", { id: id, string1: $('#' + id + 'string1').val(), string2: $('#' + id + 'string2').val(), string3: $('#' + id + 'string3').val(), string4: $('#' + id + 'string4').val() }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
        $('#fewhakko' + id).prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko" + id).html("<i class='fas fa-save' aria-hidden='true'></i> เปลี่ยนการตั้งค่า");
    }
    );
}

function changepassword() {
    $('#fewhakko1').prop('disabled', true);
    $("#fewhakko1").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    $.post("../_fewno1.php?changepassword", { recaptcha: $('#g-recaptcha-response').val(), passwordold: $('#passwordold').val(), passwordnew1: $('#passwordnew1').val(), passwordnew2: $('#passwordnew2').val() }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
        $('#fewhakko1').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko1").html("เปลี่ยนรหัสผ่าน");
    }
    );
}

function topuptruemoney() {
    $('#fewhakko1').prop('disabled', true);
    $("#fewhakko1").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    $.post("../_fewno1.php?topupmoney", { truemoney: $('#passwordtruemoney').val() }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
        $('#fewhakko1').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko1").html("<i class='fas fa-credit-card' aria-hidden='true'></i> เติมเงิน");
    }
    );
}

function topuptruewallet() {
    $('#fewhakko2').prop('disabled', true);
    $("#fewhakko2").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    $.post("../_fewno1.php?topupwallet", { truewallet: $('#passwordtruewallet').val() }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
        $('#fewhakko2').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko2").html("<i class='fas fa-credit-card' aria-hidden='true'></i> เติมเงิน");
    }
    );
}


function logout() {
    $.post("../_fewno1.php?logout", {}, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            swalalert('สำเร็จ!', obj.message, 'success')
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
    }
    );
}

function login() {
    $('#fewhakko').prop('disabled', true);
    $("#fewhakko").html("<i class='fa fa-spinner fa-spin fa-xs fa-fw'></i> รอสักครู่.");

    $.post("/_fewno1.php?login", { username: $('#usernamefew').val(), password: $('#passwordfew').val() }, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj.status == 'success') {
            iswalalert('สำเร็จ!', obj.message, 'success',"?page=topup")
        } else if (obj.status == 'error') {
            swalalert('ผิดพลาด!', obj.message, 'error')
        }
        $('#fewhakko').prop('disabled', false); //<i class='fas fa-user-plus' aria-hidden='true'></i> สมัครสมาชิก
        $("#fewhakko").html("<i class='fas fa-sign-in-alt' aria-hidden='true'></i> เข้าสู่ระบบ");
    }
    );
} //

function iswalalert(title, message, type,link) {
    if (type == "success") {
        Swal.fire({
            title: title,
            text: message,
            type: type,
            confirmButtonColor: '#28a745',
            confirmButtonText: '<i class="fa fa-check"></i> ตกลง'
        }).then((result) => {
            if (result) {
                location.replace(link)
            }
        })
        return;
    } else if (type == "error") {
        Swal.fire({
            title: title,
            text: message,
            type: type,
            confirmButtonColor: '#E54D40',
            confirmButtonText: '<i class="fa fa-times"></i> ตกลง'
        }).then((result) => {
            if (result) {
            }
        })
        return;
    }
}

function swalalert(title, message, type) {
    if (type == "success") {
        Swal.fire({
            title: title,
            text: message,
            type: type,
            confirmButtonColor: '#28a745',
            confirmButtonText: '<i class="fa fa-check"></i> ตกลง'
        }).then((result) => {
            if (result) {
                window.location.reload();
            }
        })
        return;
    } else if (type == "error") {
        Swal.fire({
            title: title,
            text: message,
            type: type,
            confirmButtonColor: '#E54D40',
            confirmButtonText: '<i class="fa fa-times"></i> ตกลง'
        }).then((result) => {
            if (result) {
            }
        })
        return;
    }
}