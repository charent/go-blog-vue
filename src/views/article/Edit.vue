<template>
  <v-md-editor v-model="text" height="80vh"></v-md-editor>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
};
</script>