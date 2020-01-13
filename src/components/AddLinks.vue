<template>
  <div class="AddLinksBox">
    <div class="AddLinks" @click="showDialogBool = true"></div>
    <el-dialog
      title="新增链接"
      :visible.sync="showDialogBool"
      width="75%"
      @close="showDialogBool = false"
    >
      <div class="content">
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="label">
            <el-input v-model="form.label" aria-placeholder></el-input>
          </el-form-item>
          <el-form-item label="link">
            <el-input v-model="form.link"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="showDialogBool = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let doMain = "http://localhost:7777/";
export default {
  components: {},
  data() {
    return {
      showDialogBool: true,
      form: {
        label: "",
        link: ""
      }
    };
  },
  methods: {
    confirm() {
      console.log("提交");
      this.$axios.post(doMain + "addLink").then(res => {
        console.log("提交结果-->", res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.AddLinks {
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  background: rgb(58, 19, 150);
}
</style>