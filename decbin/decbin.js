/**
 * Created by Chunmeista on 2/11/2016.
 */

$(".ip_seg").keypress(function (event) {
    $(this).css("background-color", "white");

    if (event.keyCode == 13) {
        $("#to_binary").click();
    } else {
        return event.charCode >= 48 && event.charCode <= 57;
    }
});

$(".bin_seg").keypress(function (event) {
    if (event.keyCode == 13) {
        $("#to_decimal").click();
    } else {
        return event.charCode == 48 || event.charCode == 49;
    }
});

clear_errors = function () {
    $("[name=ip_seg1]").css("background-color", "white");
    $("[name=ip_seg2]").css("background-color", "white");
    $("[name=ip_seg3]").css("background-color", "white");
    $("[name=ip_seg4]").css("background-color", "white");
}

clear_all = function () {
    clear_errors();

    $("[name=ip_seg1]").val("");
    $("[name=ip_seg2]").val("");
    $("[name=ip_seg3]").val("");
    $("[name=ip_seg4]").val("");
    $("[name=bin_seg1]").val("");
    $("[name=bin_seg2]").val("");
    $("[name=bin_seg3]").val("");
    $("[name=bin_seg4]").val("");
}

dec_to_bin = function (decimal) {
    var binary = "";
    var remainder = decimal;
    var modulus = 0;
    for (i = 0; i < 8; i++) {
        modulus = remainder % 2;
        remainder = Math.floor(remainder / 2);
        binary = modulus + binary;
    }

    //console.log("DEBUG: " + decimal + " = " + binary);
    return binary;
}

bin_to_dec = function (binary) {
    var total = 0;
    //var length = binary.length;
    var power = 0;

    for (i = binary.length - 1; i >= 0; i--) {
        total = total + (binary[i] * Math.pow(2, power));
        power++;
    }

    return total;
}

/**
 * ip_to_bin
 *
 * When "to Binary" is pressed, this is called.
 */
ip_to_bin = function () {
    var seg1 = $("[name=ip_seg1]").val();
    var seg2 = $("[name=ip_seg2]").val();
    var seg3 = $("[name=ip_seg3]").val();
    var seg4 = $("[name=ip_seg4]").val();

    var invalid_flag = false;

    if (seg1 == "") {
        seg1 = 0;
        $("[name=ip_seg1]").val("0");
    }
    if (seg2 == "") {
        seg2 = 0;
        $("[name=ip_seg2]").val("0");
    }
    if (seg3 == "") {
        seg3 = 0;
        $("[name=ip_seg3]").val("0");
    }
    if (seg4 == "") {
        seg4 = 0;
        $("[name=ip_seg4]").val("0");
    }

    if (seg1 < 0 || seg1 > 255) {
        $("[name=ip_seg1]").css("background-color", "#ff9495");
        invalid_flag = true;
    }
    if (seg2 < 0 || seg2 > 255) {
        $("[name=ip_seg2]").css("background-color", "#ff9495");
        invalid_flag = true;
    }
    if (seg3 < 0 || seg3 > 255) {
        $("[name=ip_seg3]").css("background-color", "#ff9495");
        invalid_flag = true;
    }
    if (seg4 < 0 || seg4 > 255) {
        $("[name=ip_seg4]").css("background-color", "#ff9495");
        invalid_flag = true;
    }

    //if ((seg1 == undefined || seg2 == undefined || seg3 == undefined || seg4 == undefined) || (seg1 == "" || seg2 == "" || seg3 == "" || seg4 == "")) {
    if ((invalid_flag == true) || (seg1 == undefined || seg2 == undefined || seg3 == undefined || seg4 == undefined)) {
        //console.log("DEBUG: One field is invalid!");
    } else {
        $("[name=bin_seg1]").val(dec_to_bin(seg1));
        $("[name=bin_seg2]").val(dec_to_bin(seg2));
        $("[name=bin_seg3]").val(dec_to_bin(seg3));
        $("[name=bin_seg4]").val(dec_to_bin(seg4));
    }
}

/**
 * bin_to_ip
 *
 * When "to iPv4 (Decimal)" is pressed, this is called.
 */
bin_to_ip = function () {
    var seg1 = $("[name=bin_seg1]").val();
    var seg2 = $("[name=bin_seg2]").val();
    var seg3 = $("[name=bin_seg3]").val();
    var seg4 = $("[name=bin_seg4]").val();

    if (seg1 == "") {
        seg1 = 0;
        $("[name=bin_seg1]").val("00000000");
    }
    if (seg2 == "") {
        seg2 = 0;
        $("[name=bin_seg2]").val("00000000");
    }
    if (seg3 == "") {
        seg3 = 0;
        $("[name=bin_seg3]").val("00000000");
    }
    if (seg4 == "") {
        seg4 = 0;
        $("[name=bin_seg4]").val("00000000");
    }

    //console.log("DEBUG: " + seg1 + "." + seg2 + "." + seg3 + "." + seg4);

    if ((seg1 == undefined || seg2 == undefined || seg3 == undefined || seg4 == undefined)) {
        //console.log("DEBUG: One field is invalid!");
    } else {
        clear_errors();

        $("[name=ip_seg1]").val(bin_to_dec(seg1));
        $("[name=ip_seg2]").val(bin_to_dec(seg2));
        $("[name=ip_seg3]").val(bin_to_dec(seg3));
        $("[name=ip_seg4]").val(bin_to_dec(seg4));
    }
}
