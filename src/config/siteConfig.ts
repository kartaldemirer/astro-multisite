export const siteConfig = {
  siteMeta: {
    name: "Kumar Yeri",
    url: "https://kumarpuan.com",
    title: "2025’in En Güvenilir Oyun Siteleri ve Özel Üyelik Fırsatları",
    description: "En güncel üyelik avantajlarını ve promosyon sunan lisanslı oyun platformlarını 2025 yılı için keşfedin. Tüm fırsatlar tek sayfada toplandı.",
    keywords: "online casino bonusları, 2025 casino bonus, freespin, yatırım bonusu, en iyi kumar siteleri",
    author: "KumarYeri.com",
    publisher: "KumarYeri.com",
    canonical: "https://kumaryeri.com/",
    email: "info@kumarpuan.com",
    og: {
      siteName: "KumarYeri.com",
      title: "2025’in En Güvenilir Casino Siteleri | KumarYeri.com",
      description: "En güvenilir casino siteleri ve en güncel yatırım bonusları, freespin kampanyaları burada!",
      url: "https://kumaryeri.com/",
      image: "https://kumaryeri.com/social-banner.jpg"
    },
    twitter: {
      site: "@kumaryeri",
      title: "2025'in En İyi Casino Bonusları",
      description: "Bonusları kaçırma! 2025'in en güvenilir kumar siteleri ve promosyonları burada.",
      image: "https://kumaryeri.com/social-banner.jpg"
    }
  },

  theme: {
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      highlight: "text-yellow-400",
      bonus: "text-green-400",
      tag: "text-blue-100",
    },
    bg: {
      card: "bg-neutral-900",         // örnek: bg-[#0c0f1a]
      logo: "bg-neutral-800",         // örnek: bg-gray-800
      tag: "bg-blue-900/40",
    },
    border: {
      card: "border-gray-700",
      tag: "border-blue-700",
    },
    advertise: {
        border: "border-yellow-500",
        background: "bg-neutral-800", // örnek: bg-[#1f1f1f]
        iconBg: "bg-yellow-900/10",
        iconColor: "text-yellow-400",
        heading: "text-yellow-400",
        link: "text-yellow-300 underline",
        text: "text-gray-300",
    },
    faq: {
      heading: "text-white",
      border: "border-yellow-500",
      box: "bg-[#121826] rounded-lg p-4 border border-gray-700",
      question: "text-yellow-400 font-semibold text-lg",
      answer: "text-gray-300 text-sm leading-relaxed",
    },
    highlight: {
      section: "mt-12 space-y-8 text-site-text text-sm leading-relaxed",
      title: "text-lg font-semibold mb-1 text-site-highlight",
      description: "text-site-text",
    },
  },

  layout: {
    bodyClass: "min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0f0f0f] to-[#1a1a1a] text-white font-sans"
  },

  header: {
    logoText: "KumarYeri",
    nav: [
      { name: "Ana Sayfa", href: "/" },
      { name: "Bonuslar", href: "/#bonuslar" },
      { name: "Hakkımızda", href: "/hakkimizda" },
      { name: "İletişim", href: "/iletisim" }
    ],
    classes: {
      wrapper: "bg-black/90 backdrop-blur border-b border-gray-800",
      container: "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between",
      logo: "text-yellow-400 text-2xl font-extrabold",
      navList: "flex gap-6 text-sm sm:text-base text-white",
      navLink: "hover:text-yellow-400 transition"
    }
  },

  footer: {
    text: "© 2025 Kumar Yeri — En iyi promosyonlar burada!",
    classes: {
      wrapper: "border-t border-gray-800 mt-12",
      container: "max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-400"
    }
  },

  nav: [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Bonuslar", href: "/#bonuslar" },
    { label: "S.S.S.", href: "/#faq" },
  ],

  hero: {
    title: "2025’in En Avantajlı Casino Bonusları",
    description:
      "En iyi siteleri ve en yüksek oranlı promosyonları senin için analiz ettik. KumarPuan ile kazançlı başla.",
    ctaText: "Bonusları İncele",
    ctaLink: "#bonuslar",
    sectionClass: "py-16 px-6 text-center bg-yellow-50 text-black rounded-3xl shadow-2xl fade-in-up",
    titleClass: "text-4xl sm:text-5xl font-extrabold mb-4",
    descClass: "text-lg sm:text-xl mb-6 max-w-2xl mx-auto text-gray-800",
    ctaClass: "inline-block bg-black text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
  },

  promoIntro: {
    title: "2025’in En İyi Casino Promosyonları",
    titleClass: "text-yellow-400",
    descriptionClass: "text-gray-300",
    brand: "KumarYeri.com",
    brandClass: "text-yellow-500",
    highlightClass: "text-yellow-400 font-bold",
    features: [
      { icon: "🎯", text: "%200’e varan hoş geldin promosyonları" },
      { icon: "🎁", text: "Yatırım & kayıp iade promosyonları" },
      { icon: "🧲", text: "Slot makinelerine özel ekstra çevrimler" },
      { icon: "🏆", text: "Sadece güvenilir lisanslı siteler" }
    ],
    ctaText: "Bonusları Keşfet",
    ctaLink: "#bonuslar",
    ctaTitle: "Bonusları Keşfet",
    ctaClass: "inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-lg"
  },

  bonusSites: {
    title: "Casino Listesi",
    titleColor: "text-white",
    borderColor: "border-yellow-500"
  },

  faq: [
    {
        question: "Online casino promosyonu nedir?",
        answer: "Kayıt veya yatırım karşılığında sunulan promosyonlardır. En yaygın türleri freespin ve %100 hoş geldin promosyonudur.",
    },
    {
        question: "Bonuslar hemen kullanılabilir mi?",
        answer: "Bazı bonuslar otomatik olarak tanımlanır, bazıları manuel olarak talep edilir.",
    },
    {
        question: "En iyi promosyon nasıl seçilir?",
        answer: "Çevrim şartı düşük, güvenilir lisanslı sitelerin sunduğu promosyonlar tercih edilmelidir.",
    },
    {
        question: "Promosyonların çevrim şartı ne demektir?",
        answer: "Kazanılan promosyonun gerçek para olarak çekilebilmesi için belirli sayıda çevrilmesi gerekir. Örneğin 20x çevrim, 100₺ promosyon için 2000₺ bahis yapılması gerektiği anlamına gelir.",
    },
    {
        question: "Promosyonlar hemen kullanılabilir mi?",
        answer: "Çoğu promosyon, yatırım yapar yapmaz veya kayıt sonrası otomatik olarak tanımlanır. Ancak bazı siteler promosyonu manuel olarak talep etmenizi ister.",
    },
    {
        question: "Her oyuncu aynı promosyonu alabilir mi?",
        answer: "Hayır. Bazı promosyonlar yalnızca yeni üyeler içindir, bazıları ise VIP seviyenize göre artar. Ayrıca bazı promosyonlar belirli bölgelerle sınırlıdır.",
    },
  ],

  highlights: [
    {
      title: "Türkiye’de En Popüler Online Casino Siteleri",
      description: "Türkiye’de yasal olarak hizmet veren casino siteleri bulunmasa da, yurt dışı merkezli birçok güvenilir platform Türk kullanıcıları hedef alarak özel kampanyalar sunmaktadır. Bu siteler arasında lisanslı ve denetlenebilir olanları tercih etmek, kullanıcı güvenliği açısından büyük önem taşır."
    },
    {
      title: "Hoş Geldin Promosyonu Nedir, Nasıl Alınır?",
      description: "Hoş geldin promosyonu, yeni üye olan kullanıcılara özel verilen bir promosyondur. Genellikle ilk para yatırma işlemine %100 promosyon ya da freespin şeklinde sunulur. Promosyonun geçerli olması için bazı çevrim şartları vardır. Promosyon almadan önce kullanım koşullarını dikkatlice incelemek gerekir."
    },
    {
      title: "En İyi Casino Sitelerini Nasıl Seçiyoruz?",
      description: "KumarYeri.com olarak, her siteyi detaylı kriterlere göre değerlendiriyoruz: lisans durumu, promosyon miktarı, ödeme hızı, kullanıcı yorumları ve müşteri desteği başlıca kriterlerimizdir. Sadece güvenilirliği kanıtlanmış platformlara sitemizde yer veriyoruz."
    },
    {
      title: "%100 Bonus Veren Siteler Gerçek mi?",
      description: "Bazı casino siteleri, ilk yatırımınıza karşılık %100 oranında promosyon sunar. Bu tür promosyonlar oyuncular için cazip olsa da, çevrim şartlarını dikkatlice incelemek gerekir. KumarYeri.com olarak, bu promosyonları test edip yalnızca gerçekten sunulan ve oyuncuların faydalanabildiği teklifleri listeliyoruz."
    },
    {
      title: "Freespin ile Oynanabilecek Popüler Slot Oyunları",
      description: "Freespin promosyonu aldığınızda genellikle belli başlı slot oyunlarında geçerli olur. En çok kullanılan oyunlar arasında <strong>Sweet Bonanza</strong>, <strong>Gates of Olympus</strong> ve <strong>Book of Dead</strong> gibi yüksek kazanç potansiyelli makineler yer alır. Promosyonun geçerli olduğu oyunları casino sitesinin kampanya detaylarından görebilirsiniz."
    },
    {
      title: "Çevrim Şartsız Bonus Nedir, Gerçekten Var mı?",
      description: "Çevrim şartsız promosyonlar, kazandığınız tutarı doğrudan çekebileceğiniz anlamına gelir. Ancak bu tür kampanyalar oldukça nadirdir. Bazı siteler “çevrim şartsız” ifadesini pazarlama amacıyla kullansa da, detaylara inildiğinde belirli şartların olduğu görülür. KumarYeri.com olarak bu konudaki tüm detayı şeffaf şekilde sunarız."
    },
    {
      title: "Mobil Uyumlu Casino Siteleri ve Avantajları",
      description: "Mobil uyumlu casino siteleri, akıllı telefon ya da tablet üzerinden kolayca erişim sağlar. Ek bir uygulama indirmenize gerek kalmadan tarayıcıdan giriş yapabilir, oyunlara ve promosyonlara ulaşabilirsiniz. Hızlı erişim, kesintisiz oyun deneyimi ve 7/24 destek gibi avantajlar sunar."
    },
  ],

  about: {
    title: "Hakkımızda",
    content: `
      KumarYeri.com, 2025 yılında kurulmuş, tarafsız ve güncel casino içerikleri sunmayı amaçlayan bir platformdur.
      Amacımız, oyunculara en güvenilir siteleri ve en avantajlı promosyonları objektif biçimde sunmaktır.
      Her liste, uzman editörler tarafından detaylı analiz edilerek hazırlanır.
    `,
  },

  contact: {
    title: "İletişim",
    email: "info@kumaryeri.com",
    phone: "+90 555 555 5555",
    address: "İstanbul, Türkiye",
    content: `
      Bizimle iletişime geçmek çok kolay! Aşağıdaki kanallar üzerinden destek ekibimize ulaşabilirsiniz.
      Her türlü görüş, öneri ve işbirliği taleplerinizi bekliyoruz.
    `,
  },
};
