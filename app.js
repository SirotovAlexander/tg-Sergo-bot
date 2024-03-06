const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
const getWether = require("./api/weatherApi");
const getCurrency = require("./api/currencyApi");
const { BOT_TOKEN, CAPITAL_INFO, INTERESTING_FACTS } = process.env;

const bot = new Telegraf(BOT_TOKEN);

// bot.start(async (ctx) => {
//   await bot.telegram.sendMessage(
//     ctx.chat.id,
//     `Какую полезую информацию ты хочешь получить Сережа?`,
//     {
//       reply_markup: {
//         keyboard: [
//           ["⭐️ Погода в Chișinău", "⭐️ История Chișinău"],
//           ["⭐️ Достопримечательности Chișinău", "⭐️ Курс валют в Chișinău"],
//           ["⭐️ Шутки за 300", "⭐️ Анектоды по ChișinăuСКИ"],
//           ["⭐️ Литература о Chișinău", "⭐️ НЕ НАЖИМАЙ"],
//           ["❌ Закрыть меню"],
//         ],
//         resize_keyboard: true,
//       },
//     }
//   );
// });

// bot.on("message", async (ctx) => {
//   const chatID = ctx.chat.id;

//   if (ctx.message.text === "⭐️ Шутки за 300") {
//     ctx.reply("Отсаси у тракториста ХАХАХАХАХАХАХАХАХАХАХ");
//   } else if (ctx.message.text === "❌ Закрыть меню") {
//     await bot.telegram.sendMessage(ctx.chat.id, "Пака", {
//       reply_markup: {
//         remove_keyboard: true,
//       },
//     });
//   }
// });

// bot.start((ctx) => {
//   ctx.reply("Welcome", {
//     reply_markup: Markup.keyboard(["привет"]),
//   });
// });
bot.start((ctx) =>
  ctx.reply(
    "Какую полезую информацию ты хочешь получить Сережа?",
    Markup.keyboard([
      ["⭐️ Погода в Chișinău", "⭐️ Информация о Chișinău"],
      ["⭐️ Достопримечательности Chișinău", "⭐️ Курс валют по ЕЦБ"],
      ["⭐️ Шутки за 300", "⭐️ Анектоды по ChișinăuСКИ"],
      ["⭐️ Литература о Chișinău", "⭐️ НЕ НАЖИМАЙ"],
      ["❌ Закрыть меню"],
    ]).resize()
  )
);

bot.hears("⭐️ Погода в Chișinău", async (ctx) => {
  const response = await getWether();
  ctx.replyWithHTML(`<b>${response}</b>`);
});
bot.hears("⭐️ Информация о Chișinău", (ctx) => {
  ctx.replyWithHTML(
    `<b>${CAPITAL_INFO}\n=========>Цікавеньки факти:${INTERESTING_FACTS}</b>`
  );
});
bot.hears("⭐️ Достопримечательности Chișinău", (ctx) => {
  // ctx.reply(
  //   "Единственная достопримечательность в Молдове - это граница с Одесской областью Сережа.\n Хотя если серьезно, то в Chișinău можно посмотреть на: https://turistigid.com/dostoprimechatelnosti/kishinev.html"
  // );

  ctx.replyWithMediaGroup([
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/park-imeni-shtefana.jpg",
      },
      caption: "Парк имени Штефана",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/vinnye-pogreba.jpg",
      },
      caption: "Винодельческий центр «Малые Милешты»",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/dendrariy.jpg",
      },
      caption: "Дендрарий",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/memorialnyy-kompleks.jpg",
      },
      caption: "Мемориальный комплекс «Eternitate»",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/sobor-rozhdestva-hristova.jpg",
      },
      caption: "Собор Рождества Христова",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/sobor-rozhdestva-hristova.jpg",
      },
      caption: "Музей этнографии и естественной истории Молдовы",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/triumfalnaya-arka.jpg",
      },
      caption: "Арка Триумфа",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/muzey-arheologii-i-istorii.jpg",
      },
      caption: "Национальный музей археологии и истории",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/park-dolina-melnits.jpg",
      },
      caption: "Парк развлечений «Долина Мельниц»",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/pamyatnik-shtefanu-velikomu.jpg",
      },
      caption: "Памятник государю Штефану Великому",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/chuflinskiy-monastyr.jpg",
      },
      caption: "Чуфлинский монастырь",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/muzey-istorii-goroda.jpg",
      },
      caption: "Музей истории города",
      type: "photo",
    },
    {
      media: {
        url: "https://turistigid.com/wp-content/uploads/2019/10/krepost-soroka.jpg",
      },
      caption: "Крепость Сорока",
      type: "photo",
    },
  ]);
  
});
bot.hears("⭐️ Курс валют по ЕЦБ", async (ctx) => {
  const response = await getCurrency();

  ctx.replyWithHTML(
    `<b>USD - CZN:${response.CZK}</b>\n<b>USD - EUR:${response.EUR}</b>\n<b>USD - PLN:${response.PLN}</b>\n<b>USD - CHF:${response.CHF}</b>\n<b>USD - GBP:${response.GBP}</b>`
  );
});

bot.hears("⭐️ Шутки за 300", (ctx) =>
  ctx.reply("Отсаси у тракториста ХАХАХАХАХАХАХАХАХАХАХ")
);

bot.hears("❌ Закрыть меню", (ctx) =>
  ctx.reply("Пака", Markup.removeKeyboard())
);

bot.launch();
