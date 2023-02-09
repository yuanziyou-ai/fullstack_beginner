<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>会员</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm">添加会员</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">名称</th>
              <th scope="col">邮箱</th>
              <th scope="col">地址</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rs, index) in members" :key="index">
              <td>{{ rs.name }}</td>
              <td>{{ rs.email }}</td>
              <td>{{ rs.address }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm">更新</button>
                  <button type="button" class="btn btn-danger btn-sm">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios'

export default {
  data() {
    return {
      members: [],
    }
  },
  methods: {
    getMembers() {
      const path = 'http://localhost:5000/members'
      axios
        .get(path)
        .then((res) => {
          console.log(res)
          this.members = res.data.members
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
  created() {
    this.getMembers()
  },
}
</script>