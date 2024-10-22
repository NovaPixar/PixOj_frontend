<template>
  <Viewer :value="value" :plugins="plugins" style="width: 100%" />
</template>
<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { defineProps, withDefaults } from "vue";

/**
 * 定义组件的属性的类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm(),
  highlight,
  // Add more plugins here
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
