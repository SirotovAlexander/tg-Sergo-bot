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
  ctx.reply(
    "Единственная достопримечательность в Молдове - это граница с Одесской областью Сережа.\n Хотя если серьезно, то в Chișinău можно посмотреть на: https://turistigid.com/dostoprimechatelnosti/kishinev.html"
  );
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
