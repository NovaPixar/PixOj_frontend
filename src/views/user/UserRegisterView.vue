<template>
  <h2 style="margin-bottom: 16px">用户注册</h2>
  <a-form
    style="max-width: 480px; margin: 0 auto"
    auto-label-width
    label-align="left"
    ref="formRef"
    :rules="rules"
    :model="form"
    :style="{ width: '600px' }"
    @submit="handleSubmit"
  >
    <a-form-item field="userAccount" label="账户名" validate-trigger="blur">
      <a-input
        v-model="form.userAccount"
        placeholder="please enter your username..."
      />
    </a-form-item>
    <a-form-item field="userPassword" label="密码" validate-trigger="blur">
      <a-input-password
        v-model="form.userPassword"
        placeholder="please enter your password..."
      />
    </a-form-item>
    <a-form-item field="checkPassword" label="确认密码" validate-trigger="blur">
      <a-input-password
        v-model="form.checkPassword"
        placeholder="please confirm your password..."
      />
    </a-form-item>
    <a-form-item field="email" label="邮箱">
      <a-input v-model="form.email" placeholder="please enter your email..." />
    </a-form-item>
    <a-form-item>
      <a-space style="margin: 0 auto">
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button
          type="primary"
          status="danger"
          @click="$refs.formRef.resetFields()"
          >重置
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  setup() {
    const form = reactive({
      userAccount: "",
      userPassword: "",
      checkPassword: "",
      email: "",
    });

    const handleSubmit = async ({ values, errors }) => {
      const res = await UserControllerService.userRegisterUsingPost(form);
      if (res.code === 0) {
        //注册成功的话就跳转到登录页面
        router.push({
          path: "/user/login",
          replace: true,
        });
        alert("登录成功" + JSON.stringify(res.data));
      } else {
        message.error("注册失败," + res.message);
        console.log(res.data);
      }
      console.log("values:", values, "\nerrors:", errors);
      alert(JSON.stringify(form));
    };

    const router = useRouter();
    const store = useStore();

    const rules = {
      userAccount: [
        {
          required: true,
          message: "name is required",
        },
      ],
      userPassword: [
        {
          required: true,
          message: "password is required",
        },
      ],
      checkPassword: [
        {
          required: true,
          message: "password is required",
        },
        {
          validator: (value, cb) => {
            if (value !== form.password) {
              cb("two passwords do not match");
            } else {
              cb();
            }
          },
        },
      ],
      email: [
        {
          type: "email",
          required: true,
        },
      ],
    };

    return {
      form,
      rules,
      handleSubmit,
    };
  },
};
</script>
