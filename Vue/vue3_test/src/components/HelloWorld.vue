<template>
  <base-button>sample button</base-button>

  <teleport to="#endofbody">
    <div id="content">
      <p>
        このメッセージは、指定したIDのDOM要素に対して出力されます。
        <br />モーダルのように振る舞います。
      </p>
    </div>

    <messeage-home message="Hello Teleport" />
  </teleport>
</template>

<script>
import MesseageHome from "./MessageHome.vue";
import BaseButton from "./BaseButton.vue";

export default {
  name: "HelloWorld",
  components: {
    MesseageHome: MesseageHome,
    BaseButton: BaseButton,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
