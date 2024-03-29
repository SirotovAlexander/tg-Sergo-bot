const {
  Telegraf,
  Markup,
  Stage,
  session,
  Scenes,
  Composer,
} = require("telegraf");

const { message } = require("telegraf/filters");
const getWether = require("./api/weatherApi");
const getCurrency = require("./api/currencyApi");
const getJoke = require("./api/jokeApi");
const arrOfPlaces = require("./utils/famousPlaces");
const textObj = require("./api/text");
const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

// const enterMessageToGPT = new Composer();
// enterMessageToGPT.on("text", async (ctx) => {
//   await ctx.reply("Введи оракулу что бы ты хотел узнать");
//   return ctx.wizard.next();
// });

// const responceMessageFromGPT = new Composer();
// responceMessageFromGPT.on("text", async (ctx) => {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "user", content: ctx.message.text }],
//     model: "gpt-3.5-turbo",
//   });
//   openai.responceMessageFromGPT();

//   return ctx.scene.leave();
// });

// const GPRScene = new Scenes.WizardScene(
//   "startGPT",
//   enterMessageToGPT,
//   responceMessageFromGPT
// );

// const stage = new Scenes.Stage([GPRScene]);
// bot.use(session());
// bot.use(stage.middleware());

bot.start((ctx) =>
  ctx.reply(
    "Какую полезую информацию ты хочешь получить Сережа?",
    Markup.keyboard([
      ["⭐️ Погода в Chișinău", "⭐️ Информация о Chișinău"],
      ["⭐️ Достопримечательности Chișinău", "⭐️ Курс валют по ЕЦБ"],
      ["⭐️ Шутки за 300", "⭐️ Анектоды по ChișinăuСКИ"],
      ["⭐️ Литература о Chișinău анд Молдова", "⭐️ НЕ НАЖИМАЙ"],
      ["⭐️ Спроси у ЖПТ (в разработке)"],
      ["💲 Пожертвования"],
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
    `<b>${textObj.CAPITAL_INFO}\n=========>Цікавеньки факти:${textObj.INTERESTING_FACTS}</b>`
  );
});
bot.hears("⭐️ Достопримечательности Chișinău", (ctx) => {
  for (let i = 0; i < arrOfPlaces.length; i++) {
    ctx.replyWithMediaGroup([
      {
        media: {
          url: `${arrOfPlaces[i].media.url}`,
        },
        caption: `${arrOfPlaces[i].caption}`,
        type: "photo",
      },
    ]);
  }
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

bot.hears("⭐️ Анектоды по ChișinăuСКИ", async (ctx) => {
  const response = await getJoke();

  ctx.replyWithHTML(`<b>${response.joke}</b>`);
});

bot.hears("⭐️ Литература о Chișinău анд Молдова", async (ctx) => {
  ctx.replyWithHTML(
    `<b>Надежда Георгиевна Деметер. «История цыган»</b>\n<b>Дмитрий Фалеев. «Бахтале-Зурале! Цыгане, которых мы не знаем»</b>\n<b>Татьяна Алексеевна Форш. «Цыганское проклятие»</b>\n<b>Рэймонд Бакленд. «Цыгане. Тайны жизни и традиции»</b>\n<b>Александр Сергеевич Пушкин. «Цыганы»</b>\n<b>Анастасия Вячеславовна Дробина. Серия книг «Цыганская страсть»</b>`
  );
});

bot.hears("⭐️ НЕ НАЖИМАЙ", async (ctx) => {
  ctx.replyWithPhoto(
    {
      url: "https://img.freepik.com/free-photo/homosexual-couple-kissing-with-eyes-closed_23-2148140966.jpg",
    },
    {
      caption:
        "Я знаю твои грязніе тайні сережа=) Видео как нормалные пацаны резвятся: https://rt.pornhub.com/gayporn",
    }
  );
});

bot.hears("💲 Пожертвования", (ctx) =>
  ctx.reply(
    "Сережа, я понимаю что ты занятой человек и на челядь не привык обращать внимание. Но мы, команда из 25 разработчиков в лице одного человека не против твоих скромных барышей или денежных единиц твоих друзей скамеров в знак благодарности BTC - 0x21cEB90D7e0ffe0790f75F6522CA1211803eE847"
  )
);

bot.hears("❌ Закрыть меню", (ctx) =>
  ctx.reply("Пака", Markup.removeKeyboard())
);

bot.launch();
