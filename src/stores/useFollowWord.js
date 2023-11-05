import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

export const useFollowWord = defineStore('followWord', () => {
  let router = ref()

  const followWord = (rowData) => {
    console.log(rowData)
    ElMessageBox.alert(`您当前跟单的对象为：${rowData.nickName || ''}，<strong>请先登录!</strong>`, '提示', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定'
    })
  }

  onMounted(() => {
    router.value = useRouter()
  })

  const toDetail = (data) => {
    console.log(data, router)
    router.value.push({
      path: '/trade/detail'
    })
  }

  return { followWord, toDetail }
})
