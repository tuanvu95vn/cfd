// https://www.cfdtraining.vn/api/danh-sach-khoa-hoc
// https://www.cfdtraining.vn/api/contact: POST - name, phone, email, title, content
// https://www.cfdtraining.vn/api/cap-nhat-thong-tin-ca-nhan: POST - name, phone, email, facebook
// https://www.cfdtraining.vn/api/dang-ky-khoa-hoc : POST - name, phone, email, facebook
// https://www.cfdtraining.vn/api/dang-nhap : POST - username, password
// https://www.cfdtraining.vn/api/hoc-vien-khoa-hoc: GET


function api(url) {
    return {
        get: () => {
            return fetch(url).then((res) => res.json());
        },
        post: (args) => {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                ...args,
            }).then((res) => res.json());
        },
    };
}
async function postContact() {
    let name = "Tuan";
    let phone = "0987654321";
    let email = "abc@gmail.com";
    let title = "asdfsdf";
    let content = "asdfsadf";
    let res = await api("https://www.cfdtraining.vn/api/contact").post({
        body: JSON.stringify({
            name,
            phone,
            email,
            title,
            content,
        }),
    });
    console.log(res);
}

function getListCourse() {
    return api("https://www.cfdtraining.vn/api/danh-sach-khoa-hoc").get();

}

let $onlineList = document.querySelector('.homepage .online .online__list');
let $offlineList = document.querySelector('.homepage .offline .offline__list');

async function renderOnlineList(){
    let html =''
    let list = await getListCourse();
    let onlinelList = list.filter(e =>( e.course_type == 'online'));
    console.log(onlinelList);
    onlinelList.map((course) => {
        console.log(JSON.parse(course.thubnail).link)
        html += `<div class="online__list-item">
        <div class="img"><img src="https://www.cfdtraining.vn/${JSON.parse(course.thubnail).link}" alt=""></div>
        <div class="text">
            <h3 class="title">${course.title}</h3>
            <p class="des">${course.short_description}</p>
        </div>
        <div class="btn">
            <div class="trainer">
                <div class="img-trainer">
                    <img src="img/avt.jpg" alt="">
                </div>
                <span class="name">Trần Nghĩa</span>
            </div>
            <a href="register-course.html" class="btn-register"><span>Đăng ký</span></a>
        </div>
    </div>`
    })
    $onlineList.innerHTML = html
}

async function renderofflineList(){
    let html =''
    let list = await getListCourse();
    let offlinelList = list.filter(e =>( e.course_type == 'offline'));
    console.log(offlinelList);
    offlinelList.map((course) => {
        console.log(JSON.parse(course.thubnail).link)
        html += `<div class="offline__list-item">
        <div class="img"><img src="https://www.cfdtraining.vn/${JSON.parse(course.thubnail).link}" alt=""></div>
        <div class="text">
            <h3 class="title">${course.title}</h3>
            <p class="des">${course.short_description}</p>
        </div>
        <div class="btn">
            <div class="trainer">
                <div class="img-trainer">
                    <img src="img/avt.jpg" alt="">
                </div>
                <span class="name">Trần Nghĩa</span>
            </div>
            <a href="register-course.html" class="btn-register"><span>Đăng ký</span></a>
        </div>
    </div>`
    })
    $offlineList.innerHTML = html
}


renderOnlineList();
renderofflineList();