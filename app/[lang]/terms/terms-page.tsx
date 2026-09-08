import type { Metadata } from "next";
import "../privacy/privacy.css";
import { t } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Terms & Conditions — ZAND",
};

export default async function TermsPage({
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
        <h1>{tx.termsTitle}</h1>
        <p className="legal-updated">{tx.lastUpdated}</p>

        <p>
          به زند خوش آمدید. با استفاده از اپلیکیشن موبایل یا وب‌سایت ما در zandapplication.com،
          شما با این شرایط موافقت می‌کنید. لطفاً آن‌ها را با دقت بخوانید.
        </p>

        <h2>استفاده از زند</h2>
        <p>
          زند ابزارهای آموزش زبان، محتوای آموزشی دربارهٔ تاریخ و فرهنگ ایران و فهرستی
          از کسب‌وکارهای ایرانی ارائه می‌دهد. برای ساخت حساب کاربری باید حداقل ۱۳ سال
          داشته باشید.
        </p>
        <p>
          شما مسئول حساب کاربری خود و حفظ امنیت اطلاعات ورودتان هستید.
          موافقت می‌کنید که از پلتفرم برای هیچ هدف غیرقانونی یا به شکلی که به
          کاربران دیگر یا سرویس آسیب برساند استفاده نکنید.
        </p>

        <h2>محتوا</h2>
        <p>
          محتوای آموزشی، مقالات و مطالب یادگیری در زند توسط ما یا شرکای تحریریه‌مان
          تولید شده است. بدون اجازهٔ کتبی ما حق تکثیر، توزیع یا بازنشر این محتوا را ندارید.
        </p>

        <h2>ثبت کسب‌وکار</h2>
        <p>
          اگر یک کسب‌وکار ثبت می‌کنید، تأیید می‌کنید که نمایندهٔ مجاز آن کسب‌وکار هستید
          و اطلاعاتی که ارائه می‌دهید دقیق است. ما حق بررسی، ویرایش یا حذف هر ثبت‌نامی
          را به صلاحدید خود داریم.
        </p>
        <p>
          کسب‌وکارهای ثبت‌شده به صورت عمومی در اپلیکیشن و وب‌سایت منتشر می‌شوند. با
          ثبت کسب‌وکار، موافقت می‌کنید که این اطلاعات برای همهٔ کاربران قابل مشاهده باشد
          و توسط موتورهای جست‌و‌جو ایندکس شود.
        </p>

        <h2>رفتار کاربر</h2>
        <p>موافقت می‌کنید که این کارها را انجام ندهید:</p>
        <ul>
          <li>انتشار محتوای نادرست، گمراه‌کننده یا مضر</li>
          <li>آزار، توهین یا تهدید سایر کاربران</li>
          <li>تلاش برای دسترسی به حساب یا داده‌های کاربران دیگر</li>
          <li>استفاده از پلتفرم برای هرزنامه، تبلیغات یا درخواست‌های ناخواسته</li>
          <li>ایجاد اختلال در عملکرد اپلیکیشن یا وب‌سایت</li>
        </ul>

        <h2>مالکیت معنوی</h2>
        <p>
          زند، لوگو، طراحی و تمام محتوای اصلی متعلق به زند است. محتوای در پرشین مگ (TPM)
          در اپلیکیشن تحت یک مشارکت محتوایی ارائه شده و متعلق به TPM باقی می‌ماند.
        </p>

        <h2>فسخ</h2>
        <p>
          در صورت نقض این شرایط ممکن است حساب شما را تعلیق یا فسخ کنیم. شما می‌توانید
          در هر زمان از طریق اپلیکیشن یا با تماس با ما حسابتان را حذف کنید.
        </p>

        <h2>محدودیت مسئولیت</h2>
        <p>
          زند به صورت «همان‌طور که هست» ارائه می‌شود. تمام تلاش خود را برای تضمین دقت
          انجام می‌دهیم اما تضمین نمی‌کنیم که تمام محتوا بدون خطاست. ما مسئول هیچ خسارتی
          ناشی از استفادهٔ شما از پلتفرم نیستیم.
        </p>

        <h2>تغییرات در این شرایط</h2>
        <p>
          ممکن است این شرایط را هر از گاهی به‌روزرسانی کنیم. تغییرات مهم را از طریق
          اپلیکیشن یا ایمیل به شما اطلاع خواهیم داد.
        </p>

        <h2>{tx.contact}</h2>
        <p>
          سؤالی دربارهٔ این شرایط دارید؟ با ما تماس بگیرید:{" "}
          <a href="mailto:admin@zandapplication.com">admin@zandapplication.com</a>
        </p>
      </div>
    );
  }

  return (
    <div className="legal-page">
      <h1>Terms &amp; Conditions</h1>
      <p className="legal-updated">Last updated: September 2026</p>

      <p>
        Welcome to ZAND. By using our mobile application or website at zandapplication.com,
        you agree to these terms. Please read them carefully.
      </p>

      <h2>Using ZAND</h2>
      <p>
        ZAND provides language learning tools, educational content about Iranian history and
        culture, and a directory of Iranian-owned businesses. You must be at least 13 years old
        to create an account.
      </p>
      <p>
        You are responsible for your account and for keeping your login credentials secure.
        You agree not to use the platform for any unlawful purpose or in any way that could
        harm other users or the service.
      </p>

      <h2>Content</h2>
      <p>
        The educational content, articles, and learning materials on ZAND are created by us
        or our editorial partners. You may not reproduce, distribute, or republish this content
        without our written permission.
      </p>

      <h2>Business listings</h2>
      <p>
        If you submit a business listing, you confirm that you are authorised to represent that
        business and that the information you provide is accurate. We reserve the right to review,
        edit, or remove any listing at our discretion.
      </p>
      <p>
        Business listings are published publicly on both the app and the website. By submitting
        a listing, you consent to this information being visible to all users and indexed by
        search engines.
      </p>

      <h2>User conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Post false, misleading, or harmful content</li>
        <li>Harass, abuse, or threaten other users</li>
        <li>Attempt to access other users&apos; accounts or data</li>
        <li>Use the platform for spam, advertising, or solicitation</li>
        <li>Interfere with the operation of the app or website</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        ZAND, its logo, design, and all original content are the property of ZAND. The Persian
        Mag (TPM) content within the app is provided under a content partnership and remains the
        property of TPM.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your account if you violate these terms. You may delete your
        account at any time through the app or by contacting us.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        ZAND is provided as-is. We do our best to ensure accuracy but do not guarantee that all
        content is error-free. We are not liable for any damages arising from your use of the
        platform.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. We will notify you of significant changes
        through the app or by email.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Contact us at{" "}
        <a href="mailto:admin@zandapplication.com">admin@zandapplication.com</a>.
      </p>
    </div>
  );
}
