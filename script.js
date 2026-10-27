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
    const ngayNhap = document.getElementById('ngaySinh').value.trim();
    const thangNhap = document.getElementById('thangSinh').value.trim();
    const namNhap = document.getElementById('namSinh').value.trim();
    const ketQua = document.getElementById('ketQuaTraCuuCung');

    if (!ngayNhap || !thangNhap || !namNhap) {
        ketQua.innerHTML = "<p style='color:red;'>Vui lòng nhập đầy đủ Ngày, Tháng và Năm sinh!</p>";
        return;
    }

    const ngaySinh = Number(ngayNhap);
    const thangSinh = Number(thangNhap);
    const namSinh = Number(namNhap);
    if (!Number.isInteger(ngaySinh) || !Number.isInteger(thangSinh) || !Number.isInteger(namSinh)) {
        ketQua.innerHTML = "<p style='color:red;'>Ngày, tháng và năm sinh phải là số nguyên hợp lệ!</p>";
        return;
    }

    const namHienTai = new Date().getFullYear();
    const laNamNhuan = namSinh % 4 === 0 && (namSinh % 100 !== 0 || namSinh % 400 === 0);
    const soNgayTrongThang = [
        31, laNamNhuan ? 29 : 28, 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31
    ];

    if (namSinh < 1 || namSinh > namHienTai || thangSinh < 1 || thangSinh > 12 ||
        ngaySinh < 1 || ngaySinh > soNgayTrongThang[thangSinh - 1]) {
        ketQua.innerHTML = "<p style='color:red;'>Ngày sinh không hợp lệ. Vui lòng kiểm tra ngày, tháng và năm!</p>";
        return;
    }

    const mangCan = ["Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm"];
    const mangChi = ["Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất"];

    const thienCan = mangCan[(namSinh - 3) % 10];
    const diaChi = mangChi[(namSinh - 3) % 12];
    const canChi = `${thienCan} ${diaChi}`;
    const duongDanConGiap = {
        "Hợi": "images/con-giap/hoi.png",
        "Tý": "images/con-giap/ty.png",
        "Sửu": "images/con-giap/suu.png",
        "Dần": "images/con-giap/dan.png",
        "Mão": "images/con-giap/mao.png",
        "Thìn": "images/con-giap/thin.png",
        "Tỵ": "images/con-giap/ty-ran.png",
        "Ngọ": "images/con-giap/ngo.png",
        "Mùi": "images/con-giap/mui.png",
        "Thân": "images/con-giap/than.png",
        "Dậu": "images/con-giap/dau.png",
        "Tuất": "images/con-giap/tuat.png"
    };

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

    const duongDanCung = {
        "Bạch Dương (Aries)": "images/cung-hoang-dao/bach-duong.png",
        "Kim Ngưu (Taurus)": "images/cung-hoang-dao/kim-nguu.png",
        "Song Tử (Gemini)": "images/cung-hoang-dao/song-tu.png",
        "Cự Giải (Cancer)": "images/cung-hoang-dao/cu-giai.png",
        "Sư Tử (Leo)": "images/cung-hoang-dao/su-tu.png",
        "Xử Nữ (Virgo)": "images/cung-hoang-dao/xu-nu.png",
        "Thiên Bình (Libra)": "images/cung-hoang-dao/thien-binh.png",
        "Thiên Yết (Scorpio)": "images/cung-hoang-dao/thien-yet.png",
        "Nhân Mã (Sagittarius)": "images/cung-hoang-dao/nhan-ma.png",
        "Ma Kết (Capricorn)": "images/cung-hoang-dao/ma-ket.png",
        "Bảo Bình (Aquarius)": "images/cung-hoang-dao/bao-binh.png",
        "Song Ngư (Pisces)": "images/cung-hoang-dao/song-ngu.png"
    };

    ketQua.innerHTML = `
        <h4>Kết Quả Tra Cứu:</h4>
        <p><strong>Năm sinh Âm Lịch:</strong> ${canChi}</p>
        <p><strong>Cung Hoàng Đạo:</strong> ${cung}</p>
        <div class="hinhMinhHoa">
            <figure>
                <img src="${duongDanConGiap[diaChi]}" alt="Ảnh minh họa con giáp ${diaChi}">
                <figcaption>Con giáp ${diaChi}</figcaption>
            </figure>
            <figure>
                <img src="${duongDanCung[cung]}" alt="Ảnh minh họa cung ${cung}">
                <figcaption>${cung}</figcaption>
            </figure>
        </div>
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
    const chonTinh = document.getElementById('chonTinh');

    try {
        const phanHoi = await fetch('https://provinces.open-api.vn/api/v2/?depth=1');
        if (!phanHoi.ok) {
            throw new Error(`Không thể tải danh sách tỉnh (HTTP ${phanHoi.status}).`);
        }

        const danhSachTinh = await phanHoi.json();
        if (!Array.isArray(danhSachTinh)) {
            throw new Error('Dữ liệu tỉnh thành nhận được không hợp lệ.');
        }

        chonTinh.innerHTML = '<option value="">-- Chọn Tỉnh / Thành phố --</option>' + 
            danhSachTinh.map(tinh => `<option value="${tinh.code}">${tinh.name}</option>`).join('');
    } catch (loi) {
        chonTinh.innerHTML = '<option value="">Không tải được danh sách tỉnh</option>';
        document.getElementById('chonXa').innerHTML = '<option value="">Danh sách xã/phường hiện không khả dụng</option>';
        console.error("Lỗi khi tải tỉnh thành:", loi);
    }
}

async function taiDanhSachXa() {
    const maTinh = document.getElementById('chonTinh').value;
    const chonXa = document.getElementById('chonXa');
    chonXa.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>';
    chonXa.disabled = true;

    if (!maTinh) return;

    try {
        const phanHoi = await fetch(`https://provinces.open-api.vn/api/v2/p/${maTinh}?depth=2`);
        if (!phanHoi.ok) {
            throw new Error(`Không thể tải danh sách xã/phường (HTTP ${phanHoi.status}).`);
        }

        const duLieuTinh = await phanHoi.json();
        if (document.getElementById('chonTinh').value !== maTinh) return;
        if (!Array.isArray(duLieuTinh.wards)) {
            throw new Error('Dữ liệu xã/phường nhận được không hợp lệ.');
        }

        chonXa.innerHTML = '<option value="">-- Chọn Xã / Phường --</option>' +
            duLieuTinh.wards.map(xa => `<option value="${xa.code}">${xa.name}</option>`).join('');
        chonXa.disabled = false;
    } catch (loi) {
        if (document.getElementById('chonTinh').value === maTinh) {
            chonXa.innerHTML = '<option value="">Không tải được danh sách xã/phường</option>';
        }
        console.error("Lỗi khi tải xã phường:", loi);
    }
}

function chuanHoaTenThanhPho(tenThanhPho) {
    return tenThanhPho
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/gi, 'd')
        .toLocaleLowerCase('vi')
        .trim()
        .replace(/\s+/g, ' ');
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

    try {
        const tenThanhPhoKhongDau = chuanHoaTenThanhPho(tenThanhPhoNhap);
        const cacTenTimKiem = [...new Set([tenThanhPhoNhap, tenThanhPhoKhongDau])];
        let duLieu;

        for (const tenTimKiem of cacTenTimKiem) {
            const duongDanApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(tenTimKiem)}&units=metric&lang=vi&appid=${khoaApi}`;
            const phanHoi = await fetch(duongDanApi);

            if (phanHoi.ok) {
                duLieu = await phanHoi.json();
                break;
            }

            if (phanHoi.status !== 404) {
                throw new Error(`Không thể lấy dữ liệu thời tiết (HTTP ${phanHoi.status}).`);
            }
        }

        if (!duLieu) {
            throw new Error("Không tìm thấy thông tin cho thành phố này.");
        }

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