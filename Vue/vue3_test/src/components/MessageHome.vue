<template>
  <div class>{{ message }}</div>
</template>
 
<script>
export default {
  name: "MessageHome",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>