import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <img
        src="https://brand-pcms.ggg.systems/media/so/homecmsdata/banners/TGS_news_Feature.png"
        alt=""
      />
      <img
        className="max-w-5xl mx-auto mt-4"
        src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2025/01/Website-banner.jpg"
        alt=""
      />
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8">
        <div className="space-y-8 mt-4">
          <p className="text-2xl font-semibold">Lẩu Đài Loan</p>
          <p className="text-muted-foreground">
            Sau hàng trăm năm tồn tại trong cuộc sống người Đài, lẩu Đài Loan
            không chỉ đơn thuần là sự kết hợp của các nguyên liệu quen thuộc, mà
            liên tục được cải tiến và hoàn thiện, từ thế hệ này sang thế hệ
            khác. Thực khách đến Manwah sẽ được tự mình khám phá hành trình ẩm
            thực đặc sắc với nước lẩu ngọt vị tự nhiên, kết hợp hầm cùng các
            loại gia vị dậy mùi thơm đặc trưng của Đài Loan. Nét đặc sắc không
            chỉ đến từ nước lẩu, mà còn đến từ cả những món nhúng kiểu Đài – bạn
            sẽ tìm thấy nhiều hơn là chỉ thịt bò và các loại rau thơm. Chính sự
            kết hợp các nguyên liệu, món ăn hài hoà sẽ tạo nên hương vị lẩu Đài
            Loan tỉ mỉ và tinh tế.
          </p>
          <Button>
            Xem thực đơn <ArrowRight />
          </Button>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <img
            className="img-full"
            title="lau-manwah-dai-loan-1"
            src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/06/manwah-lau-dai-loan-home-1-scaled.jpeg"
            alt="lẩu đài loan manwah homepage 1"
          />
          <img
            className="img-full"
            title="lau-manwah-dai-loan-2"
            src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/06/manwah-lau-dai-loan-home-2-scaled.jpeg"
            alt="lẩu đài loan manwah homepage 2"
          ></img>
        </div>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8">
        <div className="space-y-8 mt-4">
          <p className="text-2xl font-semibold">
            Hành trình vạn dặm – Manwah đến Lê Thái Tổ
          </p>
          <p className="text-muted-foreground">
            Đặt phép tương phản trong mọi yếu tố thiết kế - từ màu sắc tới họa
            tiết hay ánh sáng... Manwah Lê Thái Tổ mang đậm âm hưởng Đài Loan
            truyền thống nhưng cũng thật phóng khoáng, vừa trang nhã lại không
            kém phần mỹ lệ, thân thuộc và cũng đầy khác biệt.
          </p>
          <Button>
            Đặt bàn ngay <ArrowRight />
          </Button>
        </div>

        <div className="w-full grid grid-cols-1">
          <img
            className="img-full"
            title="lau-manwah-dai-loan-1"
            src="https://cmsbrandwebsites.ggg.com.vn/wp-content/uploads/2022/10/manwah-hanh-trinh-van-dam-hn.jpg"
            alt="lẩu đài loan manwah homepage 1"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
