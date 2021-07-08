$("#tmpltable").hide();
function bayardisini() {
    $("#tmpltable").show();
}
var namabarang = ['Egg Sandwich', 'Pizza', 'Chesse','Ice Lemon', 'Jus Alpukat','Susu','Chicken','Noodle','Snacks']
var hargabarang = [35000, 45000, 40000, 15000, 10000, 7000, 5000, 5000 ,1000]
// console.log(hargabarang.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
var gambarbarang =  [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6nMvld2PrtAdalplaoQF_-GIY-PZEj_pm6Q&usqp=CAU",
"https://www.delonghi.com/Global/recipes/multifry/pizza_fresca.jpg","https://ds393qgzrxwzn.cloudfront.net/resize/m600x500/cat1/img/images/0/KyNCrYXkJr.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFuDsw0scvm-HX_XdH7ahmTEE2PZ0Roq8vg&usqp=CAU","https://static.republika.co.id/uploads/images/inpicture_slide/foto-buah_200909232847-752.jpg","https://frisianflag.com//storage/app/media/Apa-Artinya-Fortifikasi-Kalsium-pada-Susu.jpg","https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Farchive%2F0716e0ca369a57b31b821ea090891e90fce7123e","https://cdn-image.hipwee.com/wp-content/uploads/2020/07/hipwee-WhatsApp-Image-2020-07-17-at-20.05.59.jpeg","https://images.pojoksatu.id/2020/03/Snack-yang-Sebagian-Besar-Berisi-Angin-390x250.jpg"]
var listproduk = document.getElementById("listproduk");
var listkeranjang = document.getElementById("listkeranjang");

// var tampilnama = document.getElementById("nama");
var tampildiscount = document.getElementById("discount");
var tampilpajak = document.getElementById("pajak");
var tampiltotalbayar = document.getElementById("totalbayar");
var tampildata = document.getElementById("tampildata");
var idsemuabarang_keranjang = [];
var hitungnilai_id = {}

function showlistproduk() {
    listproduk.innerHTML = "";
    for (let i = 0; i < namabarang.length; i++) {
        listproduk.innerHTML +=
            '<div class="card float-left mr-3 mb-3 bg-light text-dark" style="width: 14rem;">' +
            '<img src="' + gambarbarang[i] + '"class="card-img-top" height="150ram" alt="...">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + namabarang[i] + "</h5>" +
            '<p class="card-text">Rp.' + hargabarang[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "</p>" +
            '<button class="btn btn-outline-primary" onclick="addlistitem(' + i +')">Beli</button>' +
            "</div>" +
            "</div>";
    }
}
showlistproduk();

function addlistitem(id) {
    idsemuabarang_keranjang.push(id);
    hitungQuantity();
}

function hitungQuantity() {
    var menghitung = {};
    idsemuabarang_keranjang.forEach(function (i) {
        menghitung[i] = (menghitung[i] || 0) + 1;
    });

    for (var key in menghitung) {
        hitungnilai_id[key] = menghitung[key];
        delete menghitung[key];
    }

    showlistkeranjang();
}

function showlistkeranjang() {
    listkeranjang.innerHTML = "";
    tampildata.innerHTML = "";
    var nama = 0;
    var discount = 0;
    var pajak = 0;
    var hargatotal = 0;
    var totalbayar = 0;
    var arrtotal = [];

    var filteridmultiply = idsemuabarang_keranjang.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
    for (let i = 0; i < filteridmultiply.length; i++) {
        var hargaakhir = Number(hitungnilai_id[filteridmultiply[i]]) * hargabarang[filteridmultiply[i]];
        arrtotal.push(hargaakhir)
        listkeranjang.innerHTML +=
            '<div class="card mt-3 mb-3 bg-light text-dark" style="width: 21,5rem;height: 12rem;">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + namabarang[filteridmultiply[i]] + "</h5>" +
            '<p class="card-text">Rp.' + hargabarang[filteridmultiply[i]].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "</p>" +
            "<p>Qty: "+hitungnilai_id[filteridmultiply[i]]+"</p>" +
            '<a href="#" style="list-style-type:none;text-decoration:none;font-size:45px;" class=" fa fa-trash text-dark float-right" Onclick="deleteitem(' +i +')"></a>' +
            "</div>" +
            "</div>";

        tampildata.innerHTML += "<tr>" +
            "<td>" + namabarang[filteridmultiply[i]] + "</td>" +
            "<td>" + hargabarang[filteridmultiply[i]].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "</td>" +
            "<td>" + hitungnilai_id[filteridmultiply[i]] + "</td>" + "</tr>";
    }
    hargatotal = arrtotal.reduce((a, b) => a + b, 0);;

    if (hargatotal > 25000 ) {
        discount = hargatotal * 0.05;
    } else {
        discount = 0;
    }
    totalbayar = hargatotal - discount;

    pajak = totalbayar * 0.1;

    var totalbelanja = totalbayar + pajak;
    tampilpajak.innerHTML = pajak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    tampildiscount.innerHTML = discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    tampiltotalbayar.innerHTML = totalbayar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // tampilnama.innerHTML = namabarang_keranjang;
}

function deleteitem(id) {
    idsemuabarang_keranjang.splice(id, 1);
    hitungQuantity();
}
