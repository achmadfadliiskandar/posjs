var namabarang = ['bakpia','brownies']
var hargabarang = [200000,400000]
var gambarbarang = [
    "https://www.langsungenak.com/wp-content/uploads/2018/05/bakpia-pathok-langsungenak.jpg",
    "https://asset.kompas.com/crops/gMHHspJ4PXBEK8mtm1XvhdYLyj0=/0x387:1280x1240/750x500/data/photo/2020/12/28/5fe95f40754e3.jpg",
]
var listproduk = document.getElementById('listproduk')
var listkeranjang = document.getElementById('listkeranjang')

var namabarang_keranjang = []
var hargabarang_keranjang = []

function showlistproduk() {
    listproduk.innerHTML =''

    for (let i = 0; i < namabarang.length; i++) {
        listproduk.innerHTML +='<div class="card float-left  mr-3 mb-3" style="width: 15rem;">'+
        '<img src="'+gambarbarang[i]+'" class="card-img-top" alt="bakpia">'+
        '<div class="card-body">'+
        '<h5 class="card-title">'+namabarang[i]+'</h5>'+
        '<p class="card-text">Rp. '+hargabarang[i]+'</p>'+
        '<a href="#" class="btn btn-primary" onclick="addlistitem('+i+')">Beli</a>'+
        '</div>'+
    '</div>'  
    }
}
function addlistitem(id) {
namabarang_keranjang.push(namabarang[id])
hargabarang_keranjang.push(hargabarang[id])

showlistkeranjang()
// console.log(namabarang_keranjang)
}

var listkeranjang = document.getElementById('listkeranjang')
var tampilandiscount = document.getElementById('discount')
var tampilanpajak = document.getElementById('pajak')
var tampilantotalbayar = document.getElementById('totalbayar')
function showlistkeranjang() {
    listkeranjang.innerHTML =''

    var discount = 0
    var pajak = 0
    var hargatotal = 0
    var totalbayar = 0
    for (let i = 0; i < namabarang_keranjang.length; i++) {
        listkeranjang.innerHTML += '<div class="card mb-3 mt-3" style="width: 16rem;">'+
            '<div class="card-body">'+
            '<h5 class="card-title">'+namabarang_keranjang[i]+'</h5>'+
            '<p class="card-text">Rp '+hargabarang_keranjang[i]+'</p>'+
            '<p>Qty : 1</p>'+
            '<a href="#" class="btn btn-danger float-right" onclick="deleteitem('+i+')">Hapus</a>'+
            '</div>'+
            '</div>'

            hargatotal = hargabarang_keranjang[i]+hargatotal
            
            if(totalbayar > 600000){
                discount = totalbayar*0.05
            }
            else{
                discount = 0
            }
            totalbayar = hargatotal-discount

            pajak = totalbayar*0.01
            var totalbelanja = totalbayar - pajak
            tampilanpajak.innerHTML = pajak
            tampilandiscount.innerHTML = discount
            tampilantotalbayar.innerHTML = totalbelanja
    }
}
function deleteitem(id) {
    namabarang_keranjang.splice(id,1)
    hargabarang_keranjang.splice(id,1)
    showlistkeranjang()
}
showlistproduk()