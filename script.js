function moTab(suKien, tenTab) {
    let chiSo, noiDungCacTab, cacNutTab;

    noiDungCacTab = document.getElementsByClassName("noiDungTab");
    for (chiSo = 0; chiSo < noiDungCacTab.length; chiSo++) {
        noiDungCacTab[chiSo].classList.remove("dangHoatDong");
    }

    cacNutTab = document.getElementsByClassName("nutTab");
    for (chiSo = 0; chiSo < cacNutTab.length; chiSo++) {
        cacNutTab[chiSo].classList.remove("dangHoatDong");
    }

    document.getElementById(tenTab).classList.add("dangHoatDong");
    suKien.currentTarget.classList.add("dangHoatDong");
}


// bai tap 1: ung dung cung hoang doa
function traCuuCungHoangDao() {
    const ngaySinh = parseInt(document.getElementById('ngaySinh').value);
    const thangSinh = parseInt(document.getElementById('thangSinh').value);
    const namSinh = parseInt(document.getElementById('namSinh').value);
    const ketQua = document.getElementById('ketQuaTraCuuCung');

    if (!ngaySinh || !thangSinh || !namSinh) {
        ketQua.innerHTML = "<p style='color:red;'>Vui lòng nhập đầy đủ Ngày, Tháng và Năm sinh!</p>";
        return;
    }

    const mangCan = ["Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm"];
    const mangChi = ["Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất"];

    const thienCan = mangCan[(namSinh - 3) % 10];
    const diaChi = mangChi[(namSinh - 3) % 12];
    const canChi = `${thienCan} ${diaChi}`;

    let cung = "";
    const ngayThang = thangSinh * 100 + ngaySinh;

    if (ngayThang >= 321 && ngayThang <= 419) cung = "Bạch Dương (Aries)";
    else if (ngayThang >= 420 && ngayThang <= 520) cung = "Kim Ngưu (Taurus)";
    else if (ngayThang >= 521 && ngayThang <= 620) cung = "Song Tử (Gemini)";
    else if (ngayThang >= 621 && ngayThang <= 722) cung = "Cự Giải (Cancer)";
    else if (ngayThang >= 723 && ngayThang <= 822) cung = "Sư Tử (Leo)";
    else if (ngayThang >= 823 && ngayThang <= 922) cung = "Xử Nữ (Virgo)";
    else if (ngayThang >= 923 && ngayThang <= 1022) cung = "Thiên Bình (Libra)";
    else if (ngayThang >= 1023 && ngayThang <= 1121) cung = "Thiên Yết (Scorpio)";
    else if (ngayThang >= 1122 && ngayThang <= 1221) cung = "Nhân Mã (Sagittarius)";
    else if ((ngayThang >= 1222 && ngayThang <= 1231) || (ngayThang >= 101 && ngayThang <= 119)) cung = "Ma Kết (Capricorn)";
    else if (ngayThang >= 120 && ngayThang <= 218) cung = "Bảo Bình (Aquarius)";
    else cung = "Song Ngư (Pisces)";

    ketQua.innerHTML = `
        <h4>Kết Quả Tra Cứu:</h4>
        <p><strong>Năm sinh Âm Lịch:</strong> ${canChi}</p>
        <p><strong>Cung Hoàng Đạo:</strong> ${cung}</p>
    `;
}

// bai tap 2: danh ba nguoi dung ngay nhien
async function taiDanhBa() {
    const luoiNguoiDung = document.getElementById('luoiNguoiDung');
    luoiNguoiDung.innerHTML = "<p>Đang tải dữ liệu người dùng...</p>";

    try {
        const phanHoi = await fetch('https://randomuser.me/api/?results=10');
        const duLieu = await phanHoi.json();
        const danhSachNguoiDung = duLieu.results;

        luoiNguoiDung.innerHTML = danhSachNguoiDung.map(nguoiDung => `
            <div class="theNguoiDung">
                <img src="${nguoiDung.picture.medium}" alt="Avatar">
                <h4>${nguoiDung.name.first} ${nguoiDung.name.last}</h4>
                <p style="font-size: 0.85rem; color: #666;">${nguoiDung.email}</p>
                <p><strong>${nguoiDung.location.country}</strong></p>
            </div>
        `).join('');
    } catch (loi) {
        luoiNguoiDung.innerHTML = `<p style="color:red;">Lỗi tải dữ liệu: ${loi.message}</p>`;
    }
}

// bai tap 3: mo phong ung dung dang ky cu tru cho cong dan
document.addEventListener('DOMContentLoaded', () => {
    taiDanhSachTinh();
    taiDanhBa(); 
});

async function taiDanhSachTinh() {
    try {
        const phanHoi = await fetch('https://provinces.open-api.vn/api/?depth=1');
        const danhSachTinh = await phanHoi.json();
        
        const chonTinh = document.getElementById('chonTinh');
        chonTinh.innerHTML = '<option value="">-- Chọn Tỉnh / Thành phố --</option>' + 
            danhSachTinh.map(tinh => `<option value="${tinh.code}">${tinh.name}</option>`).join('');
    } catch (loi) {
        console.error("Lỗi khi tải tỉnh thành:", loi);
    }
}

async function taiDanhSachHuyen() {
    const maTinh = document.getElementById('chonTinh').value;
    const chonHuyen = document.getElementById('chonHuyen');
    const chonXa = document.getElementById('chonXa');
    
    chonHuyen.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>';
    chonXa.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';

    if (!maTinh) return;

    try {
        const phanHoi = await fetch(`https://provinces.open-api.vn/api/p/${maTinh}?depth=2`);
        const duLieuTinh = await phanHoi.json();
        
        chonHuyen.innerHTML = '<option value="">-- Chọn Quận / Huyện --</option>' + 
            duLieuTinh.districts.map(huyen => `<option value="${huyen.code}">${huyen.name}</option>`).join('');
    } catch (loi) {
        console.error("Lỗi khi tải quận huyện:", loi);
    }
}

async function taiDanhSachXa() {
    const maHuyen = document.getElementById('chonHuyen').value;
    const chonXa = document.getElementById('chonXa');
    chonXa.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';

    if (!maHuyen) return;

    try {
        const phanHoi = await fetch(`https://provinces.open-api.vn/api/d/${maHuyen}?depth=2`);
        const duLieuHuyen = await phanHoi.json();
        
        chonXa.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>' + 
            duLieuHuyen.wards.map(xa => `<option value="${xa.code}">${xa.name}</option>`).join('');
    } catch (loi) {
        console.error("Lỗi khi tải xã phường:", loi);
    }
}

// bai tap 4: ung dung thoi tiet thu nho
async function xemThoiTiet() {
    const tenThanhPhoNhap = document.getElementById('tenThanhPho').value.trim();
    const ketQua = document.getElementById('ketQuaThoiTiet');

    if (!tenThanhPhoNhap) {
        ketQua.innerHTML = "<p style='color:red;'>Vui lòng nhập tên thành phố!</p>";
        return;
    }

    ketQua.innerHTML = "<p>Đang tìm kiếm dữ liệu thời tiết...</p>";

    const khoaApi = "bd5e378503939ddaee76f12ad7a97608"; 
    const duongDanApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(tenThanhPhoNhap)}&units=metric&lang=vi&appid=${khoaApi}`;

    try {
        const phanHoi = await fetch(duongDanApi);
        
        if (!phanHoi.ok) {
            throw new Error("Không tìm thấy thông tin cho thành phố này!");
        }

        const duLieu = await phanHoi.json();

        ketQua.innerHTML = `
            <h4>Thời tiết tại ${duLieu.name}, ${duLieu.sys.country}</h4>
            <p><strong>Nhiệt độ:</strong> ${duLieu.main.temp} °C</p>
            <p><strong>Cảm giác như:</strong> ${duLieu.main.feels_like} °C</p>
            <p><strong>Độ ẩm:</strong> ${duLieu.main.humidity}%</p>
            <p><strong>Mô tả:</strong> ${duLieu.weather[0].description}</p>
        `;
    } catch (loi) {
        ketQua.innerHTML = `<p style="color:red;">Lỗi: ${loi.message}</p>`;
    }
}