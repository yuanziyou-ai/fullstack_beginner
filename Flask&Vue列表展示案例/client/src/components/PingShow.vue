<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  name: 'PingShow',
  data() {
    return {
      msg: '',
    }
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5000/ping'
      axios
        .get(path)
        .then((res) => {
          console.log(res)
          this.msg = res.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
  created() {
    this.getMessage()
  },
}
</script>