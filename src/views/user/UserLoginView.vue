<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于八位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-space></a-space>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 480px; margin: 0 auto"
          >登录
        </a-button>
        <br />
      </a-form-item>
    </a-form>
    <div style="margin: 0 auto">
      新用户？
      <a href="/user/register">从这里开始</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async (data: any) => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    // 登录成功跳转到主页
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
    //alert("登录成功" + JSON.stringify(res.data));
  } else {
    message.error("登录失败," + res.message);
  }
  console.log(data);
  alert(JSON.stringify(form));
};
</script>
