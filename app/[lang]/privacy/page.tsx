import type { Metadata } from "next";
import "./privacy.css";
import { t } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Privacy Policy — ZAND",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isFa = lang === "fa";
  const tx = isFa ? t.fa : t.en;

  if (isFa) {
    return (
      <div className="legal-page" dir="rtl">
        <h1>{tx.privacyTitle}</h1>
        <p className="legal-updated">{tx.lastUpdated}</p>

        <p>
          زند («ما») اپلیکیشن موبایل زند و وب‌سایت zandapplication.com را اداره می‌کند.
          این سیاست حریم خصوصی توضیح می‌دهد چه اطلاعاتی جمع‌آوری می‌کنیم، چگونه از آن
          استفاده می‌کنیم و حق انتخاب شما چیست.
        </p>

        <h2>اطلاعاتی که جمع‌آوری می‌کنیم</h2>
        <p>هنگام ساخت حساب کاربری، این موارد را جمع‌آوری می‌کنیم:</p>
        <ul>
          <li>نام شما</li>
          <li>آدرس ایمیل شما</li>
          <li>شمارهٔ تلفن شما (در صورت ارائه)</li>
        </ul>

        <p>هنگام استفاده از اپلیکیشن، این موارد را جمع‌آوری می‌کنیم:</p>
        <ul>
          <li>فعالیت شما در اپلیکیشن (درس‌های تکمیل‌شده، مقالات مشاهده‌شده، کسب‌وکارهای ذخیره‌شده)</li>
          <li>موقعیت مکانی شما، فقط در صورتی که خودتان انتخاب کنید (برای نمایش کسب‌وکارهای نزدیک)</li>
          <li>اطلاعات دستگاه و تحلیل استفاده برای بهبود تجربه</li>
        </ul>

        <p>اگر یک کسب‌وکار ثبت کنید، این موارد را جمع‌آوری می‌کنیم:</p>
        <ul>
          <li>نام، توضیحات، دسته‌بندی و اطلاعات تماس کسب‌وکار</li>
          <li>آدرس و مختصات مکانی کسب‌وکار</li>
          <li>عکس‌هایی که آپلود می‌کنید</li>
          <li>این اطلاعات در اپلیکیشن و وب‌سایت منتشر می‌شود تا کاربران بتوانند کسب‌وکار شما را پیدا کنند</li>
        </ul>

        <h2>نحوهٔ استفاده از اطلاعات شما</h2>
        <p>از اطلاعات جمع‌آوری‌شده برای این موارد استفاده می‌کنیم:</p>
        <ul>
          <li>ارائه و نگهداری اپلیکیشن و وب‌سایت زند</li>
          <li>شخصی‌سازی تجربهٔ یادگیری و پیگیری پیشرفت شما</li>
          <li>نمایش کسب‌وکارهای مرتبط نزدیک شما (در صورت فعال بودن)</li>
          <li>ارسال اعلان‌ها دربارهٔ حساب یا پیشرفت یادگیری شما (در صورت فعال بودن)</li>
          <li>بهبود و توسعهٔ ویژگی‌های جدید</li>
        </ul>

        <h2>اشتراک‌گذاری اطلاعات</h2>
        <p>
          ما اطلاعات شخصی شما را نمی‌فروشیم. ممکن است اطلاعات را با ارائه‌دهندگان
          خدماتی که به ما در اداره اپلیکیشن کمک می‌کنند (مانند هاستینگ و تحلیل) به
          اشتراک بگذاریم، و در صورت الزام قانونی اطلاعات را به اشتراک خواهیم گذاشت.
        </p>

        <h2>ذخیره‌سازی داده‌ها</h2>
        <p>
          داده‌های شما به صورت امن با استفاده از Supabase ذخیره می‌شود، با سرورهایی
          در اتحادیهٔ اروپا. اطلاعات شما را تا زمانی که حسابتان فعال باشد یا برای ارائهٔ
          خدمات نیاز باشد نگه می‌داریم.
        </p>

        <h2>حقوق شما</h2>
        <p>شما می‌توانید:</p>
        <ul>
          <li>اطلاعات حسابتان را در هر زمان از طریق اپلیکیشن مشاهده، به‌روزرسانی یا حذف کنید</li>
          <li>اشتراک‌گذاری موقعیت مکانی را در تنظیمات دستگاه غیرفعال کنید</li>
          <li>با تماس با ما درخواست حذف حساب و داده‌های مرتبط را بدهید</li>
        </ul>

        <h2>{tx.contact}</h2>
        <p>
          اگر سؤالی دربارهٔ این سیاست حریم خصوصی دارید، با ما تماس بگیرید:{" "}
          <a href="mailto:admin@zandapplication.com">admin@zandapplication.com</a>
        </p>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: September 2026</p>

      <p>
        ZAND (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the ZAND mobile
        application and the website at zandapplication.com. This Privacy Policy explains what
        information we collect, how we use it, and your choices.
      </p>

      <h2>Information we collect</h2>
      <p>When you create an account, we collect:</p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your phone number (if provided)</li>
      </ul>

      <p>When you use the app, we collect:</p>
      <ul>
        <li>Your activity within the app (lessons completed, articles viewed, businesses saved)</li>
        <li>Your location, only if you choose to share it (to show nearby businesses)</li>
        <li>Device information and app usage analytics to improve the experience</li>
      </ul>

      <p>If you submit a business listing, we collect:</p>
      <ul>
        <li>Business name, description, category, and contact information</li>
        <li>Business address and location coordinates</li>
        <li>Photos you upload</li>
        <li>This information is published on the app and website so that users can discover your business</li>
      </ul>

      <h2>How we use your information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and maintain the ZAND app and website</li>
        <li>Personalise your learning experience and track your progress</li>
        <li>Show you relevant businesses near your location (when enabled)</li>
        <li>Send you notifications about your account or learning progress (when enabled)</li>
        <li>Improve and develop new features</li>
      </ul>

      <h2>Information sharing</h2>
      <p>
        We do not sell your personal information. We may share information with service providers
        who help us operate the app (such as hosting and analytics), and we will share information
        if required by law.
      </p>

      <h2>Data storage</h2>
      <p>
        Your data is stored securely using Supabase, with servers located in the European Union.
        We retain your information for as long as your account is active or as needed to provide
        you with our services.
      </p>

      <h2>Your rights</h2>
      <p>You can:</p>
      <ul>
        <li>Access, update, or delete your account information at any time through the app</li>
        <li>Disable location sharing in your device settings</li>
        <li>Request deletion of your account and associated data by contacting us</li>
      </ul>

      <h2>Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, contact us at{" "}
        <a href="mailto:admin@zandapplication.com">admin@zandapplication.com</a>.
      </p>
    </div>
  );
}
