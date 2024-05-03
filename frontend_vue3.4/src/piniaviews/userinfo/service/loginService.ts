// import userinfo from '@/piniastore/userinfo'
import { userinfoStore } from '@/piniastore'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

class LoginService {
  // static store = userinfo()
  static store = userinfoStore
  static storeToRefs = storeToRefs(LoginService.store)
  static username = ref('')
  static password = ref('')

  // 登录
  static async login() {
    const username = LoginService.username.value
    const password = LoginService.password.value
    if (!username || !password) {
      // 提示用户输入用户名和密码
      ElMessageBox.confirm('', {
        message: '请输入用户名和密码',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    } else {
      await LoginService.store.login(username, password)
      // 登录成功后跳转到首页(图书三级分类页)
      const query = router.currentRoute.value.query
      const redirect = query.redirect as string
      if (redirect) {
        query.isRouteIntercep
          ? router.replace(decodeURIComponent(redirect))
          : router.back()
      } else {
        router.push('/ctgy')
      }
    }
  }
}

export default LoginService
