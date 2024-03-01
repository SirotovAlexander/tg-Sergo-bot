const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
const { BOT_TOKEN } = process.env;

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
      ["⭐️ Погода в Chișinău", "⭐️ История Chișinău"],
      ["⭐️ Достопримечательности Chișinău", "⭐️ Курс валют в Chișinău"],
      ["⭐️ Шутки за 300", "⭐️ Анектоды по ChișinăuСКИ"],
      ["⭐️ Литература о Chișinău", "⭐️ НЕ НАЖИМАЙ"],
      ["❌ Закрыть меню"],
    ]).resize()
  )
);

bot.hears("⭐️ Шутки за 300", (ctx) =>
  ctx.reply("Отсаси у тракториста ХАХАХАХАХАХАХАХАХАХАХ")
);

bot.hears("❌ Закрыть меню", (ctx) =>
  ctx.reply("Пака", Markup.removeKeyboard())
);

bot.launch();
