<template>
  <hr>
  <h4>後台產品列表</h4>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
        </tr>
      </thead>
      <tbody
        v-for="(product) in products"
        :key="product.id"
      >
        <tr>
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">
            {{ product.origin_price }}
          </td>
          <td class="text-end">
            {{ product.price }}
          </td>
          <td>
            <span
              v-if="product.is_enabled===1"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      aria-label="..."
      style="display: flex; justify-content: center;align-items: center;"
    >
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: pages.has_pre==false }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(pages.current_page-1)"
          >上一頁</a>
        </li>
        <li
          v-for="(page) in pages.total_pages"
          :key="page + 123"
          class="page-item"
          :class="{ active:page === pages.current_page }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(page)"
          >{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: pages.has_next === false }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="getProducts(pages.current_page+1)"
          >下一頁</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import 'bootstrap/scss/bootstrap.scss'

const { VITE_URL } = import.meta.env
const { VITE_PATH } = import.meta.env

export default {

  data () {
    return {
      temp: {},
      products: [],
      data_id: '',
      data_name: '',
      pages: {},
      newProduct: {
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: [
          ''
        ]
      }
    }
  },
  created () {
    this.checkLogin()
  },

  methods: {

    checkLogin () {
      // #3 取得 Token（Token 僅需要設定一次）

      const token = document.cookie.replace(/(?:(?:^|.*;\s*)newToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      axios.defaults.headers.common.Authorization = token
      // #4  確認是否登入
      axios.post(`${VITE_URL}/v2/api/user/check`, {}, { headers: { Authorization: token } })
        .then(() => {
          this.getProducts()
        })
        .catch(() => {
          alert('尚未登入會員，請重新登入！')
          this.$router.push('../login') // 跳轉到login頁面
        })
    },

    getProducts (page = 1) {
      // #5 取得後台產品列表

      // eslint-disable-next-line no-undef
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          // 將res.data.products設定到Vue的products陣列中
          this.products = res.data.products
          this.pages = res.data.pagination
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  }
}
</script>
