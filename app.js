function getRandomValue(lowerLimit, higherLimit) {
  return Math.floor(Math.random() * (higherLimit - lowerLimit)) + lowerLimit;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 200,
      currentRound: 0,
      logMessages: [],
    };
  },

  computed: {
    monsterProgressBarStyle() {
      return {
        width: this.monsterHealth / 2 < 0 ? 0 : this.monsterHealth / 2 + "%",
      };
    },
    playerProgressBarStyle() {
      return { width: (this.playerHealth < 0 ? 0 : this.playerHealth) + "%" };
    },

    canSpecialAttack() {
      return this.currentRound % 3 != 0;
    },

    didGameEnd() {
      return this.playerHealth <= 0 || this.monsterHealth <= 0;
    },
    winner() {
      return this.playerHealth <= 0 ? "You Lost!" : "You win!";
    },
  },

  methods: {
    attackMonster() {
      this.currentRound++;
      let attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      let attackValue = getRandomValue(8, 15);
      this.addLogMessage("Monster", "attack", attackValue);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      console.log("SPECIAL ATTACK FUNCTION");
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      console.log("Attack Value", attackValue);
      this.addLogMessage("Player", "attack", attackValue);
      this.attackPlayer();
    },

    healPlayer() {
      console.log("HEAL PLAYER FUNCTION");
      this.currentRound++;
      const healValue = getRandomValue(7, 25);

      this.playerHealth + healValue > 100
        ? (this.playerHealth = 100)
        : (this.playerHealth += healValue);

      this.addLogMessage("Player", "heal", healValue);
      this.attackPlayer();
    },

    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 200;
      this.currentRound = 0;
      this.logMessages = [];
    },

    surrender() {
      this.playerHealth = 0;
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#vue-root");
