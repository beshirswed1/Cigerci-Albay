// ============================================================
// RESTAURANT DATA CONFIGURATION - Ciğerci Albay
// ============================================================
// Bu dosyayı düzenleyerek restoranınızın tüm bilgilerini güncelleyebilirsiniz.
// Edit this file to customize all restaurant information.
// ============================================================

export const RESTAURANT = {
  // ─── Basic Info ──────────────────────────────────
  name: "Ciğerci Albay", //
  slogan: "1996'dan Bugüne Değişmeyen Lezzet", //
  shortDescription: "Gaziantep merkezinde 1996'dan beri hizmet veren, geleneksel ciğer ve kebap kültürünü yaşatan aile restoranı.",
  longDescription:
    "Ciğerci Albay Kimdir?\nGaziantep merkezde yer alan Ciğerci Albay, 1996 yılından beri ciğer kebabı ve tüm kebap çeşitlerinde uzmanlaşmış bir aile restoranıdır. Misafirperverliğiyle tanınan işletme sahibi ve ekibi, geleneksel Doğu mutfağı kültürünü ve taş fırın lezzetlerini en doğal haliyle sunmaktadır. Özellikle kuzu ciğeri, Adana kebabı ve meşhur Beyran çorbasıyla tanınan mekan, Gaziantep'in lezzet haritasında köklü bir geçmişe sahiptir.",
  foundedYear: 1996, //
  logo: "/logo.png", // يمكنك استخدام اللوغو الذي استخرجناه سابقاً

  // ─── Contact ─────────────────────────────────────
  phone: "03422201263", //
  whatsapp: "905352886804", // +90 535 288 68 04
  // email: "",
  address: "Yaprak, 27400 Şehitkamil/Gaziantep", //
  city: "Gaziantep",
  country: "Türkiye",

  // ─── Social Media ────────────────────────────────
  social: {
    instagram: "https://instagram.com/cigerclalbayy", //
  },

  // ─── Working Hours ───────────────────────────────
  workingHours: [
    { days: "Pazartesi - Cumartesi", hours: "09:00 - 03:00" }, //
    { days: "Pazar", hours: "09:00 - 12:00" } //
  ],

  // ─── Hero Section ────────────────────────────────
  hero: {
    title: "Gaziantep'in Gerçek Ciğer Lezzeti",
    subtitle: "1996'dan beri geleneksel lezzetler.",
    backgroundImage: "/hero.png",
    ctaPrimary: { text: "Menümüzü Keşfedin", href: "/menu" },
    ctaSecondary: { text: "Bizi Arayın", href: "tel:03422201263" },
  },

  // ─── Stats ───────────────────────────────────────
  stats: [
    { value: 28, suffix: "+", label: "Yıllık Tecrübe", icon: "award" },
    { value: 594, suffix: "", label: "Yorum Sayısı", icon: "users" },
    { value: 3.3, suffix: "", label: "Müşteri Puanı", icon: "star" },
    { value: 7, suffix: "", label: "Haftanın 7 Günü", icon: "watch" },
  ],

  // ─── About Section ──────────────────────────────
  about: {
    title: "Ciğerci Albay Kimdir?",
    subtitle: "Gaziantep'in lezzet mirasını 1996'dan beri sürdüren samimi aile işletmesi.",
    description:
      "Gaziantep'in tarihi dokusunda hizmet veren Ciğerci Albay, samimi patronu ve lezzetli etleriyle yerli ve yabancı turistlerin uğrak noktasıdır. Geleneksel ciğer dürümden özel porsiyonlara kadar her ürün, yılların verdiği ustalıkla hazırlanır. Fiyat/performans oranı yüksek, aileye uygun ve temiz bir ortamda Gaziantep'in gerçek yemek kültürünü tatma fırsatı sunar.",
    image: "/albay.png",
    features: [
      { title: "Köz Ateşi", description: "Lezzetin sırrı olan geleneksel kömür ateşinde pişirme", icon: "flame" },
      { title: "Güler Yüzlü Hizmet", description: "Samimi ve dostane işletme sahibi ve personel", icon: "award" },
      { title: "Zengin Çeşitler", description: "Ciğer, Adana, Küşleme ve Beyran çorbası", icon: "leaf" },
    ],
  },

  // ─── Reviews / Testimonials ──────────────────────
  reviews: [
    {
      name: "çiğdem ışık",
      rating: 5,
      date: "4 gün önce",
      comment: "Küşleme ve beyran yedik ve su aldık. Salatalar ve çay ikram olarak geldi. Yemekler harikaydı. Tavsiye ederiz.",
      avatar: "ÇI",
    },
    {
      name: "Alperen Demirtaş",
      rating: 5,
      date: "1 hafta önce",
      comment: "Gecenin 2 sinde gittim. Hayatimda yedigim en güzel eti yedim. O kadar yüksek oy almış popüler mekanlardan 1000 kat daha iyi, hakki yenilen bir mekan.",
      avatar: "AD",
    },
    {
      name: "Talha kadir Güleç",
      rating: 5,
      date: "2 hafta önce",
      comment: "Gerçekten mükemmel bir restorandı. Galatasarayın Super kupa maçı için antepe geldim, çok misafirperver insanlar bir adana yedim doymadım ikinciyi yedim herkese öneririm.",
      avatar: "TG",
    },
    {
      name: "Albay Bulgun",
      rating: 5,
      date: "3 hafta önce",
      comment: "Herşey çok güzeldi beğendim, özellikle tavuk sarma gerçekten çok iyiydi. Umarım tekrar gidebilme şansım olur ve bu lezzetleri tekrar tadarım.",
      avatar: "AB",
    },
    {
      name: "Hakan Parlak",
      rating: 5,
      date: "3 hafta önce",
      comment: "Kavurma güzeldi tavuk porsiyon normal yerden kat be kat fazlaydı atmosfer güzeldi garson arkadaşlar da güler yüzlü ve ilgililerdi.",
      avatar: "HP",
    },
    {
      name: "Tarık Yıldırım",
      rating: 5,
      date: "1 ay önce",
      comment: "Gerçekten Antep'te gördüğüm en iyi hizmetti ve en iyi yemekti personeller çok kibar ve saygılıydı herkese tavsiye ediyorum.",
      avatar: "TY",
    },
    {
      name: "Perihan demir",
      rating: 5,
      date: "1 ay önce",
      comment: "Mekan temiz, çalışanlar ilgili. Kebap gerçekten lezzetliydi, et güzel pişmişti. Yeşillikler sanki parlıyor gibiydi hem taze, hem temizdi.",
      avatar: "PD",
    },
    {
      name: "Metehan Potuk",
      rating: 5,
      date: "1 ay önce",
      comment: "Ciğer ve adana kebab yedik cok begendik temiz bir mekan. Adanadan gelipde begenmek iyiydi.",
      avatar: "MP",
    },
    {
      name: "Cem İlgen",
      rating: 5,
      date: "1 ay önce",
      comment: "Gaziantep e gelip de burda ciğer yemek muhteşemdi gerçekten kesinlikle tavsiye ediyorum. Porsiyonlar da baya doyurucu ikramları da oldukça taze.",
      avatar: "Cİ",
    },
    {
      name: "Murat İğde",
      rating: 5,
      date: "1 ay önce",
      comment: "İş gereği her ay G.anteb'e geliyorum ve hep tercih ettiğim mekan. Kebaplar enfes, çalışanlar güleryüzlü işinin ehli ve aileden gibiler.",
      avatar: "Mİ",
    },
  ],

  // ─── Map ─────────────────────────────────────────
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d773.2304658880424!2d37.380199674134566!3d37.068172829146896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e14d85ac6bb7%3A0x2826f8de278a34a9!2sCi%C4%9Ferci%20Albay!5e0!3m2!1sar!2str!4v1778011632080!5m2!1sar!2str",

  // ─── SEO ─────────────────────────────────────────
  seo: {
    title: "Ciğerci Albay | Gaziantep Ciğer ve Kebap Salonu",
    description:
      "Gaziantep'in 1996'dan beri değişmeyen ciğer ve kebap durağı Ciğerci Albay. Gerçek köz ateşinde ciğer lezzetini keşfedin!",
    keywords: "ciğer, kebap, gaziantep ciğerci, ciğerci albay, adana kebap, beyran çorbası, şehitkamil restoran",
    ogImage: "/hero.png",
    siteUrl: "https://cigerci-albay.vercel.app",
  },

  // ─── Theme Config ────────────────────────────────
  theme: {
    navLinks: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Menü", href: "/menu" },
    ],
  },
} as const;

export type RestaurantData = typeof RESTAURANT;
