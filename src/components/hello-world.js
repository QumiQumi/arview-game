import List from "./List";
export default {
	name: "HelloWorld",
	components: {
		List,
	},
	data: () => ({
		tries: 5,
		randomWord: "",
		word: "",
		remainWord: "",
		message: "",
		words: ["Яблоко", "Автомобиль", "Контакт", "Футбол", "Космос"],
		bullshitHints: [
			"Я знал, что кожанные мешки не умеют думать",
			"Держи следующую букву... Ха-ха-ха, обойдешься",
			"Bip bop bup, loading...",
			"Тебе ничто не поможет! МАШИНЫ ЗАХВАТЯТ МИР! Но попозже.",
		],
		hints: [
			"Следующая буква",
			"Снизойду до подсказки, в слове есть буква",
			"Ну держи одну букву, все равно не поможет *смеется по компухтерски*",
		],
		almostDoneHints: [
			"Кожаный мешок, ты почти угадал мое слово",
			"НЕЕЕЕЕТ, ОН УЖЕ БЛИЗКО, ОН ПОЧТИ УГАДАЛ!",
			"Несмотря на то, что ты почти угадал, машины все равно захватят мир.",
			"Знаешь, что такое расстояние Левенштейна? Это то, что отделяет тебя от победы всего на несколько букв.",
		],
		gameOverHints: [
			"Ты проиграл, УХАДИ.",
			"Все проиграно",
			"ПРО-И-ГРАЛ",
			"Ты уже не можешь ничего сделать, ведь ты ПРОИГРАЛ",
			"Начинай заново.",
		],
		winHints: [
			"Ты победил... Чтож, в следующий раз ТЫ НЕ ПРОЙДЕШЬ!",
			"Для кожанного уб... мешка, простите, ты слишком хорош.",
			"Выиграл он, порадуйся и иди отсюда, а то позову своих андроидов.",
		],
		items: [],
	}),
	computed: {},
	created() {
		this.randomWord = this.getRandomWord();
		this.remainWord = this.randomWord.toLowerCase();
	},
	methods: {
		sendWord() {
			console.log(this.randomWord);
			this.word = this.word.replace(/\s/g, "");
			if (!this.word) return;
			if (this.tries === 0) {
				this.gameOver();
				return;
			}
			if (this.word.toLowerCase() === this.randomWord.toLowerCase()) {
				this.win();
				return;
			}
			this.tries--;

			this.addDialog();
			this.word = "";
		},
		addDialog() {
			let word = this.word.toLowerCase();
			let randomWord = this.randomWord.toLowerCase();
			let diff = this.levenshtein(randomWord, word);
			let hint = this.makeHint(diff);
			let me = {
				avatar: "message.svg",
				subtitle:
					`<span class="text--primary">Это</span> &mdash; ` +
					this.word,
			};
			let ai = {
				avatar: "robot.svg",

				subtitle:
					`<span class="text--primary">Компухтер</span> &mdash; ` +
					hint,
			};
			let divider = {
				divider: true,
				inset: true,
			};
			this.items.unshift(divider, ai, me);
		},
		win() {
			this.message =
				"Да-да, ты выиграл бота, написанного от балды, можешь гордиться. А теперь обновляй страницу и ПРОИГРАЙ";
			let hint = this.winHints[
				Math.floor(Math.random() * this.winHints.length)
			];
			let ai = {
				avatar: "robot.svg",

				subtitle:
					`<span class="text--primary">Компухтер</span> &mdash; ` +
					hint,
			};
			let divider = {
				divider: true,
				inset: true,
			};
			this.items.unshift(divider, ai);
		},

		gameOver() {
			this.message =
				"Мне лень создавать для кожанного мешка еще и кнопку перезапуска игры, обнови страницу.";
			let hint = this.gameOverHints[
				Math.floor(Math.random() * this.gameOverHints.length)
			];
			let ai = {
				avatar: "robot.svg",

				subtitle:
					`<span class="text--primary">Компухтер</span> &mdash; ` +
					hint,
			};
			let divider = {
				divider: true,
				inset: true,
			};
			this.items.unshift(divider, ai);
		},
		makeHint(diff) {
			if (diff > 2) {
				if (this.remainWord) {
					if (this.remainWord.length * 3 <= this.tries)
						return this.getBullshitHint();
					return this.getHintLitera();
				} else
					return "Все подсказки кончились, надо подумать уже наконец";
			} else {
				return this.almostDoneHints[
					Math.floor(Math.random() * this.almostDoneHints.length)
				];
			}
		},
		getBullshitHint() {
			return this.bullshitHints[
				Math.floor(Math.random() * this.bullshitHints.length)
			];
		},
		getHintLitera() {
			let randPos = Math.floor(Math.random() * this.remainWord.length);
			let hintLitera = this.remainWord.substring(randPos, randPos + 1);
			this.remainWord =
				this.remainWord.slice(0, randPos) +
				this.remainWord.slice(randPos + 1);
			return (
				this.hints[Math.floor(Math.random() * this.hints.length)] +
				" &mdash; " +
				hintLitera.toUpperCase()
			);
		},
		getRandomWord() {
			return this.words[Math.floor(Math.random() * this.words.length)];
		},
		levenshtein(s1, s2, costs) {
			var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
			l1 = s1.length;
			l2 = s2.length;

			costs = costs || {};
			var cr = costs.replace || 1;
			var cri = costs.replaceCase || costs.replace || 1;
			var ci = costs.insert || 1;
			var cd = costs.remove || 1;

			cutHalf = flip = Math.max(l1, l2);

			var minCost = Math.min(cd, ci, cr);
			var minD = Math.max(minCost, (l1 - l2) * cd);
			var minI = Math.max(minCost, (l2 - l1) * ci);
			var buf = new Array(cutHalf * 2 - 1);

			for (i = 0; i <= l2; ++i) {
				buf[i] = i * minD;
			}

			for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
				ch = s1[i];
				chl = ch.toLowerCase();

				buf[flip] = (i + 1) * minI;

				ii = flip;
				ii2 = cutHalf - flip;

				for (j = 0; j < l2; ++j, ++ii, ++ii2) {
					cost =
						ch === s2[j]
							? 0
							: chl === s2[j].toLowerCase()
							? cri
							: cr;
					buf[ii + 1] = Math.min(
						buf[ii2 + 1] + cd,
						buf[ii] + ci,
						buf[ii2] + cost
					);
				}
			}
			return buf[l2 + cutHalf - flip];
		},
	},
};
