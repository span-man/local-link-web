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
import axios from "axios";
let doMain = "http://localhost:7778/";
export default {
  components: {},
  props: {
    status: {
      type: String,
      default: "add"
    },
    nowitem: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      showDialogBool: true,
      form: {
        label: "",
        link: ""
      }
    };
  },
  mounted() {
    this.form.label = this.nowitem.label;
    this.form.link = this.nowitem.link;
  },
  methods: {
    confirm() {
      console.log("提交");
      if (this.status == "add") {
        let json = {
          ...this.form
        };
        axios.post(doMain + "addLink", json).then(res => {
          console.log("新增---->", res);
          if (res.data.success) {
            this.$emit("findatalist");
            this.$emit("close");
          }
        });
      } else {
        let json = {
          ...this.nowitem,
          ...this.form
        };
        axios.post(doMain + "updateLink", json).then(res => {
          console.log("提交结果---->", res);
          if (res.data.success) {
            this.$emit("findatalist");
            this.$emit("close");
          }
        });
      }
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