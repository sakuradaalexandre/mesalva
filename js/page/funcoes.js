formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

viewDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

foneFill = (telefone) => {
    let i = telefone.length;
    let str = telefone;
    let str2 = [];

    str2[0] = '(';
    str2[1] = str[0];
    str2[2] = str[1];
    str2[3] = ')';
    str2[4] = ' ';
    str2[5] = str[2];
    str2[6] = str[3];
    str2[7] = str[4];
    str2[8] = str[5];
    if (i == 11) {
        str2[9] = str[6];
        str2[10] = '-';
        str2[11] = str[7];
        str2[12] = str[8];
        str2[13] = str[9];
        str2[14] = str[10];
    } else {
        str2[9] = '-';
        str2[10] = str[6];
        str2[11] = str[7];
        str2[12] = str[8];
        str2[13] = str[9];
    }
    let str1 = str2.join(',');
    let str3 = str1.replaceAll(',', '');

    return str3;

}

foneMask = (input) => {
    input.addEventListener("input", function () {
        var i = input.value.length;
        var str = input.value
        if (isNaN(Number(str.charAt(i - 1)))) {
            input.value = str.substr(0, i - 1)
        }
    });

    input.addEventListener('keydown', function (event) {
        if (event.keyCode != 46 && event.keyCode != 8) {
            var i = input.value.length;
            if (i === 0) {
                input.value = input.value + "(";
            } else if (i === 3) {
                input.value = input.value + ") ";
                if (event.keyCode == 57) {
                    input.maxLength = 15;
                } else {
                    input.maxLength = 14;
                }
            }

            if (input.maxLength == 15 && i == 10) {
                input.value = input.value + "-";
            } else if (input.maxLength === 14 && i === 9) {
                input.value = input.value + "-";
            }
        }
    });
}

cpfMask = (input) => {
    input.addEventListener("input", function() {
        var i = input.value.length;
        var str = input.value
        if (isNaN(Number(str.charAt(i-1)))) {
          input.value = str.substr(0, i-1)
        }
    });
    
    input.addEventListener('keydown', function(event) { 
      if(event.keyCode != 46 && event.keyCode != 8) {
        var i = input.value.length;
        if (i === 3 || i === 7)
          input.value = input.value + ".";
        else if (i === 11) 
          input.value = input.value + "-";
        }
  });
}