<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        id="exampleInputEmail1"
        v-model="user.username"
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      >
      <small
        id="emailHelp"
        class="form-text text-muted"
      >We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        id="exampleInputPassword1"
        v-model="user.password"
        type="password"
        class="form-control"
        placeholder="Password"
      >
    </div>
    <button
      type="button"
      class="btn btn-primary"
      @click="login"
    >
      Submit
    </button>
  </form>
</template>

<script>
import axios from 'axios'

const url = 'https://vue3-course-api.hexschool.io' // 請加入站點

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  mounted () {
    //console.log(this.$router, this.$route)
  },
  methods: {

    login () {
      // #2 發送 API 至遠端並登入（並儲存 Token）
      axios.post(`${url}/v2/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message)
          const { token, expired } = res.data // 寫入 cookie token
          document.cookie = `newToken=${token}; expires=${new Date(expired)};` // expires 設置有效時間
          this.$router.push('/admin/products')
        })
        .catch(() => {
          alert('登入失敗')
        })
    }
  }
}
</script>

<style scoped>
</style>
