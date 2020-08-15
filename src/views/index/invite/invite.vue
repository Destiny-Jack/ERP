<template>
  <div class="invite">
    <el-card class="box-card">
      <div class="main">
        <b>邀请返现说明:</b>
        <p>通过链接或者二维码邀请注册，你可以获得被邀请人每次充值金额的4%作为奖励，你的上级将获得被邀请人每次充值金额的2%作为奖励，上不封顶</p>
        <p>假如A邀请B，B邀请C，C充值1000元，B获得40元，A获得20元。</p>
        <el-button type="warning" @click="btnOpen">开通邀请功能</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  methods:{
    btnOpen(){
      this.$router.push('/opening')
    }
  }
}
</script>

<style lang="less">
.invite{
  margin: 10px 10px 0;
  
  .box-card{
    margin: 20px;
    
    .main{
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;

      p{
        color: #E6A23C;
      }
    }
  }
}
</style>