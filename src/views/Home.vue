<template>
  <div class="home">
    <div v-if="loading" class="loader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <h1>WGCORP250 Beta Test</h1>
    <div>
      <div class="question">
        <div>Enter your SLOT CODE</div>
        <div>
          <input type="text" v-model="code" />
          <button @click="get" :disabled="loading">GET</button>
        </div>
      </div>
      <div v-for="q in captcha_q" :key="q.id" class="question">
        <div :name="q.instruction">{{ q.instruction }}</div>
        <div>
          <img :src="q.question" />
        </div>
        <div>
          <input type="text" v-model="captcha_a[q.id]" />
        </div>
      </div>
    </div>
    <button class="check" @click="check" :disabled="loading">Submit</button>
  </div>
</template>

<script>
import wgc from "@/wgc";

export default {
  name: "Home",
  data: () => ({
    loading: false,
    code: "",
    captcha_e: false,
    captcha_q: [],
    captcha_a: []
  }),
  methods: {
    get() {
      console.log("Getting captchas ...");
      this.loading = true;
      wgc
        .get(this.code)
        .then(e => {
          console.log(e.data || e);
          if (
            typeof e == "object" &&
            typeof e.data == "object" &&
            typeof e.data.questions == "object"
          ) {
            this.captcha_q = e.data.questions;
            console.log("[DATA]", this.captcha_q);
          } else {
            this.captcha_q = [];
          }
          this.captcha_a = [];
        })
        .catch(e => {
          this.captcha_e = false;
          console.log("[ERROR]", e);
        })
        .finally(() => {
          console.log("[GET] Done");
          if (this.captcha_q.length <= 0) {
            this.captcha_e = true;
            console.log("[ERROR] Empty captcha questions, try again...");
          }
          this.loading = false;
        });
    },
    check() {
      console.log("Checking answers ...");
      var data = {
        slot_code: this.code,
        answers: []
      };
      for (var i = 0; i < this.captcha_a.length; i++) {
        data.answers.push({
          id: i,
          instruction: this.captcha_q[i].instruction,
          answer: this.captcha_a[i].toString()
        });
      }
      this.loading = true;
      wgc
        .check(this.code, data)
        .then(e => {
          console.log(e.data || e);
          this.captcha_q = [];
          this.captcha_a = [];
          this.captcha_e = false;
          alert("Submitted");
        })
        .catch(e => {
          console.log("[CHECK] Error: ", e);
        })
        .finally(() => {
          console.log("[CHECK] Done");
          this.loading = false;
        });
    }
  }
};
</script>
<style>
.question {
  padding: 20px;
  border-top: 1px solid #ccc;
}
.check {
  margin: 2em 1em;
  background: dodgerblue;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
  padding: 20px;
  color: #fff;
}
.check:hover {
  background: deepskyblue;
}
.loader {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
