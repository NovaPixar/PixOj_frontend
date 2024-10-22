<template>
  <div id="viewQuestionView">
    {{ question }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 页面加载时请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
#viewQuestionView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
