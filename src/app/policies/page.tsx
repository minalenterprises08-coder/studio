import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Policy',
  description: 'Read the social policy of Minal Enterprises. We are committed to fair labor practices, a safe work environment, and upholding the rights of our employees.',
  alternates: {
    canonical: '/policies',
  },
};

export default function SocialPolicyPage() {
  const policies = [
    {
      urdu: 'کمپنی پالیسی کے مطابق 18 سال سے کم عمر بچوں کو کام پر نہیں لگایا جائے گا۔',
      english: 'In accordance with company policy, children under the age of 18 will not be employed.',
    },
    {
      urdu: 'کمپنی نہ تو جبری مشقت پر یقین رکھتی ہے اور نہ کسی کو جبری مشقت پر مجبور کرتی ہے۔',
      english: 'The company does not believe in or enforce forced labor.',
    },
    {
      urdu: 'کمپنی اس بات کا خیال رکھے گی کہ اگر ورکرز اپنے حقوق کے حصول کے لئے اپنی مرضی سے کوئی فرم یا گروپ قائم کرے تو اس میں رکاوٹ نہ کرے۔',
      english: 'The company will ensure that it does not obstruct workers from forming a firm or group of their own volition to secure their rights.',
    },
    {
      urdu: 'کمپنی اپنے ورکرز کو صاف ستھرا اور محفوظ ماحول مہیا کرتی ہے اور اس بات کی پابند ہے کہ کام کے دوران ورکرز کو کسی قسم کا حادثہ پیش نہ آئے۔',
      english: 'The company provides its workers with a clean and safe environment and is committed to preventing any accidents during work.',
    },
    {
      urdu: 'ورکرز کی تقرری ، اجرت ، ترقی ، تربیت ، ریٹائرمنٹ کے وقت کسی قسم کا کوئی امتیازی سلوک ، رنگ ، نسل ، ذات ، جنس معذوری ، یونین سازی یا دیگر وجوہات سے نہیں رکھا جائے گا ۔ رشوت لینا اور دینا سختی سے منع ہے ۔',
      english: 'No discrimination based on color, race, caste, gender, disability, unionization, or other reasons will be made at the time of a worker\'s appointment, wages, promotion, training, or retirement. Bribery is strictly prohibited.',
    },
    {
      urdu: 'کمپنی اس بات کی پابند ہے کہ ورکرز سے 48 گھنٹے سے زیادہ ایک ہفتے میں کام نہیں لیا جائے گا۔ انتہائی ضرورت کے وقت اضافی وقت میں کام لیا جائے گا جو کہ ہفتے میں 12 گھنٹے سے زائد نہیں ہو گا اور اور ٹائم قانون کے مطابق نارمل ریٹ کا ڈبل دیا جائے گا۔',
      english: 'The company is bound not to take more than 48 hours of work from a worker in a week. In times of extreme need, overtime work will not exceed 12 hours a week, and double the normal rate will be paid as per overtime law.',
    },
    {
      urdu: 'تمام اجرت ، الاؤنس ، بینیفٹس اور دیگر مراعات قانون کے مطابق تمام ورکرز اور سٹاف کو بلاکسی تفریق کے ادا کی جاتی ہیں۔',
      english: 'All wages, allowances, benefits, and other privileges are paid to all workers and staff without any discrimination, in accordance with the law.',
    },
    {
      urdu: 'کمپنی کی انتظامیہ ماحولیاتی قواعد و ضوابط کی مکمل ذمہ داری اور دیگر اطراف میں صحتمندانہ اور محفوظ ماحول کو یقینی بنانے میں کوشاں رہتی ہے۔',
      english: 'The company\'s management is fully responsible for environmental regulations and strives to ensure a healthy and safe environment in all other aspects.',
    },
  ];

  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Social Policy
            </h1>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-muted-foreground mt-2">
              سوشل پالیسی
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Minal Enterprises is committed to upholding the rights and well-being of our employees and workers.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-right mb-8" dir="rtl">
            <p>
              کمپنی کی انتظامیہ اس بات کی پابند ہے کہ ملازمین اور ورکرز کو ہر وہ سہولت اور فائدہ دے گی جو کہ اسے اخلاقی اور معاشرتی طور پر حاصل ہے ۔ اسی چیز کو مد نظر رکھتے ہوئے انتظامیہ نے یہ فیصلہ کیا ہے کہ تمام ورکرز کو وہ تمام سہولیات مہیا کی جائیں گی جو کہ قانونی اور معاشرتی طور پر ان کا حق ہے۔
            </p>
          </div>
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto mb-12">
            <p>
              The management of the company is bound to provide employees and workers with every facility and benefit that they are entitled to morally and socially. Keeping this in mind, the administration has decided that all workers will be provided with all the facilities that are their legal and social right.
            </p>
          </div>


          <div className="space-y-8">
            {policies.map((policy, index) => (
              <article key={index} className="p-6 border rounded-lg shadow-sm">
                <p className="mb-4 text-xl text-right font-semibold" dir="rtl">{policy.urdu}</p>
                <hr className="my-4"/>
                <p className="text-lg text-muted-foreground">{policy.english}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
