const newsTranslations = {

vi: {
1: {
title: "Hướng dẫn sử dụng cân điện tử EXCELL X4252 KW",

summary:
"Video hướng dẫn sử dụng cân điện tử EXCELL X4252 KW.",

content: `
<p>
Video hướng dẫn chi tiết cách sử dụng cân điện tử EXCELL X4252 KW,
bao gồm các thao tác khởi động, sử dụng các chức năng trên bàn phím,
cài đặt các thông số cơ bản và quy trình vận hành đúng cách.
</p>

<p>
Nội dung phù hợp cho người mới sử dụng cũng như kỹ thuật viên cần
tham khảo quy trình sử dụng để đảm bảo độ chính xác và nâng cao
hiệu quả làm việc của thiết bị.
</p>
`
},

2: {
title: "Lắp đặt hệ thống cân ô tô cho khách hàng tại Bắc Ninh",

summary:
"Hoàn thành bàn giao cân ô tô cho khách hàng tại Bắc Ninh.",

content: `
<p>
Dự án lắp đặt cân điện tử công nghiệp
đã được hoàn thành đúng tiến độ.
</p>



<p>
Hệ thống hoạt động ổn định,
đáp ứng đầy đủ yêu cầu sản xuất.
</p>
`
},

3: {
title: "Cách lựa chọn cân điện tử phù hợp cho doanh nghiệp",

summary:
"Một số tiêu chí quan trọng giúp doanh nghiệp lựa chọn cân điện tử phù hợp.",

content: `
<p>
Khi lựa chọn cân điện tử,
cần xác định rõ tải trọng,
môi trường làm việc và độ chính xác yêu cầu.
</p>

<p>
Ngoài ra cần quan tâm tới thương hiệu,
chế độ bảo hành và dịch vụ kỹ thuật.
</p>


`
},

4: {
title: "Xu hướng ứng dụng cân điện tử trong sản xuất hiện đại",

summary:
"Cân điện tử đang ngày càng được ứng dụng rộng rãi trong tự động hóa sản xuất.",

content: `
<p>
Nhiều doanh nghiệp đang áp dụng
cân điện tử kết hợp phần mềm quản lý
nhằm nâng cao hiệu quả vận hành.
</p>


`
}

},

/* =========================
   ENGLISH
========================= */

en: {

1: {
title: "User Guide for the EXCELL X4252 KW Electronic Scale",

summary:
"Video guide for operating the EXCELL X4252 KW electronic scale.",

content: `
<p>
This video provides a step-by-step guide on how to use the
EXCELL X4252 KW electronic scale, including power-on procedures,
keypad functions, basic parameter settings, and proper operating practices.
</p>

<p>
It is suitable for new users as well as technicians who need
a quick reference for correct operation to ensure accurate weighing
performance and extend the service life of the equipment.
</p>
`
},

2: {
title: "Truck Scale Installation Project Completed in Bac Ninh",

summary:
"Successfully completed delivery and installation of a truck scale system in Bac Ninh.",

content: `
<p>
The industrial weighing system installation project
was completed on schedule.
</p>



<p>
The system operates stably
and fully meets production requirements.
</p>
`
},

3: {
title: "How To Choose The Right Electronic Scale For Your Business",

summary:
"Important criteria to help businesses choose the most suitable electronic scale.",

content: `
<p>
When selecting an electronic scale,
you should determine the required capacity,
working environment and accuracy level.
</p>

<p>
Brand reputation,
warranty policy and technical support
should also be considered.
</p>


`
},

4: {
title: "Trends In Using Electronic Scales In Modern Manufacturing",

summary:
"Electronic scales are increasingly used in automated production systems.",

content: `
<p>
Many enterprises are integrating
electronic scales with management software
to improve operational efficiency.
</p>

`
}

},

/* =========================
   CHINESE
========================= */

zh: {

1: {
title: "EXCELL X4252 KW 电子秤使用指南",

summary:
"EXCELL X4252 KW 电子秤操作视频教程。",

content: `
<p>
本视频详细介绍 EXCELL X4252 KW 电子秤的使用方法，
包括开机、按键操作、基本参数设置以及正确的使用流程。
</p>

<p>
适合首次使用者及技术人员参考，
帮助确保称重准确性并提高设备使用效率。
</p>
`
},
2: {
title: "为北宁客户安装汽车衡系统",

summary:
"成功完成北宁客户汽车衡项目交付。",

content: `
<p>
工业称重系统安装项目
已按计划顺利完成。
</p>


<p>
系统运行稳定，
完全满足生产需求。
</p>
`
},

3: {
title: "企业如何选择合适的电子秤",

summary:
"帮助企业选择电子秤的重要参考标准。",

content: `
<p>
选择电子秤时，
应明确称重范围、
工作环境以及精度要求。
</p>

<p>
同时还应考虑品牌、
保修政策以及技术服务。
</p>


`
},

4: {
title: "现代生产中电子秤的应用趋势",

summary:
"电子秤正在越来越广泛地应用于自动化生产。",

content: `
<p>
越来越多的企业正在将
电子秤与管理软件结合使用，
以提升运营效率。
</p>


`
}

}

};

/* =========================
   GET TRANSLATED NEWS
========================= */

function getTranslatedNews(news){

    const lang =
        localStorage.getItem("language") || "vi";

    const trans =
        newsTranslations?.[lang]?.[news.id];

    if(!trans){
        return news;
    }

    return {
        ...news,
        title: trans.title,
        summary: trans.summary,
        content: trans.content
    };
}